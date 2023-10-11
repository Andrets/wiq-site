from django.urls import path, re_path
from .views import SignUp, Login, CheckToken, LogOut, TaskView, CreateTask


urlpatterns = [
    path('signup', SignUp.as_view()),
    path('login', Login.as_view()),
    path('check', CheckToken),
    path('logout', LogOut.as_view()),
    path('task', TaskView.as_view()),
    path('create-task', CreateTask.as_view()),
]
