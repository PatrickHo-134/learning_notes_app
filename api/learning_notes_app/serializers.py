from rest_framework import serializers
from .models import LearningNote

class LearningNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningNote
        fields = ['id', 'user', 'title', 'content', 'created_at', 'updated_at', 'archived']
