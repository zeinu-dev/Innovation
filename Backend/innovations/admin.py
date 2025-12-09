from django.contrib import admin
from .models import Innovation


@admin.register(Innovation)
class InnovationAdmin(admin.ModelAdmin):
    list_display = ('title', 'submitter', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('title', 'submitter__username',)
    readonly_fields = ('created_at', 'updated_at')