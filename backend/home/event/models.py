from django.db import models
from django.conf import settings
from account.models import User 

class Event(models.Model):
    EVENT_TYPES = [
        ('concert', 'Concert'),
        ('sport', 'Sport'),
        ('art', 'Art'),
        ('family', 'Family'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='events'
    )
    event_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255) 
    description = models.TextField()  
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES)  
    event_image = models.ImageField(upload_to='media/eventimage/', blank=True, null=True) 
    country = models.CharField(max_length=100)  
    city = models.CharField(max_length=100)  
    latitude = models.FloatField()  
    longitude = models.FloatField() 
    address = models.CharField(max_length=255, null=True, blank=True) 
    date = models.DateField()  
    time = models.TimeField()  
    ticket_active = models.BooleanField(default=True)  
    max_tickets = models.PositiveIntegerField(null=True, blank=True)  
    is_featured = models.BooleanField(default=False) 
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True)  

    def __str__(self):
        return self.name
    
class Like(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='likes'
    )
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name='likes'
    )
    like_id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} liked {self.event.name}"

