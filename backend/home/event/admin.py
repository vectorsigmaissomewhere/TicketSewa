from django.contrib import admin
from .models import Event 

class EventAdmin(admin.ModelAdmin):
    list_display = ('event_id', 'name', 'city')
    search_fields = ('name',)
    list_filter = ('is_featured',)

admin.site.register(Event, EventAdmin)