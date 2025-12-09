from django.conf import settings
from django.db import models


class Profile(models.Model):
	user = models.OneToOneField(
		settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile'
	)
	title = models.CharField(max_length=255, blank=True)
	bio = models.TextField(blank=True)
	photo = models.ImageField(upload_to='profiles/', null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return f"Profile for {self.user.get_username()}"


