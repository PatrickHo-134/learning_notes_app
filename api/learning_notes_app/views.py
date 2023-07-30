from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import LearningNoteSerializer
from .models import LearningNote

class LearningNoteCreateView(APIView):
     def get(self, request, pk):
        try:
            if pk is None:
                learning_notes = LearningNote.objects.all()
            else:
                learning_notes = LearningNote.objects.get(pk=pk)
        except LearningNote.DoesNotExist:
            return Response({"detail": "Learning Note not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = LearningNoteSerializer(learning_notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

     def post(self, request):
        serializer = LearningNoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
