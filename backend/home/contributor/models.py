from account.models import User 
from django.conf import settings
from django.db import models


class Contributor(models.Model):
    contributorid = models.AutoField(primary_key=True)  # Automatically increments
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    verified = models.BooleanField(default=False)  # Stores if the contributor is verified
    license_image = models.ImageField(upload_to='media/licenses/', blank=True, null=True)  # Stores license image
    government_card = models.ImageField(upload_to='media/government_cards/', blank=True, null=True)  # Stores government card image

    def __str__(self):
        return f"Contributor {self.contributorid} - {self.user.name}"
