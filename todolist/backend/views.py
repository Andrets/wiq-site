from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

# Create your views here.

class SignUp(APIView):
    serializer = UserSerializer
    
    def post(self, request, format=None):
        serialzier = request.data
        if serialzier.is_valid():
            serialzier.save()
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return Response({'token': token.key,
                            'user': serialzier.data}, status=status.HTTP_200_OK)
        return Response(serialzier.errors, status=status.HTTP_400_BAD_REQUEST)