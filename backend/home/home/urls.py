from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from contributor.views import MakeContributorViewSet 
from event import views
from event.views import EventModelViewSet, EventContribAuthModelViewSet
from rest_framework.routers import DefaultRouter

add_contributor_router = DefaultRouter()
add_contributor_router.register('addcontributor', MakeContributorViewSet, basename='addcontributor')

# router for listing, retrieving and adding event 
eventviewrouter = DefaultRouter()
eventviewrouter.register('eventviewapi', EventModelViewSet, basename='eventviewapi')

# Map the GET method to the 'list' action of EventContribAuthModelViewSet
event_user_view = EventContribAuthModelViewSet.as_view({'get': 'list'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('account.urls')),
    path('', include(add_contributor_router.urls)),
    path('', include(eventviewrouter.urls)),
    path('events/user/<int:user_id>/', event_user_view, name='event-user-list'), # get the event according to the user id 
    path('addcontributor/', MakeContributorViewSet.as_view({'post': 'create'}), name='add-contributor'),
    path('api/contributor/', include('contributor.urls')),
    path('api/event/', include('event.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)