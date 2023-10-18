from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('login', index, name='login'),
    path('register', index, name='register'),
    path('create-order', index, name='create-order'),
    path('myorders', index, name='myorders'),
]
