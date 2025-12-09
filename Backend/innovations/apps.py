from django.apps import AppConfig


class InnovationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'innovations'

    def ready(self):
        # import signal handlers
        from . import signals  # noqa
