import React, { useState } from 'react';
import { decodeToken } from '../../Utils/authtoken';

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
  <span
    className={`cursor-pointer text-2xl transition-colors ${
      filled ? 'text-yellow-400' : 'text-gray-300'
    }`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    ★
  </span>
);

const Rate = ({ eventId, userId }) => {
  const [value, setValue] = useState(3);
  const [hover, setHover] = useState(-1);
  const [submitted, setSubmitted] = useState(false);
  const token = localStorage.getItem("authToken");

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/rateeventviewapi/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user: userId,
          event: eventId,
          rating: value,
        }),
      });

      const data = await res.json();
      console.log('Rating submitted:', data);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting rating:', err);
    }
  };

  const handleMouseEnter = (val) => setHover(val);
  const handleMouseLeave = () => setHover(-1);

  const displayValue = hover !== -1 ? hover : value;

  return (
    <div className="flex flex-col items-start space-y-2 w-fit">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            filled={i <= displayValue}
            onClick={() => setValue(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
      {submitted && <p className="text-green-600 text-sm">Rating submitted successfully!</p>}
    </div>
  );
};

export default Rate;
