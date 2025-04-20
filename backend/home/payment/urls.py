from django.urls import path
from payment.views import initiate_payment, verify_payment, get_payment_successdata, change_payment_status, get_payment_detail

urlpatterns = [
    path("initiate-payment/", initiate_payment, name="initiate-payment"),
    path("verify-payment/", verify_payment, name="verify-payment"),
    path("get_payment_successdata/", get_payment_successdata, name="get_payment_successdata"),
    # change the status code 
    path("change_payment_status/", change_payment_status, name="change_payment_status"),
    # get the payment detail of the user 
    path("get_the_payment/<int:user_id>/", get_payment_detail, name="get_the_payment"),
]