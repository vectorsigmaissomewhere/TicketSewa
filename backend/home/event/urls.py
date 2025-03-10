from django.urls import path, include
from event.views import EventTypesView, LikeViewSet, EventListView


urlpatterns = [
    path('event-types/',EventTypesView.as_view(), name='event-types'),
    path('event-list/', EventListView.as_view(), name='event-list'),


]