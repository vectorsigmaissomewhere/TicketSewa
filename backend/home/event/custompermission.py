from rest_framework.permissions import BasePermission
from contributor.models import Contributor  # Import the Contributor model

# I haven't used this anywhere 
class MyPermission(BasePermission):
    
    def has_permission(self, request, view):
        user_id = request.query_params.get('id')  
        
        if user_id:
            try:
                contributor = Contributor.objects.get(user__id=user_id)
                if contributor.verified:
                    return True 
                return False  
            except Contributor.DoesNotExist:
                return False