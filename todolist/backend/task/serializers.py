from rest_framework import serializers
from .models import Task



class TaskSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Task
        fields = (
            'user', 'title', 'description', 'created_at', 'due_date', 'is_completed', 'priority'
        )
        
class CreateTaskSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Task
        fields = ('title', 'description', 'due_date', 'priority')