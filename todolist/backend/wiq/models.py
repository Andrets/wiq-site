from django.db import models

# Create your models here.

class Order(models.Model):
    user_id = models.CharField(max_length=255, default=1)
    order = models.BigIntegerField(default=1, unique=True) 
    service = models.IntegerField(default=1)
    quantity = models.BigIntegerField(default=1)
    nickname = models.TextField(max_length=150, default='')
    posts = models.TextField(blank=True, null=True)
    list = models.TextField(blank=True, null=True)
    
    
