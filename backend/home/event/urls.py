from django.urls import path, include
from event.views import EventTypesView

urlpatterns = [
    path('event-types/',EventTypesView.as_view(), name='event-types'),
]