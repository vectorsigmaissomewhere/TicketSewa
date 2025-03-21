from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from contributor.views import MakeContributorViewSet 
from event import views
from event.views import EventModelViewSet, EventContribAuthModelViewSet, LikeViewSet, LikedEventViewSet, IsFeaturedViewSet, GetInternationalEventViewSet, GetPopularConcertViewSet, GetPopularSportViewSet, GetPopularArtViewSet, GetPopularFamilyViewSet
from rest_framework.routers import DefaultRouter
from ticket.views import TicketViewSet, CheckTicketAddView

add_contributor_router = DefaultRouter()
add_contributor_router.register('addcontributor', MakeContributorViewSet, basename='addcontributor')

# router for listing, retrieving and adding event 
eventviewrouter = DefaultRouter()
eventviewrouter.register('eventviewapi', EventModelViewSet, basename='eventviewapi')

# Map the GET method to the 'list' action of EventContribAuthModelViewSet
event_user_view = EventContribAuthModelViewSet.as_view({'get': 'list'})

# for like 
likerouter = DefaultRouter()
likerouter.register('like_event', LikeViewSet, basename='like_event')

# get liked events 
#like_event_router = DefaultRouter()
#like_event_router.register('like_event_list', LikedEventViewSet, basename='like_event_list')

# ticket urls 
ticketviewrouter = DefaultRouter()
ticketviewrouter.register('ticketviewapi', TicketViewSet, basename='ticketviewapi')

# check if the user can add the ticket or not 
# check_ticket_addornot_router = DefaultRouter()
# check_ticket_addornot_router.register('checkticketadd', CheckTicketAddView, basename='checkticketadd')

# get latest featured events
featureviewrouter = DefaultRouter()
featureviewrouter.register('featureviewapi', IsFeaturedViewSet, basename='featureviewapi')

# get latest international events 
internationaleventviewrouter = DefaultRouter()
internationaleventviewrouter.register('internationaleventapi', GetInternationalEventViewSet, basename='internationaleventapi')

# popular events 
concertpopulareventviewrouter = DefaultRouter()
concertpopulareventviewrouter.register('popularconcerteventapi', GetPopularConcertViewSet, basename='popularconcerteventapi')

sportpopulareventviewrouter = DefaultRouter()
sportpopulareventviewrouter.register('popularsporteventapi',  GetPopularSportViewSet, basename='popularsporteventapi')

artpopulareventviewrouter = DefaultRouter()
artpopulareventviewrouter.register('populararteventapi', GetPopularArtViewSet, basename='populararteventapi')

familypopularviewrouter = DefaultRouter()
familypopularviewrouter.register('popularfamilyeventapi', GetPopularFamilyViewSet, basename='popularfamilyeventapi')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('account.urls')),
    path('', include(add_contributor_router.urls)),
    path('', include(eventviewrouter.urls)),
    path('', include(featureviewrouter.urls)), # for featured posts 
    path('', include(internationaleventviewrouter.urls)),
    path('', include(concertpopulareventviewrouter.urls)), # for popular concert event  
    path('', include(sportpopulareventviewrouter.urls)), # for popular sport event
    path('', include(artpopulareventviewrouter.urls)),# for popular art event
    path('', include(familypopularviewrouter.urls)),# for popular family  
    path('events/user/<int:user_id>/', event_user_view, name='event-user-list'), # get the event according to the user id 
    path('addcontributor/', MakeContributorViewSet.as_view({'post': 'create'}), name='add-contributor'),
    path('api/contributor/', include('contributor.urls')),
    path('api/event/', include('event.urls')),
    path('', include(likerouter.urls)),   # url for like 
    path('liked-events/<int:user_id>/', LikedEventViewSet.as_view({'get': 'list'}), name='liked-events'), # get all the event that a user has liked 
    path('', include(ticketviewrouter.urls)),# url for adding tikets in events 
    path('api/checkticketadd/<int:event_id>/<int:user_id>/', CheckTicketAddView.as_view(), name='check-ticket-add'), # check if the event is added by user 
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)