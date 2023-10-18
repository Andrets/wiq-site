from django.urls import path
from .views import CreateOrder, OrderStatus, InstaSubsServiceList, CancelOrder, RefillOrder, CheckBalance

urlpatterns = [
    path('create-order', CreateOrder.as_view()),
    path('order-status', OrderStatus.as_view()),
    path('insta-services', InstaSubsServiceList.as_view()),
    path('cancel-order', CancelOrder.as_view()),
    path('refill-order', RefillOrder.as_view()),
    path('checkbalance', CheckBalance.as_view()),
]
