from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Order
        fields = (
            'user_id', 'order', 'service', 'quantity', 'nickname', 'posts', 'list'
        )
        
class CancleOrderSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Order
        fields = (
            "__all__"
        )