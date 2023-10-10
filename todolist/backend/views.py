from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import status
from django.contrib.auth import logout
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class SignUp(APIView):
    def post(self, request, format=None):
        serialzier = UserSerializer(data=request.data)
        if serialzier.is_valid():
            serialzier.save()
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return Response({"token": token.key, "user": serialzier.data}, status=status.HTTP_200_OK)
        return Response(serialzier.errors, status=status.HTTP_400_BAD_REQUEST)

class Login(APIView):
    def post(self, request, format=None):
        user = get_object_or_404(User, username=request.data['username'])
        if not user.check_password(request.data['password']):
            return Response({'detail': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(instance=user)
        
        return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)
    
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def TokenCheck(request):
    return Response({'successfull for {}'.format(request.user.email)})

class LogOut(APIView):
    def get(self, request, format=None):
        logout(request=request)
        return Response({'message': 'successfull log out!'}, status=status.HTTP_200_OK)