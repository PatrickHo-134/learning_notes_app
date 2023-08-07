from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import LearningNote
from .serializers import LearningNoteSerializer

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

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            # User credentials are valid, create and return a token
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            # Invalid credentials
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
