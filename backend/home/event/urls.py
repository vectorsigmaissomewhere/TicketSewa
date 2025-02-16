from django.urls import path, include
from event.views import EventTypesView, LikeViewSet


urlpatterns = [
    path('event-types/',EventTypesView.as_view(), name='event-types'),
]