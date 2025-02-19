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
    serializer_class = EventSerializer  # Use EventSerializer, NOT LikeSerializer

    def list(self, request, user_id=None):
        # Get all events that the user has liked
        liked_events = Event.objects.filter(likes__user_id=user_id)  # Use the correct reverse relation name
        serializer = self.get_serializer(liked_events, many=True)
        return Response(serializer.data)

