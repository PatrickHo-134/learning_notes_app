from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import LearningNote
from .serializers import LearningNoteSerializer


class LearningNoteListView(APIView):
    permission_classes = [IsAuthenticated]  # Require authentication for this view

    def get(self, request):
        learning_notes = LearningNote.objects.all()
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
