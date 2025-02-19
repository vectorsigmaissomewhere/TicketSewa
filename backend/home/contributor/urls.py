from django.urls import path, include 
from contributor.views import GetContributorVerification, GetContributorIdView

urlpatterns = [
    path('check-contributor-verification/<int:pk>/', GetContributorVerification.as_view(), name='check-contributor-verification'), 
    path('contributor/<int:user_id>/', GetContributorIdView.as_view(), name='contributor-detail'),    
]
