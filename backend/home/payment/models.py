from django.db import models
from django.conf import settings
from account.models import User
from event.models import Event
from ticket.models import Ticket
from django.contrib.auth import get_user_model

class Payment(models.Model):
    payment_id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='payments'
    )
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='events')
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='tickets')
    amount = models.PositiveIntegerField(null=True, blank=True)
    email = models.EmailField(verbose_name="Email", max_length=255)
    name = models.CharField(max_length=200)
    ticket_type = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} bought {self.ticket_type} for {self.amount}"

# payment credential model 
class Payment_Credential(models.Model):
    payment_credential_id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(
    settings.AUTH_USER_MODEL, 
    on_delete=models.CASCADE, 
    null=False, 
    default=1,
    related_name='payment_credential'
    )
    khalti_secret_key = models.CharField(max_length=64)  
    khalti_public_key = models.CharField(max_length=64) 
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user} Payment Credentials"

    class Meta:
        verbose_name = "Payment Credential"
        verbose_name_plural = "Payment Credentials"



