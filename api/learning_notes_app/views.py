from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import LearningNote, User
from .serializers import LearningNoteSerializer, UserSerializer, UserSerializerWithToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_timeline(request, pk):
    learning_notes = LearningNote.objects.filter(archived=False, user=pk).order_by('-created_at')
    serializer = LearningNoteSerializer(learning_notes, many=True)

    return Response(serializer.data)

class LearningNoteListView(APIView):
    permission_classes = [IsAuthenticated]  # Require authentication for this view

    def get(self, request):
        learning_notes = LearningNote.objects.filter(archived=False).order_by('-created_at')
        serializer = LearningNoteSerializer(learning_notes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LearningNoteSerializer(data=request.data)

        if serializer.is_valid():
            user = request.user if request.user.is_authenticated else None
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LearningNoteDetailView(APIView):
    permission_classes = [IsAuthenticated]  # Require authentication for this view

    def get_object(self, pk):
        try:
            return LearningNote.objects.get(pk=pk)
        except LearningNote.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        learning_note = self.get_object(pk)
        serializer = LearningNoteSerializer(learning_note)
        return Response(serializer.data)

    def put(self, request, pk):
        learning_note = self.get_object(pk)
        serializer = LearningNoteSerializer(learning_note, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        learning_note = self.get_object(pk)
        learning_note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])  # Set required permissions here
def archive_learning_note(request, pk):
    try:
        learning_note = LearningNote.objects.get(pk=pk)
    except LearningNote.DoesNotExist:
        return Response({"error": "Learning note not found."}, status=status.HTTP_404_NOT_FOUND)

    # Check if the user has permission to archive the learning note (optional)
    if not request.user.has_perm('learning_notes_app.archive_learning_note', learning_note):
        return Response({"error": "You do not have permission to archive this learning note."}, status=status.HTTP_403_FORBIDDEN)

    learning_note.archived = True
    learning_note.save()

    serializer = LearningNoteSerializer(learning_note)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_learning_note(request, userId):
    serializer = LearningNoteSerializer(data=request.data)

    if serializer.is_valid():
        user = request.user if request.user.is_authenticated else None
        print(user);

        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([permissions.IsAuthenticated])
def update_learning_note(request, pk):
    try:
        learning_note = LearningNote.objects.get(pk=pk)
    except LearningNote.DoesNotExist:
        return Response({"error": "Learning note not found."}, status=status.HTTP_404_NOT_FOUND)

    if learning_note.user != request.user:
        return Response({"error": "You do not have permission to update this learning note."}, status=status.HTTP_403_FORBIDDEN)

    serializer = LearningNoteSerializer(learning_note, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name = data['first_name'],
            last_name = data['last_name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)

        return Response(serializer.data)
    except:
        message = {'detail':'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
