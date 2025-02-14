from django.urls import path, include 
from contributor.views import GetContributorVerification

urlpatterns = [
    path('check-contributor-verification/<int:pk>/', GetContributorVerification.as_view(), name='check-contributor-verification')
]
