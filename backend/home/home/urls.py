from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from contributor import views 
from event.views import EventModelViewSet
from rest_framework.routers import DefaultRouter

add_contributor_router = DefaultRouter()
add_contributor_router.register('addcontributor', views.MakeContributorViewSet, basename='addcontributor')

# router for listing, retrieving and adding event 
eventviewrouter = DefaultRouter()
eventviewrouter.register('eventviewapi', EventModelViewSet, basename='eventviewapi')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('account.urls')),
    path('', include(add_contributor_router.urls)),
    path('', include(eventviewrouter.urls)),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)