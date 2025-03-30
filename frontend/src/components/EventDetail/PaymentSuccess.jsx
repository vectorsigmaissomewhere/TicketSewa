import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { decodeToken } from '../../Utils/authtoken';


const PaymentSuccess = () => {
  const location = useLocation();

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const verifyPayment = async (pidx) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/payment/verify-payment/", { pidx });
      console.log("Printing response data");
      console.log(response.data);
      if (response.data.status === "Completed") {
        alert("Payment verified successfully!");
      } else {
        alert("Payment verification failed!");
      }
    } catch (error) {
      console.error("Payment verification failed", error);
      alert("Error verifying payment.");
    }
  };

  const sendPaymentData = async () => {
    const paymentDetails = JSON.parse(sessionStorage.getItem("paymentDetails")) || {};
    const token = localStorage.getItem('authToken');
    const decodedToken = decodeToken(token);
    const userId = decodedToken?.user_id || null;
    const data = {
      pidx: queryParams.get("pidx"),
      status: queryParams.get("status"),
      total_amount: queryParams.get("amount"),
      check : paymentDetails.check || "Not found",
      customer_email : paymentDetails.customer_email || "Not found",
      customer_name : paymentDetails.customer_name || "Not found",  
      customer_userid : userId,
      event_id : paymentDetails.event_id || "Not found",
      purchase_order_id : paymentDetails.purchase_order_id || "Not found",
      purchase_order_name : paymentDetails.purchase_order_name || "Not found",
      ticket_id : paymentDetails.ticket_id || "Not found",
      ticket_type : paymentDetails.ticket_type || "Not found",
      mobile: queryParams.get("mobile"),
      purchase_order_id: queryParams.get("purchase_order_id"),
      purchase_order_name: queryParams.get("purchase_order_name"),
    };
    const somedata = {
      user : userId,
      event : paymentDetails.event_id || "Not found",
      ticket : paymentDetails.ticket_id || "Not found",
      amount: queryParams.get("amount"),
      email : paymentDetails.customer_email || "Not found",
      name : paymentDetails.customer_name || "Not found", 
      ticket_type : paymentDetails.ticket_type || "Not found",
    }

    console.log("Sending Payment Data:", data); 

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/payment/get_payment_successdata/",
        data
      );
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error sending payment data:", error);
    }
  };

  useEffect(() => {
    const pidx = queryParams.get("pidx");
    if (pidx) {
      verifyPayment(pidx);
      sendPaymentData(); 
    }
  }, [queryParams]);

  useEffect(() => {
    const status = queryParams.get("status");
    const transactionId = queryParams.get("transaction_id");

    if (status === "Completed") {
      alert(`Payment Successful! Transaction ID: ${transactionId}`);
    } else {
      alert("Payment Failed or Canceled");
    }
  }, [queryParams]);

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold">Payment Status</h2>
      <p>{queryParams.get("status")}</p>
      <p>{queryParams.get("total_amount")}</p>
      <p>{queryParams.get("mobile")}</p>
      <p>{queryParams.get("purchase_order_id")}</p>
      <p>{queryParams.get("purchase_order_name")}</p>
    </div>
  );
};

export default PaymentSuccess;