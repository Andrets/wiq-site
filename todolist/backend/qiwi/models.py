from django.db import models

# Create your models here.

class QiwiPayment(models.Model):
    user = models.CharField(max_length=255, default=1)
    billid = models.CharField(max_length=100, unique=True, default=1)
    amount_value = models.DecimalField(max_digits=6, decimal_places=2)
    