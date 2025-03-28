import requests 
from django.shortcuts import render
from django.conf import settings 
from rest_framework.decorators import api_view 
from rest_framework.response import Response 

KHALTI_API_URL = "https://dev.khalti.com/api/v2/epayment/initiate/"
KHALTI_SECRET_KEY = "470361cd4cd147498123c353d461bd53"

@api_view(["POST"])
def initiate_payment(request):
    "Initiate a payment request to khalti"
    data = request.data 
    payload = {
        "return_url": "http://localhost:5173/payment-success",  # React success page
        "website_url": "http://localhost:3000",
        "amount": data.get("amount"),
        "purchase_order_id": data.get("purchase_order_id"),
        "purchase_order_name": data.get("purchase_order_name"),
        "customer_info": {
            "name": data.get("customer_name"),
            "email": data.get("customer_email"),
            "phone": data.get("customer_phone"),
        },
    }
    headers = {"Authorization": f"Key {KHALTI_SECRET_KEY}", "Content-Type": "application/json"}
    print(request.data.get("customer_name"))
    print(request.data.get("customer_email"))
    print(request.data.get("customer_phone"))
    response = requests.post(KHALTI_API_URL, json=payload, headers=headers)
    print("Payment Initiated")
    return Response(response.json(), status=response.status_code)

@api_view(["POST"])
def verify_payment(request):
    # Verifies payment using khalti lookup API 
    print("Payment on replying on verify_payment section")
    lookup_url = "https://dev.khalti.com/api/v2/epayment/lookup/"
    pidx = request.data.get("pidx")

    if not pidx:
        return Response({"error":"Missing pidx"}, status=400)
    
    headers = headers = {"Authorization": f"Key {KHALTI_SECRET_KEY}", "Content-Type": "application/json"}
    print(request.data.get("customer_name"))
    print("Payment done")
    response = requests.post(lookup_url, json={"pidx":pidx}, headers=headers)
    return Response(response.json(), status=response.status_code)


@api_view(["POST"])
def get_payment_successdata(request):
    """
    Verifies payment using Khalti lookup API
    """
    print("Payment verification in progress...")

    # Extracting data from request
    pidx = request.data.get("pidx")
    status = request.data.get("status")
    total_amount = request.data.get("total_amount")
    mobile = request.data.get("mobile")
    purchase_order_id = request.data.get("purchase_order_id")
    purchase_order_name = request.data.get("purchase_order_name")

    # Logging received data
    print(f"Status: {status}")
    print(f"Total Amount: {total_amount}")
    print(f"Mobile: {mobile}")
    print(f"Purchase Order ID: {purchase_order_id}")
    print(f"Purchase Order Name: {purchase_order_name}")
    

    return Response({"msg": "This is the response"})

