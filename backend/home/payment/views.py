import requests 
from django.shortcuts import render
from django.conf import settings 
from rest_framework.decorators import api_view 
from rest_framework.response import Response 
from payment.serializers import PaymentSerializer
from django.shortcuts import get_object_or_404
from account.models import User
from rest_framework import status
from rest_framework import viewsets
from .models import Payment 
from rest_framework.pagination import CursorPagination

KHALTI_API_URL = "https://dev.khalti.com/api/v2/epayment/initiate/"
KHALTI_SECRET_KEY = "470361cd4cd147498123c353d461bd53"

@api_view(["POST"])
def initiate_payment(request): 
    "Initiate a payment request to khalti"
    data = request.data 
    print("Initiate the request")
    print(data)
    payload = {
        "return_url": "http://localhost:5173/payment-success",  
        "website_url": "http://localhost:3000",
        "amount": data.get("amount"),
        "purchase_order_id": data.get("purchase_order_id"),
        "purchase_order_name": data.get("purchase_order_name"),
        "ticket_id": data.get("ticket_id"),
        "ticket_type": data.get("ticket_type"),
        "customer_info": {
            "userid": data.get("customer_userid"),
            "email": data.get("customer_email"),
            "name": data.get("customer_name"),
        },
    }
    headers = {"Authorization": f"Key {KHALTI_SECRET_KEY}", "Content-Type": "application/json"}
    print(request.data.get("customer_name"))
    print(request.data.get("customer_email"))
    print(request.data.get("customer_userid"))
    response = requests.post(KHALTI_API_URL, json=payload, headers=headers)
    #save_payment_data(request.data.get("event_id"), request.data.get("ticket_id"), request.data.get("userid"), request.data.get("amount"), request.data.get("customer_email"), request.data.get("customer_name"))
    print(response.json())
    print("Payment Initiated")
    return Response(response.json(), status=response.status_code)

#def save_payment_data(event_id, ticket_id, user_id, amount, email, name):
#    print(event_id, ticket_id, user_id, amount, email, name)


@api_view(["POST"])
def verify_payment(request):
    # Verifies payment using khalti lookup API 
    print("Payment on replying on verify_payment section")
    print(request.data)
    print("Trying to get the auth token from frontend")
    print(request.session.get('authToken', 'default_value'))
    lookup_url = "https://dev.khalti.com/api/v2/epayment/lookup/"
    pidx = request.data.get("pidx")
    print("Printing the user id")
    print(request.user)
    if not pidx:
        return Response({"error":"Missing pidx"}, status=400)
    
    headers = headers = {"Authorization": f"Key {KHALTI_SECRET_KEY}", "Content-Type": "application/json"}
    print(request.data.get("customer_info"))
    print("Payment done")
    response = requests.post(lookup_url, json={"pidx":pidx}, headers=headers)
    return Response(response.json(), status=response.status_code)
 
@api_view(["POST"])
def get_payment_successdata(request):
    """
    Verifies payment using Khalti lookup API
    """
    print("Payment verification in progress...")
    pidx = request.data.get("pidx")
    status = request.data.get("status")
    total_amount = request.data.get("amount")
    check = request.data.get("check")
    customer_email = request.data.get("customer_email")
    customer_name = request.data.get("customer_name")
    customer_userid = request.data.get("customer_userid")
    event_id = request.data.get("event_id")
    ticket_id = request.data.get("ticket_id")
    ticket_type = request.data.get("ticket_type")
    mobile = request.data.get("mobile")
    purchase_order_id = request.data.get("purchase_order_id")
    purchase_order_name = request.data.get("purchase_order_name")

    # Logging received data
    print(f"Status: {status}")
    print(f"Total Amount: {total_amount}")
    print(check)
    print(f"customeruserid: {customer_userid}")
    print(customer_email)
    print(customer_name)
    print(event_id)
    print(ticket_id)
    print(ticket_type)
    print(f"Mobile: {mobile}")
    print(f"Purchase Order ID: {purchase_order_id}")
    print(f"Purchase Order Name: {purchase_order_name}")
    user = get_object_or_404(User, id=customer_userid)
    payment_data = {"user":user, "event":event_id, "ticket":ticket_id, "amount":total_amount, "email":customer_email, "name":customer_name, "ticket_type":ticket_type}
    serializer = PaymentSerializer(data=payment_data)
    if serializer.is_valid():
        serializer.save()
        print("data saved")
        return Response(
            {'msg': 'Payment success', 'data': serializer.data},
            status=status.HTTP_201_CREATED
        )
    return Response({'msg':'Payment not success'})

class PaymentDataSaveViewSet(viewsets.ViewSet):
    def create(self, request):
        print("data before saving the data")
        print(request.data)
       # request.data['amount'] = int(request.data['amount'])
        print("data after saving the data")
        print(request.data)
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Data Created Successfully'}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# store the transaction credential where the user will make the payment in 

# pagination in paymentlist 
class MyCursorPagination(CursorPagination):
    page_size = 20
    ordering = 'payment_id'
    cursor_query_param = 'transaction'

# list all the payment according to the event_id 
class PaymentListViewSet(viewsets.ViewSet):
    pagination_class = MyCursorPagination

    def retrieve(self, request, pk=None):
        if pk is None:
            return Response({'msg': 'Event ID not provided'}, status=status.HTTP_400_BAD_REQUEST)

        payments = Payment.objects.filter(event_id=pk).order_by('event_id')
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(payments, request)

        if page is not None:
            serializer = PaymentSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        return Response({'msg': 'No payments found for this event'}, status=status.HTTP_404_NOT_FOUND)


# check if the code and email exists 
@api_view(['POST'])
def change_payment_status(request):
    email = request.data.get('email')
    code = request.data.get('code')

    try:
        payment = Payment.objects.get(email=email, code=code)
        if payment.status == True: 
            payment.status = False 
        else:
            payment.status = True 
        payment.save()
        return Response({'message': 'Payment status changed.'}, status=status.HTTP_200_OK)
    except Payment.DoesNotExist:
        return Response({'error': 'Invalid email or code.'}, status=status.HTTP_404_NOT_FOUND)

class PaymentDetailPagination(CursorPagination):
    page_size = 20
    ordering = '-created_at'
    cursor_query_param = 'payments'

# get all the payment list of logged in user 
@api_view(['GET'])
def get_payment_detail(request, user_id):
    try:
        payment_list = Payment.objects.filter(user=user_id)
        
        paginator = PaymentDetailPagination()
        paginated_payments = paginator.paginate_queryset(payment_list, request)
        
        serializer = PaymentSerializer(paginated_payments, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Payment.DoesNotExist:
        return Response({'msg': "User not found"}, status=404)
