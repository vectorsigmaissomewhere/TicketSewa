from django.shortcuts import render
from .models import Event
from contributor.models import Contributor
from .serializers import EventSerializer 
from rest_framework import viewsets 
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response 
from account.renderers import UserRenderer 
from rest_framework import status 

from rest_framework.permissions import AllowAny

# list, retreieve and create there is another viewset for deleting and updating 
class EventModelViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    def list(self, request):
        eventlist = Event.objects.all()
        serializer = EventSerializer(eventlist, many=True)
        print(serializer.data)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        permission_classes = [AllowAny]
        id = pk 
        group = Event.objects.get(event_id=id)
        return Response(serializer.data)

    def create(self, request):
        # Only authenticated users can create events
        permission_classes = [IsAuthenticated]

        # Check if the user is a verified contributor
        try:
            contributor = Contributor.objects.get(user=request.user)
            if not contributor.verified:  # Assuming `is_verified` is a field in Contributor
                return Response(
                    {'error': 'Only verified contributors can add events'},
                    status=status.HTTP_403_FORBIDDEN
                )
        except Contributor.DoesNotExist:
            return Response(
                {'error': 'You are not a contributor. Please register as one.'},
                status=status.HTTP_403_FORBIDDEN
            )

        # If the user is verified, proceed with event creation
        serializer = EventSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(
                {'msg': 'Event created successfully', 'data': serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        