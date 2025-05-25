from django.shortcuts import render
from .models import Event, Like 
from payment.models import Payment 
from account.models import User 
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from contributor.models import Contributor
from .serializers import EventSerializer, LikeSerializer, CommentSerializer, RateSerializer
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response 
from account.renderers import UserRenderer 
from rest_framework import status 
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView 
from rest_framework.renderers import JSONRenderer 
from rest_framework import viewsets 
from .models import Like, Comment, Rate
from rest_framework.generics import ListAPIView
from django.db.models import Q
from rest_framework.filters import OrderingFilter
from payment.models import Payment
from rest_framework.decorators import api_view 
from .event_recommender import get_similar_events 
from .collaborative_event_recommender import recommend_events_for_user
from django.db.models.functions import Now
from django.db.models import Avg
from rest_framework.pagination import CursorPagination
from django.db.models.functions import TruncDate
from account.models import User 
from event.models import Event, Comment 
from django.db.models import Sum, Count
from django.utils.timezone import now
from datetime import timedelta

# list, retrieve and create there is another viewset for deleting and updating 
class EventModelViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    def list(self, request):
        eventlist = Event.objects.all()
        serializer = EventSerializer(eventlist, many=True)
        print(serializer.data)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        event = get_object_or_404(Event, event_id=pk)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def create(self, request):
        permission_classes = [IsAuthenticated]
        try:
            contributor = Contributor.objects.get(user=request.user)
            # check if the contributor is verified or not 
            if not contributor.verified:  
                return Response(
                    {'error': 'Only verified contributors can add events'},
                    status=status.HTTP_403_FORBIDDEN
                )
        except Contributor.DoesNotExist:
            return Response(
                {'error': 'You are not a contributor. Please register as one.'},
                status=status.HTTP_403_FORBIDDEN
            )

        # check if the user is verified, if its is verified add event 
        serializer = EventSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(
                {'msg': 'Event created successfully', 'data': serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk):
        event = get_object_or_404(Event, event_id=pk)
        serializer = EventSerializer(event, data=request.data, partial=True)  # Allow partial updates
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Event Updated Successfully', 'data': serializer.data})
        print(serializer.errors)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# get the similar events 
class SimilarEventModelViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    def retrieve(self, request, pk=None):
        similar_events = get_similar_events(pk, 10)
        similar_events_serializer = EventSerializer(similar_events, many=True)
        return Response(similar_events_serializer.data)

# get collborative event recommender 
class CollaborativeEventModelViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def retrieve(self, request, pk=None):
        try:
            user_id = int(pk)
            events = recommend_events_for_user(user_id)
            serialized = EventSerializer(events, many=True)
            return Response(serialized.data)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

# we are not using collaborative_event_recommender.py but doing all of it in this function
@api_view(['GET'])
def recommend_events(request, user_id):
    likes = Like.objects.values('user_id', 'event_id')
    purchases = Payment.objects.exclude(user_id=None).values('user_id', 'event_id')
    interaction_data = list(likes) + list(purchases)
    df = pd.DataFrame(interaction_data)
    if df.empty or user_id not in df['user_id'].unique():
        return Response({"events": []})
    interaction_matrix = pd.crosstab(df['user_id'], df['event_id'])
    similarity = cosine_similarity(interaction_matrix)
    sim_df = pd.DataFrame(similarity, index=interaction_matrix.index, columns=interaction_matrix.index)
    if user_id not in sim_df.index:
        return Response({"events": []})
    similar_users = sim_df[user_id].sort_values(ascending=False).drop(user_id).head(3).index.tolist()
    similar_user_events = df[df['user_id'].isin(similar_users)]['event_id'].value_counts().index.tolist()
    user_events = df[df['user_id'] == user_id]['event_id'].tolist()
    recommended_event_ids = [eid for eid in similar_user_events if eid not in user_events][:4]
    recommended_events = Event.objects.filter(event_id__in=recommended_event_ids)

    results = []
    for event in recommended_events:
        results.append({
            "event_id": event.event_id,
            "name": event.name,
            "description": event.description,
            "city": event.city,
            "date": event.date,
            "time": event.time,
            "image": event.event_image.url if event.event_image else None,
        })
    print("=============This is the data from events======================")
    print(results)
    return Response({"events": results})

"""
def recommended_events_view(request):
    user = request.user
    recommended = recommend_events_for_user(user)
    # You can serialize and return via DRF if it's an API
    return render(request, 'event/recommended.html', {'events': recommended})
"""

# list event according to the userid
class EventContribAuthModelViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def list(self, request, user_id=None):
        # Fetch all events for the given user_id
        events = Event.objects.filter(user=user_id)
        if not events.exists():
            return Response({"detail": "No events found for this user."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

# get event category
class EventTypesView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return Response(JSONRenderer().render(Event.EVENT_TYPES)) # serialize the data 
    

# Add like 
class LikeViewSet(viewsets.ViewSet):
    def create(self, request):
        user = request.user  
        event_id = request.data.get("event")

        # Check if the user already liked this event
        if Like.objects.filter(user=user, event_id=event_id).exists():
            return Response({"msg": "You have already liked this event"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            event = Event.objects.get(event_id=event_id)
        except Event.DoesNotExist:
            return Response({"msg": "Event does not exist"}, status=status.HTTP_404_NOT_FOUND)
            
        if event.user == user:
            return Response({"msg": "You cannot like your own event"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = LikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Liked"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# get all liked events 
class LikedEventViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = EventSerializer  
    def list(self, request, user_id=None):
        liked_events = Event.objects.filter(likes__user_id=user_id)  # Use the correct reverse relation name
        serializer = self.get_serializer(liked_events, many=True)
        return Response(serializer.data)

# get all the events the user has bought the ticket of 
class VisitedEventViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = EventSerializer 
    """
    def list(self, request, user_id=None):
        # get the particular user event_id from the Payment model, like all the event id 
        visited_events = Payment.objects.filter(user=user_id).select_related('event')
        # remove the duplicate event_id from 
        event_ids = visited_events.values_list('event',flat=True).distinct()
        # get all the event detail using the event_ids 
        events = Event.objects.filter(event_id__in=event_ids)
        # serialize the events and return them in the response 
        serializer = self.serializer_class(events, many=True)
        if serializer.data:
            return Response(serializer.data)
        return Response({'msg':'No events present'})
    """
    def get_queryset(self):
        """
        Override the get_queryset method to filter events based on the user ID.
        This method will return a queryset of events the user has attended.
        """
        user_id = self.kwargs.get('user_id')  # Getting user_id from the URL
        if user_id is None:
            return Event.objects.none()  # Return an empty queryset if no user_id is provided
        
        # Filter payments for the given user and retrieve distinct events they have attended
        visited_events = Payment.objects.filter(user=user_id).select_related('event')

        # Get distinct event ids to ensure no duplicates
        event_ids = visited_events.values_list('event', flat=True).distinct()

        # Return the queryset of events
        return Event.objects.filter(event_id__in=event_ids)

    def list(self, request, *args, **kwargs):
        """
        Override the list method to return a list of events the user has attended.
        """
        queryset = self.get_queryset()  # Use the custom queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

# pagination 
class MyCursorPagination(CursorPagination):
    page_size = 16
    ordering = 'event_id'
    cursor_query_param = 'event'

# adding filter in Events 
class EventListView(ListAPIView):
    serializer_class = EventSerializer
    pagination_class = MyCursorPagination
    queryset = Event.objects.all()
    filter_backends = [OrderingFilter]
    permission_classes = [AllowAny]  # Allow anyone to view events (adjust as needed)

    def get_queryset(self):
        queryset = super().get_queryset()
        query_params = self.request.query_params

        category = query_params.get('category')
        country = query_params.get('country')
        city = query_params.get('city')
        ticket_active = query_params.get('ticket_active')
        event_date = query_params.get('event_date')
        capacity = query_params.get('capacity')
        event_type = query_params.get('event_type')  # Add this

        filters = Q()

        if category:
            filters &= Q(category__iexact=category)    
        if country:
            filters &= Q(country__iexact=country)
        if city:
            filters &= Q(city__iexact=city)
        if ticket_active is not None:
            filters &= Q(ticket_active=ticket_active.lower() == 'true')
        if event_date:
            filters &= Q(date=event_date)
        if capacity:
            try:
                filters &= Q(max_tickets__gte=int(capacity)) 
            except ValueError:
                pass  # Ignore invalid capacity values
        if event_type:  # Apply filtering for event_type
            filters &= Q(event_type__iexact=event_type)  

        return queryset.filter(filters)

# get the is_featured lastest events 
class IsFeaturedViewSet(viewsets.ViewSet):
    def list(self, request):
        featured_events = Event.objects.filter(is_featured=True).order_by('-created_at')[:10]
        serializer = EventSerializer(featured_events, many=True)
        return Response(serializer.data)

# get the international posts 
class GetInternationalEventViewSet(viewsets.ViewSet):
    def list(self, request):
        international_events = Event.objects.exclude(country="Nepal").order_by("-created_at")[:4]
        serializer = EventSerializer(international_events, many=True)
        return Response(serializer.data)

# get 2 latest popular concert 
class GetPopularConcertViewSet(viewsets.ViewSet):
    def list(self, request):
        popular_concert = Event.objects.filter(event_type="concert",is_popular=True).order_by("-created_at")[:4]
        serializer = EventSerializer(popular_concert, many=True)
        return Response(serializer.data)

class GetPopularSportViewSet(viewsets.ViewSet):
    def list(self, request):
        popular_sport = Event.objects.filter(event_type="sport",is_popular=True).order_by("-created_at")[:4]
        serializer = EventSerializer(popular_sport, many=True)
        return Response(serializer.data)

class GetPopularArtViewSet(viewsets.ViewSet):
    def list(self, request):
        popular_art = Event.objects.filter(event_type="art",is_popular=True).order_by("-created_at")[:4]
        serializer = EventSerializer(popular_art, many=True)
        return Response(serializer.data)

class GetPopularFamilyViewSet(viewsets.ViewSet):
    def list(self, request):
        popular_family = Event.objects.filter(event_type="family",is_popular=True).order_by("-created_at")[:4]
        serializer = EventSerializer(popular_family, many=True)
        return Response(serializer.data)

# get the user_id with the event_id 
@api_view(['GET'])
def event_user_api(request, event_id):
    try:
        event = Event.objects.get(event_id=event_id)
        return Response({'user_id': event.user_id})
    except Event.DoesNotExist:
        return Response({'msg': "Event not found"}, status=404)

# comment view 
class CommentModelViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    def retrieve(self, request, pk=None):
        event = get_object_or_404(Event, pk=pk)
        comments = Comment.objects.filter(event=event).order_by('-created_at')
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    permission_classes = [IsAuthenticated]
    def create(self, request):
        serializer = CommentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(
                {'msg': 'Comment created successfully', 'data': serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# rating view 
class RateModelViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    def create(self, request):
        serializer = RateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(
                {'msg': 'Rate done successfully', 'data': serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def list(self, request):
        event_id = request.query_params.get('event_id')
        if not event_id:
            return Response({'error': 'event_id query parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        ratings = Rate.objects.filter(event__id=event_id)
        serializer = RateSerializer(ratings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# get the average rating according to the event_id 
@api_view(['GET'])
def average_rating_api(request, event_id):
    try:
        event = Event.objects.get(pk=event_id)
    except Event.DoesNotExist:
        return Response({'msg': "Event not found"}, status=404)
    average = Rate.objects.filter(event=event).aggregate(avg_rating=Avg('rating'))['avg_rating']
    return Response(int(average) if average is not None else 0)

# get the comments according to the event_id 
@api_view(['GET'])
def comment_api(request, event_id):
    try:
        event = Event.objects.get(pk=event_id)
    except Event.DoesNotExist:
        return Response({'msg': "Event not found"}, status=404)

    comments = Comment.objects.filter(event=event).order_by('-created_at')

    if comments.exists():
        data = [
            {
                'comment': c.content,
                'user_fullname': c.user.name,
                'created_at': c.created_at
            }
            for c in comments
        ]
        return Response(data)
    else:
        return Response({'msg': "No comments found for this event"}, status=404)

# get the dashboard data 
@api_view(['GET'])
def dashboard_data(request, event_id):
    try:
        event = Event.objects.get(event_id=event_id)
    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=404)

    # Total ticket sold
    total_tickets_sold = Payment.objects.filter(event=event).count()

    # Total revenue
    total_revenue = Payment.objects.filter(event=event).aggregate(total=Sum('amount'))['total'] or 0

    # Sales made today
    today = now().date()
    sales_today = Payment.objects.filter(event=event, created_at__date=today).aggregate(today_sales=Sum('amount'))['today_sales'] or 0

    # Sales over time (last 7 days)
    sales_over_time_qs = (
        Payment.objects
        .filter(event=event)
        .annotate(date=TruncDate('created_at'))
        .values('date')
        .annotate(total=Sum('amount'))
        .order_by('date')
    )
    sales_over_time = [{"date": entry["date"], "total": entry["total"]} for entry in sales_over_time_qs]

    # Recent 5 ticket buyers
    recent_buyers_qs = (
        Payment.objects
        .filter(event=event)
        .select_related('user')
        .order_by('-created_at')[:5]
    )
    recent_buyers = [{"name": p.user.name, "email": p.user.email, "date": p.created_at} for p in recent_buyers_qs]

    # Recent 5 comments
    recent_comments_qs = (
        Comment.objects
        .filter(event=event)
        .select_related('user')
        .order_by('-created_at')[:5]
    )
    recent_comments = [{"user": c.user.name, "comment": c.content, "date": c.created_at} for c in recent_comments_qs]

    data = {
        "event_name": event.name,
        "total_tickets_sold": total_tickets_sold,
        "total_revenue": total_revenue,
        "sales_today": sales_today,
        "sales_over_time": sales_over_time,
        "recent_buyers": recent_buyers,
        "recent_comments": recent_comments
    }

    return Response(data)
