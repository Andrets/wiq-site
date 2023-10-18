from django.urls import path
from .views import InvoiceOrder


urlpatterns = [
    path('invoice-form', InvoiceOrder.as_view())
]
