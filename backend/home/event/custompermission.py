from rest_framework.permissions import BasePermission 
from account.models import User 
class MyPermission(BasePermission):
    def has_permission(self, request, id):
        
