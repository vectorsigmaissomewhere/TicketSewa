from django.shortcuts import render
from .models import Event 
from .serializers import EventSerializer 
from rest_framework import viewsets 
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response 
from account.renderers import UserRenderer 
from rest_framework import status 


# list, retreieve and create there is another viewset for deleting and updating 
class EventModelViewSet(viewsets.viewset):
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
        render_classes = [UserRenderer]
        permission_classes = [IsAuthenticated]
        id = request.user.id 
        