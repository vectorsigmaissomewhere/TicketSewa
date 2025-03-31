import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { decodeToken } from '../../Utils/authtoken';

const PaymentSuccess = () => {
  const Location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(Location.search), [Location.search]);
  const navigate = useNavigate();

  const verifyPayment = async (pidx) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/payment/verify-payment/", { pidx });
      console.log("Response data:", response.data);
  
      if (response.data.status === "Completed") {
        navigate(`/payment-result/`);
      } else {
        alert("Payment verification failed!");
      }
    } catch (error) {
      console.error("Payment verification failed", error);
      alert("Error verifying payment.");
    }
  };
  
  useEffect(() => {
    const pidx = queryParams.get("pidx");
    if (pidx) {
      verifyPayment(pidx);
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
