from django.urls import path
from .views import SignUp, SignIn, CheckUser, SignOut


urlpatterns = [
    path('register', SignUp.as_view()),
    path('login', SignIn.as_view()),
    path('checkuser', CheckUser.as_view()),
    path('signout', SignOut.as_view()),
]
