from django.urls import path
from payment.views import initiate_payment, verify_payment, get_payment_successdata, change_payment_status

urlpatterns = [
    path("initiate-payment/", initiate_payment, name="initiate-payment"),
    path("verify-payment/", verify_payment, name="verify-payment"),
    path("get_payment_successdata/", get_payment_successdata, name="get_payment_successdata"),
    # change the status code 
    path("change_payment_status/", change_payment_status, name="change_payment_status"),
]