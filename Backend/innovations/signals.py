from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings

from .models import Innovation


@receiver(pre_save, sender=Innovation)
def innovation_pre_save(sender, instance, **kwargs):
    # store previous status so post_save can compare
    if instance.pk:
        try:
            old = Innovation.objects.get(pk=instance.pk)
            instance._old_status = old.status
        except Innovation.DoesNotExist:
            instance._old_status = None
    else:
        instance._old_status = None


@receiver(post_save, sender=Innovation)
def innovation_post_save(sender, instance, created, **kwargs):
    old = getattr(instance, '_old_status', None)
    # notify only on status change (ignore initial creation)
    if created:
        return
    if old != instance.status:
        recipient = None
        try:
            if instance.submitter_email:
                recipient = instance.submitter_email
            elif instance.submitter and instance.submitter.email:
                recipient = instance.submitter.email
        except Exception:
            recipient = None

        if not recipient:
            return

        subject = f"Innovation submission status updated: {instance.title}"
        message_lines = [
            f"Hello,",
            "",
            f"Your submission '{instance.title}' has changed status.",
            f"Previous status: {old}",
            f"Current status: {instance.status}",
            "",
        ]
        if instance.feedback:
            message_lines += ["Reviewer feedback:", instance.feedback, ""]

        frontend = getattr(settings, 'FRONTEND_URL', 'http://localhost:5173')
        message_lines += [f"You can view your submissions and status at: {frontend}", "", "Regards,", "Innovation Team"]

        message = "\n".join(message_lines)

        from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'no-reply@localhost')
        try:
            send_mail(subject, message, from_email, [recipient], fail_silently=False)
        except Exception as e:
            # don't raise on email failure; log to console if possible
            try:
                import logging
                logging.getLogger(__name__).exception('Failed to send status email: %s', e)
            except Exception:
                pass
