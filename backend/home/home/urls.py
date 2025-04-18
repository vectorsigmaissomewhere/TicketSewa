from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from contributor.views import MakeContributorViewSet 
from event import views
from event.views import EventModelViewSet, EventContribAuthModelViewSet, LikeViewSet, LikedEventViewSet, CommentModelViewSet, IsFeaturedViewSet, GetInternationalEventViewSet, GetPopularConcertViewSet, GetPopularSportViewSet, GetPopularArtViewSet, GetPopularFamilyViewSet, VisitedEventViewSet, SimilarEventModelViewSet, CollaborativeEventModelViewSet, RateModelViewSet
from rest_framework.routers import DefaultRouter
from ticket.views import TicketViewSet, CheckTicketAddView
from payment.views import PaymentDataSaveViewSet, PaymentListViewSet

add_contributor_router = DefaultRouter()
add_contributor_router.register('addcontributor', MakeContributorViewSet, basename='addcontributor')

# router for listing, retrieving and adding event 
eventviewrouter = DefaultRouter()
eventviewrouter.register('eventviewapi', EventModelViewSet, basename='eventviewapi')

# router for adding comment 
commentviewrouter = DefaultRouter()
commentviewrouter.register('commentviewapi', CommentModelViewSet, basename='commentviewapi')

# router for retrieving suggested event
suggestedeventrouter = DefaultRouter()
suggestedeventrouter.register('suggestedeventviewapi', SimilarEventModelViewSet, basename='suggestedeventviewapi')

# router for rating event 
rateeventrouter = DefaultRouter()
rateeventrouter.register('rateeventviewapi', RateModelViewSet,  basename='rateeventviewapi')

collaborativeeventrouter = DefaultRouter()
collaborativeeventrouter.register('collaborativeeventviewapi', CollaborativeEventModelViewSet, basename='collaborativeeventviewapi')

# transaction showing view 
paymenteventrouter = DefaultRouter()
paymenteventrouter.register('paymenteventviewapi', PaymentListViewSet, basename='paymenteventviewapi')

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

# save payment 
paymentsaveviewrouter = DefaultRouter()
paymentsaveviewrouter.register('paymentsaveapi', PaymentDataSaveViewSet, basename='paymentsaveapi')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('account.urls')),
    path('', include(add_contributor_router.urls)),
    path('', include(eventviewrouter.urls)),
    path('', include(suggestedeventrouter.urls)), # get suggested events 
    path('', include(collaborativeeventrouter.urls)), # get collaborative recommended events 
    path('', include(commentviewrouter.urls)), # post the commented events 
    path('', include(featureviewrouter.urls)), # for featured posts 
    path('', include(rateeventrouter.urls)), # for rating event 
    path('', include(internationaleventviewrouter.urls)),
    path('', include(concertpopulareventviewrouter.urls)), # for popular concert event  
    path('', include(sportpopulareventviewrouter.urls)), # for popular sport event
    path('', include(artpopulareventviewrouter.urls)),# for popular art event
    path('', include(familypopularviewrouter.urls)),# for popular family  
    path('', include(paymentsaveviewrouter.urls)), # for saving payment save router
    path('', include(paymenteventrouter.urls)),# show all the transactions 
    path('events/user/<int:user_id>/', event_user_view, name='event-user-list'), # get the event according to the user id 
    path('addcontributor/', MakeContributorViewSet.as_view({'post': 'create'}), name='add-contributor'),
    path('api/contributor/', include('contributor.urls')),
    path('api/event/', include('event.urls')),
    path('api/payment/', include('payment.urls')),
    path('', include(likerouter.urls)),   # url for like 
    path('liked-events/<int:user_id>/', LikedEventViewSet.as_view({'get': 'list'}), name='liked-events'), # get all the event that a user has liked 
    path('visited-events/<int:user_id>/', VisitedEventViewSet.as_view({'get':'list'}), name='visited-events'), # get all the event that a user has visited 
    path('', include(ticketviewrouter.urls)),# url for adding tikets in events 
    path('api/checkticketadd/<int:event_id>/<int:user_id>/', CheckTicketAddView.as_view(), name='check-ticket-add'), # check if the event is added by user 
    # payment
    path('payment/', include('payment.urls')), 
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)