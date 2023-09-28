from rest_framework import serializers
from .models import LearningNote, User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin']

    def get_id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name + ' ' + obj.last_name
        stripped_name = name.strip()

        if name == '':
            name = obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class LearningNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningNote
        fields = ['id', 'user', 'title', 'content', 'created_at', 'updated_at', 'archived']
