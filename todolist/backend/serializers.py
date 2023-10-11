from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ('id', 'username', 'password', 'email')
        
class TaskSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Task
        fields = (
            'title', 'description', 'created_at', 'due_date', 'is_completed', 'priority'
        )
        
class CreateTaskSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Task
        fields = ('title', 'description', 'due_date', 'priority')