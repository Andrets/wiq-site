from django.shortcuts import render
from rest_framework.views import APIView
from .utils import invoice_order
from .models import QiwiPayment
from .serializers import PaymentSerializer
from rest_framework.response import Response
from rest_framework import status
import uuid


# Create your views here.

class InvoiceOrder(APIView):
    serializer_class = PaymentSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            billid = str(uuid.uuid4())
            amount_currency = serializer.data.get('amount_currency')
            amount_value = serializer.data.get('amount_value')
            payment = invoice_order(billid=billid, amount_value=amount_value, amount_currency=amount_currency)
            if "errorCode" in payment:
                return Response({'message': 'error'}, status=status.HTTP_400_BAD_REQUEST)
            invoice = QiwiPayment(billid=billid, amount_currency=amount_currency, amount_value=amount_value)
            invoice.save()
            return Response(payment, status=status.HTTP_200_OK)