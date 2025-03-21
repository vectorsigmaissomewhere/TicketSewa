from django.shortcuts import render
from .models import Event
from contributor.models import Contributor
from .serializers import EventSerializer, LikeSerializer
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response 
from account.renderers import UserRenderer 
from rest_framework import status 
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView 
from rest_framework.renderers import JSONRenderer 
from rest_framework import viewsets 
from .models import Like
from rest_framework.generics import ListAPIView
from django.db.models import Q
from rest_framework.filters import OrderingFilter




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

# adding filter in Events 
class EventListView(ListAPIView):
    serializer_class = EventSerializer
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
