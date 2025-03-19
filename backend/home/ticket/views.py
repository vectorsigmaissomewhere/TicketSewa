from django.shortcuts import render
from rest_framework.response import Response 
from .models import Ticket 
from contributor.models import Contributor
from rest_framework import status 
from rest_framework import viewsets 
from .serializers import TicketSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from event.models import Event 

class TicketViewSet(viewsets.ViewSet):
    def create(self, request):
        permission_classes = [IsAuthenticated]
        print(request.data.get('user'))
        try:
            contributor = Contributor.objects.get(user=request.user)
            if not contributor.verified:
                return Response(
                    {'error':'Only verified contributors can add events'},
                    status=status.HTTP_403_FORBIDDEN
                )
        except Contributor.DoesNotExist:
            return Response(
                {'error':'You are not a contributor. Please register as one.'},
                status=status.HTTP_403_FORBIDDEN
            )
        some_user_id = request.data.get('user')
        event_list = Event.objects.filter(user_id=some_user_id)
        print(event_list)
        if request.data.get('event') in event_list:
            serializer = TicketSerializer(data=request.data, context={'request':request})
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(
                    {'msg':'Ticket created successfully', 'data':serializer.data},
                    status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)