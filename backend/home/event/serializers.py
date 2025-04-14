from rest_framework import serializers 
from .models import Event, Like, Comment, Rate
 
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event 
        fields = '__all__'
        many = True 
 
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'
        list_serializer_class = serializers.ListSerializer 

    def validate(self, data):
        user = data["user"]
        event = data["event"]

        # Check if the user has already liked this event
        if Like.objects.filter(user=user, event=event).exists():
            raise serializers.ValidationError("You have already liked this event.")
        
        return data


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        list_serializer_class = serializers.ListSerializer 

    def validate(self, data):
        user = data["user"]
        event = data["event"]

        # Check if the user has already liked this event
        if Comment.objects.filter(user=user, event=event).exists():
            raise serializers.ValidationError("You have already commented this event.")
        return data

class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate 
        fields = '__all__'
        list_serializer_class = serializers.ListSerializer

    def validate(self, data):
        user = data["user"]
        event = data["event"]

        # check if the user has already rated this event 
        if Rate.objects.filter(user=user, event=event).exists():
            raise serializers.ValidationError("You have already rated this event.")
        return data 
