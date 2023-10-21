from django.urls import path
from .views import InvoiceOrder, RejectInvoice, CheckInvoice


urlpatterns = [
    path('invoice-form', InvoiceOrder.as_view()),
    path('reject-invoice', RejectInvoice.as_view()),
    path('check-invoice', CheckInvoice.as_view()),
]
