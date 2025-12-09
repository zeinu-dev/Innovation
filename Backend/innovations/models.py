from django.db import models
from django.conf import settings


class Innovation(models.Model):
    STATUS_PENDING = 'pending'
    STATUS_UNDER_REVIEW = 'under_review'
    STATUS_APPROVED = 'approved'
    STATUS_REJECTED = 'rejected'

    STATUS_CHOICES = [
        (STATUS_PENDING, 'Pending'),
        (STATUS_UNDER_REVIEW, 'Under Review'),
        (STATUS_APPROVED, 'Approved'),
        (STATUS_REJECTED, 'Rejected'),
    ]

    submitter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='innovations')
    title = models.CharField(max_length=500)
    # 1. Introduction: brief summary and intended benefits
    introduction = models.TextField(blank=True)
    # 2. Detailed description (technical specs, intended use, risks, process)
    description = models.TextField(blank=True)
    development_process = models.TextField(blank=True)

    # 3. Evidence of safety and efficacy (text + optional attachment)
    evidence = models.TextField(blank=True)
    evidence_attachment = models.FileField(upload_to='innovations/evidence/', null=True, blank=True)

    # 4. Regulatory compliance and documents
    regulatory_compliance = models.TextField(blank=True)
    regulatory_documents = models.FileField(upload_to='innovations/regulatory/', null=True, blank=True)

    # 5. Intellectual property
    intellectual_property = models.TextField(blank=True)

    # 6. Manufacturing and quality control
    manufacturing_and_quality_control = models.TextField(blank=True)

    # 7. Marketing and distribution
    marketing_and_distribution = models.TextField(blank=True)

    # 8. Stakeholder engagement
    stakeholder_engagement = models.TextField(blank=True)

    # 9. Implementation plan
    implementation_plan = models.TextField(blank=True)

    # 10. Financial considerations
    financial_considerations = models.TextField(blank=True)

    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default=STATUS_PENDING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.get_status_display()})"
