from rest_framework import serializers
from .models import QiwiPayment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = QiwiPayment
        fields = (
            'billid', 'amount_currency', 'amount_value'
        )