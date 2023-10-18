from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView, Response
from .serializers import OrderSerializer, CancleOrderSerializer
from .utils import create_order, get_order, get_insta_subs_service, cancel_order, refill_order, get_balance
from rest_framework import status
from .models import Order
from rest_framework.exceptions import AuthenticationFailed
import jwt
from backend.models import User

# Create your views here.
            
class CreateOrder(APIView):
    serializer_class = OrderSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            token = request.COOKIES.get('jwt')
            if not token:
                raise AuthenticationFailed('Unauthenticated')
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            except jwt.exceptions.ExpiredSignatureError:
                raise AuthenticationFailed('Unauthenticated!')
            user = User.objects.filter(id=payload['id']).first()
            service = serializer.data.get('service')
            quantity = serializer.data.get('quantity')
            nickname = serializer.data.get('nickname')
            order = create_order(service=service, quantity=quantity, nickname=nickname)
            if "order" in order:
                order_id = order["order"]
                new_order = Order(user_id=user.id, order=order_id, service=service, quantity=quantity, nickname=nickname)
                new_order.save()
                return Response({"message": "success"}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'Balance or something went wrong!'}, status=status.HTTP_400_BAD_REQUEST)

class InstaSubsServiceList(APIView):
    def get(self, request, format=None):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Do not have JWT token')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.exceptions.ExpiredSignatureError:
            raise AuthenticationFailed('JWT token has been expired')
        
        list = get_insta_subs_service()
        return JsonResponse(list, safe=False, status=status.HTTP_200_OK)
      
class OrderStatus(APIView):
    def get(self, request, format=None):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('User is not authenticated')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.exceptions.ExpiredSignatureError:
             raise AuthenticationFailed('Bad jwt token!')
        
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        user = User.objects.filter(id=payload['id']).first()
        order = Order.objects.filter(user_id=user.id)
        if order.exists():
            order_ids = ','.join([str(order.order) for order in order])
            orderstatus = get_order(order=order_ids)
            return Response(orderstatus)
        else:
            return Response({'message': 'No orders found for this user'}, status=status.HTTP_404_NOT_FOUND)
        
class CancelOrder(APIView):
    def post(self, request, format=None):
        order = request.data.get('order')
        cancel = cancel_order(order=order)
        return Response(cancel, status=status.HTTP_200_OK)
    
class RefillOrder(APIView):
    def post(self, request, format=None):
        order = request.data.get('order')
        refill = refill_order(order=order)
        if "error" in refill:
            return Response({'message': 'Refill disabled for this order'}, status=status.HTTP_403_FORBIDDEN)
        return Response(refill, status=status.HTTP_200_OK)
    
class CheckBalance(APIView):
    def get(self, request, format=None):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Not jwt')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.exceptions.ExpiredSignatureError:
            raise AuthenticationFailed('Bad jwt')
        
        balance = get_balance()
        return Response(balance)
            
        