from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, TaskSerializer, CreateTaskSerializer
from rest_framework import status
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from .models import Task

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
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication, TokenAuthentication])
def CheckToken(request):
    return Response({'succesfull for {}'.format(request.user.email)}, status=status.HTTP_200_OK)

class LogOut(APIView):
    def get(self, request, format=None):
        logout(request)
        return Response({'message': 'successfull log out!'}, status=status.HTTP_200_OK)
    
class TaskView(APIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    
class CreateTask(APIView):
    serializer_class = CreateTaskSerializer
    queryset = Task.objects.all()
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            title = serializer.data.get('title')
            description = serializer.data.get('description')
            due_date = serializer.data.get('due_date')
            priority = serializer.data.get('priority')
            task = Task(title=title, description=description, due_date=due_date, priority=priority)
            task.save()
            return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)
        else:
            errors = serializer.errors
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
    
            