from django.shortcuts import render
from .serializers import MakeContributorSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from account.renderers import UserRenderer
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView 
from contributor.models import Contributor

# request admin to be contributor
class MakeContributorViewSet(viewsets.ViewSet):
    parser_classes = [MultiPartParser, FormParser]  # Added parsers to handle file uploads

    def create(self, request):
        renderer_classes = [UserRenderer]
        permission_classes = [IsAuthenticated]
        serializer = MakeContributorSerializer(data=request.data)
        # try adding validation to check if the data is valid or not
        """
        for example:
        if serializer.is_valid():
            ...restofthecode.........
        """
        if serializer.is_valid():  # Added validation check
            try:
                serializer.save()
                return Response(
                    {'msg': 'Contributor Request has been sent'},
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                return Response(
                    {'error': f'An error occurred while saving the group: {str(e)}'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class GetContributorVerification(APIView):
    def get(self, request, pk=None, format=None):
        id = pk 
        if id is not None:
            contributor_object = Contributor.objects.get(user_id=id)
            serializer = MakeContributorSerializer(contributor_object)
            print(serializer.data['verified'])
            return Response({'verified':serializer.data['verified']})
        return Response(serializer.errors, status.status.HTTP_400_BAD_REQUEST)

