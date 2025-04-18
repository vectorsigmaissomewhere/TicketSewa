import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // for reading email from URL

const ChangeStatusComponent = () => {
  const { email } = useParams(); // get email from the route
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/payment/change_payment_status/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          code: code
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.msg || 'Payment status changed successfully!');
      } else {
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Change Payment Status</h2>
      <p>Email: <strong>{email}</strong></p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {message && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-center">
          {message}
        </div>
      )}
    </div>
  );
};

export default ChangeStatusComponent;
