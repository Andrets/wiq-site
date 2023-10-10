from django.urls import path, re_path
from .views import SignUp, Login, TokenCheck, LogOut


urlpatterns = [
    path('signup', SignUp.as_view()),
    path('login', Login.as_view()),
    re_path('check', TokenCheck),
    path('logout', LogOut.as_view()),
]
