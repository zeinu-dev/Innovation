from rest_framework import viewsets, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .models import Innovation
from .serializers import InnovationSerializer


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        # allow admin/staff to do anything
        if request.user and request.user.is_staff:
            return True
        # otherwise only owner can modify
        return obj.submitter == request.user


class InnovationViewSet(viewsets.ModelViewSet):
    serializer_class = InnovationSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Innovation.objects.all()
        return Innovation.objects.filter(submitter=user)

    def perform_create(self, serializer):
        serializer.save(submitter=self.request.user)

    def get_permissions(self):
        # allow authenticated users to create/list; detail updates restricted by object permission
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsOwnerOrAdmin()]
        return [permissions.IsAuthenticated()]
