import React, { useState, useEffect } from 'react';
import '../../styles/events.scss';
import { decodeToken } from '../../Utils/authtoken';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PaymentDetail = () => {
  const token = localStorage.getItem('authToken');
  const userId = token ? decodeToken(token).user_id : null;

  const [paymentList, setPaymentList] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);

  const fetchPayments = (url) => {
    axios
      .get(url)
      .then(response => {
        setPaymentList(response.data.results);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        console.log('Payments:', response.data.results);
      })
      .catch(error => {
        console.error('Error fetching payments:', error);
      });
  };

  useEffect(() => {
    if (userId) {
      fetchPayments(`http://127.0.0.1:8000/api/payment/get_the_payment/${userId}/`);
    }
  }, [userId]);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">S.N</th>
              <th className="px-6 py-3">Event Name</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">User Name</th>
              <th className="px-6 py-3">Ticket Type</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3">Code</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentList.map((payment) => (
              <tr key={payment.payment_id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td className="px-6 py-4">{payment.payment_id}</td>
                <td className="px-6 py-4">{payment.event_name}</td>
                <td className="px-6 py-4">{payment.amount}</td>
                <td className="px-6 py-4">{payment.name}</td>
                <td className="px-6 py-4">{payment.ticket_type}</td>
                <td className="px-6 py-4">{new Date(payment.created_at).toLocaleString()}</td>
                <td className="px-6 py-4">{payment.code}</td>
                <td className="px-6 py-4">{payment.status ? 'IN' : 'OUT'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => prevPageUrl && fetchPayments(prevPageUrl)}
            disabled={!prevPageUrl}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={() => nextPageUrl && fetchPayments(nextPageUrl)}
            disabled={!nextPageUrl}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentDetail;
