from rest_framework import serializers 
from .models import Event 
 
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event 
        fiels = ['user','name', 'description', 'event_type', 'event_image', 'country', 'city', 'latitude', 'longitude', 'address', 'date', 'time','ticket_active', 'max_tickets', 'is_featured', 'created_at', 'updated_at']
 