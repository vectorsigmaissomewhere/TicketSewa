from rest_framework import serializers 
from .models import Event, Like
 
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event 
        fields = '__all__'
 
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

    def validate(self, data):
        user = data["user"]
        event = data["event"]

        # Check if the user has already liked this event
        if Like.objects.filter(user=user, event=event).exists():
            raise serializers.ValidationError("You have already liked this event.")
        
        return data

