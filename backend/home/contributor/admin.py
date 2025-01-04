from django.contrib import admin
from .models import Contributor
class ContributorAdmin(admin.ModelAdmin):
    list_display = ('contributorid', 'user', 'verified')  # Fields to display in the admin list view
    search_fields = ('user__username',)  # Add a search bar for the username
    list_filter = ('verified',)  # Add filter options for the 'verified' field

# Register the model with its custom admin
admin.site.register(Contributor, ContributorAdmin)