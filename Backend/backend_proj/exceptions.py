from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging


def custom_exception_handler(exc, context):
    """Call DRF's default exception handler first; if it returns None, convert exception to JSON response.

    This ensures API endpoints always return JSON (useful for frontend error handling).
    """
    logger = logging.getLogger(__name__)
    # Let DRF handle known exceptions (ValidationError, AuthenticationFailed, etc.)
    response = drf_exception_handler(exc, context)

    if response is not None:
        return response

    # For unhandled exceptions, return a JSON error with 500
    logger.exception('Unhandled exception in view: %s', exc)
    return Response({'detail': str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
