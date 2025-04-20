import React, { useState } from 'react';

const faqs = [
    {
      question: "What is TicketSewa?",
      answer: "TicketSewa is your one-stop platform to book tickets for buses, movies, events, and more—fast, secure, and hassle-free.",
    },
    {
      question: "How do I book a ticket?",
      answer: "Simply search for your destination or event, choose your seat, and complete your payment. Your ticket will be saved in your profile.",
    },
    {
      question: "Can I cancel or reschedule my ticket?",
      answer: "Yes! You can cancel or reschedule your ticket from your dashboard, depending on the event or provider's policy.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Khalti.",
    },
    {
      question: "Is it safe to book through TicketSewa?",
      answer: "Absolutely. We use SSL encryption and secure payment gateways to ensure your information and transactions are protected.",
    },
    {
      question: "Do I need to print my ticket?",
      answer: "No, you can show the e-ticket from your phone. However, some venues may require a printed copy, which will be mentioned during booking.",
    },
    {
      question: "How can I track my bookings?",
      answer: "Log in to your TicketSewa account and go to 'Visits' to view or manage all your bookings in one place.",
    },
    {
      question: "Can I book tickets without creating an account?",
      answer: "While browsing is open to everyone, you'll need an account to complete bookings and access your tickets securely.",
    },
    {
      question: "I didn’t receive my ticket. What should I do?",
      answer: "Check your spam folder first. If it's not there, go to your dashboard.",
    },
    {
      question: "Is there customer support if I face any issues?",
      answer: "Yes, we have 24/7 support available via live chat, email, or phone to assist you with any problems or questions.",
    },
  ];
  

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 transition-all duration-300 bg-white shadow-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="text-lg font-medium text-gray-700">{faq.question}</span>
              <span className="text-2xl text-blue-500">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
