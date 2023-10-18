from django.db import models

# Create your models here.

class QiwiPayment(models.Model):
    billid = models.CharField(max_length=100, unique=True, default=1)
    amount_currency = models.TextField(max_length=10, default='RUB')
    amount_value = models.DecimalField(max_digits=6, decimal_places=2)
    