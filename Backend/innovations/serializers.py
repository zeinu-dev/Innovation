from rest_framework import serializers
from .models import Innovation


class InnovationSerializer(serializers.ModelSerializer):
    submitter = serializers.ReadOnlyField(source='submitter.id')

    class Meta:
        model = Innovation
        fields = (
                'id', 'submitter', 'title', 'introduction', 'description', 'development_process',
                'evidence', 'evidence_attachment', 'regulatory_compliance', 'regulatory_documents',
                'intellectual_property', 'manufacturing_and_quality_control', 'marketing_and_distribution', 'stakeholder_engagement',
                'implementation_plan', 'financial_considerations',
                'status', 'created_at', 'updated_at'
        )
        read_only_fields = ('created_at', 'updated_at', 'submitter', 'status')

    def create(self, validated_data):
        request = self.context.get('request')
        user = getattr(request, 'user', None)
        if user and user.is_authenticated:
            validated_data['submitter'] = user
        return super().create(validated_data)
