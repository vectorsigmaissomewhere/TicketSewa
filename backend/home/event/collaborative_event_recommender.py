from collections import Counter
from django.utils import timezone
from event.models import Event, Like
from payment.models import Payment

def recommend_events_for_user(user):
    # Step 1: Get liked and paid event types
    liked_event_types = list(Like.objects.filter(user=user).values_list('event__event_type', flat=True))
    paid_event_types = list(Payment.objects.filter(user=user).values_list('event__event_type', flat=True))

    print("Liked event types:", liked_event_types)
    print("Paid event types:", paid_event_types)

    # Combine and count occurrences
    event_type_counts = Counter(liked_event_types) + Counter(paid_event_types)

    # Sort by most common event types
    sorted_types = [etype for etype, _ in event_type_counts.most_common()]
    print("Sorted event types:", sorted_types)

    # Step 2: Get IDs of events already liked or paid
    excluded_event_ids = set()  # No exclusions for testing
    print("Excluded event IDs:", excluded_event_ids)

    # Step 3: Recommend events based on preferred event types
    recommended_events = []

    for etype in sorted_types:
        events = Event.objects.filter(
            event_type=etype
        ).exclude(
            event_id__in=excluded_event_ids
        ).order_by('-is_popular', '-is_featured')[:10]

        print(f"Found {len(events)} events for type '{etype}'")
        recommended_events.extend(events)

        if len(recommended_events) >= 10:
            break

    # Step 4: Fallback if no recommendations found
    if not recommended_events:
        print("No personalized events found. Returning fallback events.")
        fallback_events = Event.objects.filter(
            ticket_active=True,
            date__gte=timezone.now()
        ).order_by('-is_popular', '-is_featured')[:10]
        print(f"Fallback events: {fallback_events}")
        return fallback_events

    return recommended_events[:4]
