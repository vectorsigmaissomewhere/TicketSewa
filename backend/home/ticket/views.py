from django.shortcuts import render
from rest_framework.response import Response 
from .models import Ticket 
from contributor.models import Contributor
from rest_framework import status 
from rest_framework import viewsets 
from .serializers import TicketSerializer 
from rest_framework.permissions import IsAuthenticated, AllowAny 
from event.models import Event 
from django.views import View 
from rest_framework.views import APIView 

class TicketViewSet(viewsets.ViewSet):
    def create(self, request):
        permission_classes = [IsAuthenticated]

        try:
            contributor = Contributor.objects.get(user=request.user)
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

        # Get the event ID from request
        event_id = request.data.get('event')  
        if not event_id:
            return Response({'error': 'Event ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if this event exists and belongs to the contributor
        try:
            event = Event.objects.get(event_id=event_id, user=request.user)
        except Event.DoesNotExist:
            return Response(
                {'error': 'You can only add tickets to your own events.'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Event exists and belongs to the contributor, proceed with ticket creation
        serializer = TicketSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(
                {'msg': 'Ticket created successfully', 'data': serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# allow to add ticket if it's his event 
class CheckTicketAddView(APIView):
    def get(self, request, event_id, user_id):
        try:
            event = Event.objects.get(event_id=event_id, user__id=user_id)
            return Response({'checked': 'True'}, status=status.HTTP_200_OK)
        except Event.DoesNotExist:
            return Response({'checked': 'False'}, status=status.HTTP_404_NOT_FOUND)

