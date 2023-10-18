from django.urls import path
from .views import TaskView, CreateTask




urlpatterns = [
    path('task', TaskView.as_view()),
    path('create-task', CreateTask.as_view()),
]