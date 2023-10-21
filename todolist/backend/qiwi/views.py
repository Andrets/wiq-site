from django.shortcuts import render
from rest_framework.views import APIView
from .utils import invoice_order, reject_invoice, check_invoice
from .models import QiwiPayment
from backend.models import User
from .serializers import PaymentSerializer
from rest_framework.response import Response
from rest_framework import status
import uuid
import jwt
from rest_framework.exceptions import AuthenticationFailed
from django.http import JsonResponse


# Create your views here.

class InvoiceOrder(APIView):
    serializer_class = PaymentSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            token = request.COOKIES.get('jwt')
            if not token:
                raise AuthenticationFailed('Not jwt token')
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            except jwt.exceptions.ExpiredSignatureError:
                raise AuthenticationFailed('JWT has been expired')
            user = User.objects.filter(id=payload['id']).first()
            billid = str(uuid.uuid4())
            amount_currency = serializer.data.get('amount_currency')
            amount_value = serializer.data.get('amount_value')
            payment = invoice_order(billid=billid, amount_value=amount_value, amount_currency=amount_currency)
            if "errorCode" in payment:
                return Response({'message': 'error'}, status=status.HTTP_400_BAD_REQUEST)
            invoice = QiwiPayment(user=user.id, billid=billid, amount_currency=amount_currency, amount_value=amount_value)
            invoice.save()
            return Response(payment, status=status.HTTP_200_OK)
        
class RejectInvoice(APIView):
    
    def get(self, request, format=None):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('not jwt')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.exceptions.ExpiredSignatureError:
            raise AuthenticationFailed('JWT token has been expired')
        user_id = User.objects.filter(id=payload['id']).first()
        
        try:
            qiwi_payment_id = QiwiPayment.objects.get(user=user_id.id)
            billid = qiwi_payment_id.billid
            reject = reject_invoice(billid=billid)
            if "errorCode" in reject:
                return Response({'message': 'error'}, status=status.HTTP_400_BAD_REQUEST)
            return Response(reject, status=status.HTTP_200_OK)
        except QiwiPayment.DoesNotExist:
            return Response({'message': 'No payment found'},status=status.HTTP_404_NOT_FOUND)
        
class CheckInvoice(APIView):
    def get(self, request, format=None):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Not jwt')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.exceptions.ExpiredSignatureError:
            raise AuthenticationFailed('JWT token is expired')
        
        user = User.objects.filter(id=payload['id']).first()
        try:
            payment_id = QiwiPayment.objects.get(user=user.id)
            billid = payment_id.billid
            check = check_invoice(billid=billid)
            if "Invoice not found" in check:
                return Response({'message': 'Invoice not found'}, status=status.HTTP_400_BAD_REQUEST)
            if "PAID" in check:
                payment_id.delete()
                return Response({'message': 'success paid'}, status=status.HTTP_200_OK)
            if "EXPIRED" in check:
                payment_id.delete()
                return Response({'message': 'form has been expired'}, status=status.HTTP_410_GONE)
            if "REJECTED" in check:
                reject_invoice(billid=billid)
                payment_id.delete()
                return Response({'message': 'form has been rejected'}, status=status.HTTP_403_FORBIDDEN)
            return Response(check, status=status.HTTP_200_OK)
        except QiwiPayment.DoesNotExist:
            return Response({'message': 'Not payment found'}, status=status.HTTP_404_NOT_FOUND)
            