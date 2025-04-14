from collections import Counter
from django.utils import timezone
from event.models import Event, Like
from payment.models import Payment

def recommend_events_for_user(user):
    likes = Like.objects.values('user_id', 'event_id')
    purchases = Payment.objects.exclude(user_id=None).values('user_id', 'event_id')

    interaction_data = list(likes) + list(purchases)
    df = pd.DataFrame(interaction_data)

    if df.empty or user_id not in df['user_id'].unique():
        return Response({"events": []})

    # Step 2: User-Event Matrix
    interaction_matrix = pd.crosstab(df['user_id'], df['event_id'])

    # Step 3: Similarity between users
    similarity = cosine_similarity(interaction_matrix)
    sim_df = pd.DataFrame(similarity, index=interaction_matrix.index, columns=interaction_matrix.index)

    if user_id not in sim_df.index:
        return Response({"events": []})

    # Step 4: Find most similar users
    similar_users = sim_df[user_id].sort_values(ascending=False).drop(user_id).head(3).index.tolist()

    # Events interacted by similar users
    similar_user_events = df[df['user_id'].isin(similar_users)]['event_id'].value_counts().index.tolist()

    # Events already interacted by target user
    user_events = df[df['user_id'] == user_id]['event_id'].tolist()

    # Recommend events not already interacted with
    recommended_event_ids = [eid for eid in similar_user_events if eid not in user_events][:4]

    # Get event details
    recommended_events = Event.objects.filter(event_id__in=recommended_event_ids)

    results = []
    for event in recommended_events:
        results.append({
            "event_id": event.event_id,
            "name": event.name,
            "description": event.description,
            "city": event.city,
            "date": event.date,
            "image": event.event_image,
        })

    return Response({"events": results})
