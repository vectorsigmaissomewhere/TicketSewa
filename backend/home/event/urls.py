from django.urls import path, include
from event.views import EventTypesView, LikeViewSet, EventListView
from event import views 


urlpatterns = [
    path('event-types/',EventTypesView.as_view(), name='event-types'),
    path('event-list/', EventListView.as_view(), name='event-list'),
    # this end point will help me get the userid 
    path('usereventapi/<int:event_id>/', views.event_user_api, name='usereventapi'), 
    path('eventrateapi/<int:event_id>/', views.average_rating_api, name='eventrateapi'),
    path('eventcommentapi/<int:event_id>/', views.comment_api, name='eventcommentapi'),
    path('recommendeventapi/<int:user_id>/', views.recommend_events, name='recommendeventapi'),
]