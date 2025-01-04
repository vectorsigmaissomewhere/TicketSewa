from rest_framework import serializers
from .models import Contributor 

class MakeContributorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contributor 
        fields = ['contributorid', 'user', 'verified', 'license_image', 'government_card']