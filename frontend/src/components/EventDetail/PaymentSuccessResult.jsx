import React, { useEffect, useRef } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";

const PaymentSuccessResult = () => {
  const hasFetched = useRef(false); // Track if API call has been made

  useEffect(() => {
    if (hasFetched.current) return; // If already called, prevent execution
    hasFetched.current = true; // Mark API as called

    const fetchData = async () => {
      const paymentDetails = JSON.parse(sessionStorage.getItem("paymentDetails")) || {};
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found");
        return;
      }

      let decodedToken;
      try {
        decodedToken = jwtDecode(token);
      } catch (error) {
        console.error("Invalid token:", error);
        return;
      }

      const userId = decodedToken?.user_id || null;

      const somedata = {
        user: userId,
        event: paymentDetails.event_id || "Not found",
        ticket: paymentDetails.ticket_id || "Not found",
        amount: paymentDetails.amount,
        email: paymentDetails.customer_email || "Not found",
        name: paymentDetails.customer_name || "Not found",
        ticket_type: paymentDetails.ticket_type || "Not found",
      };

      console.log("Sending Payment Data:", somedata);

      try {
        const response = await axios.post("http://127.0.0.1:8000/paymentsaveapi/", somedata);
        sessionStorage.removeItem("paymentDetails");
        console.log("Session storage cleared");
        console.log("Response from backend:", response.data);
      } catch (error) {
        console.error("Error sending payment data:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  return(
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-xl font-semibold mb-4">Your payment is successful</p>
      <button
        onClick={() => navigate("/event/")}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Events
      </button>
    </div>
    </>
  );
};

export default PaymentSuccessResult;
