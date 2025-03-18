from django.db import models
from event.models import Event
from account.models import User
from contributor.models import Contributor  

class Ticket(models.Model):
    ticket_id = models.BigAutoField(primary_key=True) 
    ticket_type = models.CharField(max_length=255)
    ticket_price = models.PositiveIntegerField(null=True, blank=True)
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name='tickets'
    )
    contributor = models.ForeignKey(
        Contributor,
        on_delete=models.CASCADE,
        related_name='tickets'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.ticket_type} for {self.event.name} by {self.contributor.user.name}"
