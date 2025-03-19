import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { decodeToken } from '../../Utils/authtoken';

const EventDetail = () => {
  const { eventId } = useParams();  // Extract eventId from the URL
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userid, setUserId] = useState('');
  const backendURL = "http://127.0.0.1:8000"; 
  const fullImageURL =
  eventDetails && eventDetails.event_image
    ? eventDetails.event_image.startsWith("http")
      ? eventDetails.event_image
      : `${backendURL}${eventDetails.event_image}`
    : "";
  const token = localStorage.getItem("authToken");
  const storedUserId = token ? decodeToken(token).user_id : null;
  /*stored the response for being eligible to edit the eventdetail */
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/eventviewapi/${eventId}/`);
        setEventDetails(response.data);
        console.log("This is the user",response.data.user);
        console.log(response.data);
        setUserId(response.data.user);
        console.log(response.data.event_image);
        console.log(userid);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details.");
        setLoading(false);
      }
    };
    const fetchTicketAddCheck = async()=>{
      try{
        const response = await axios.get(`http://127.0.0.1:8000/api/checkticketadd/${eventId}/${storedUserId}/`);
        console.log("Can I see the message");
        console.log(response.data.checked);
      }
      catch(err){
        console.log("Error fetching the results:", err);
      }
    }
    fetchEventDetails();
    fetchTicketAddCheck();
  }, [eventId]);  // Re-fetch when eventId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Destructure the event data
  const {
    name,
    event_image,
    date,
    time,
    country,
    city,
    address,
    description,
    ticket_active,
    max_tickets,
    user,
  } = eventDetails;

  // getting the contributor details 
  

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Event Header */}
      <div className="relative bg-blue-900 text-white p-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Conditionally render the event image */}
          {event_image && (
            <img
            src={fullImageURL}
            alt={name}
            className="w-full md:w-1/3 rounded-lg shadow-lg"
          />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="mt-2">📅 {new Date(date).toDateString()} | 🕒 {time}</p>
            <p className="mt-1">📍 {address || `${city}, ${country}`}</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-lg font-semibold">
                {ticket_active ? "Active" : "Inactive"} | Max Tickets: {max_tickets}
              </span>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Description */}
      {description && (
        <div className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Event Details</h2>
          <p className="mt-2 text-gray-700">{description}</p>
        </div>
      )}

      {/* Organizer Info - You can show the user data or static placeholder */}
      <div className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg flex items-center gap-4">
        <img src="/khalti-logo.png" alt="Organizer" className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-semibold">{user ? `Organizer ID: ${user}` : "Organizer Info"}</p>
          <p className="text-sm text-gray-500">Organizer</p>
        </div>
      </div>

      {/* Location Map */}
      {city && country && (
        <div className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
              address || `${city}, ${country}`
            )}`}
            className="w-full h-64 rounded-lg"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      )}

      {/* Terms & Conditions */}
      {/*
      <div className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Terms & Conditions</h2>
        <ul className="list-disc ml-6 mt-2 text-gray-700">
          <li>Tickets are Non-Refundable & Non-Transferable.</li>
          <li>No sharp or defensive objects allowed.</li>
          <li>The event organizer is not responsible for any unforeseen incidents.</li>
          <li>Do not share tickets or QR codes with others.</li>
          <li>If a ticket is lost or scanned already, no refund will be provided.</li>
        </ul>
      </div>
      */}
    </div>
  );
};

export default EventDetail;
