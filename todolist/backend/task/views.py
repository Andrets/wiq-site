from django.shortcuts import render
from .models import Task
from .serializers import TaskSerializer
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator

# Create your views here.

class TaskView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    
class CreateTask(APIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data, user=request.data)
        if serializer.is_valid():
            title = serializer.data.get('title')
            description = serializer.data.get('description')
            due_date = serializer.data.get('due_date')
            priority = serializer.data.get('priority')
            serializer.save(user=request.user)
            task = Task(title=title, description=description, due_date=due_date, priority=priority)
            task.save(user=user)
            return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)
        else:
            errors = serializer.errors
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class GetTask(APIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    @method_decorator(permission_classes([IsAuthenticated]))
    def get(self, request, format=None):
        task = request.GET.get(self.queryset)
        if task != None:
            
            task = Task.objects.filter(task=task)