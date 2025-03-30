import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { decodeToken } from '../../Utils/authtoken';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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
  const [openPopup, setOpenPopup] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [userdetail, setUserDetail] = useState([]);
  const [storeduserdetail, setStoredUserDetail] = useState([]);
  const [storedusername, setStoredUserName] = useState('');
  const [storeduseremail, setStoredUserEmail] = useState('');
  const [username, setUserName] = useState('');
  const [location, setUserLocation] = useState('');
  const [latitude, setEventLatitude] = useState('');
  const [longitude, setEventLongitude] = useState('');
  /*stored the response for being eligible to edit the eventdetail */
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/eventviewapi/${eventId}/`);
        setEventDetails(response.data);
        console.log("This is the user", response.data.user);
        console.log(response.data);
        setUserId(response.data.user);
        setEventLatitude(response.data.latitude);
        setEventLongitude(response.data.longitude);
        console.log(response.data.event_image);
        console.log(userid);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details.");
        setLoading(false);
      }
    };
    const fetchTicketAddCheck = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/checkticketadd/${eventId}/${storedUserId}/`);
        console.log("Can I see the message");
        console.log(response.data.checked);
      }
      catch (err) {
        console.log("Error fetching the results:", err);
      }
    }
    const fetchEventTickets = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/ticketviewapi/${eventId}/`);
        setTickets(response.data);
        console.log(response.data);
      }
      catch (err) {
        console.log("Error fetching the results:", err);
      }
    }
    const fetchStoredUserDetail = async () => {
      try{
        const response = await axios.get(`http://127.0.0.1:8000/api/user/profile-by-id/${storedUserId}/`);
        setStoredUserDetail(response.data);
        console.log("This is the name",response.data.name);
        setStoredUserName(response.data.name);
        setStoredUserEmail(response.data.email);
        console.log(storedusername);
        console.log(storeduseremail);
        console.log("This is the response from the storeduserid");
        console.log(response.data)
      }
      catch(err){
        console.log(err);
      }
    }
    fetchEventTickets();
    fetchEventDetails();
    fetchTicketAddCheck();
    fetchStoredUserDetail();
  }, [eventId]);  

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/profile-by-id/${userid}/`);
        setUserDetail(response.data);
        setUserName(response.data.name);
        setUserLocation(response.data.location);
        console.log(response.data);
        console.log(response.data.name);
        console.log(response.data.location);
      }
      catch (err) {
        console.log("Error fetching the user details:", err);
      }
    }
    fetchUserDetail();
  }, [userid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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


  // handle payment 
  const handlePayment = async (ticket_id, ticket_type,ticket_price) =>{
    try{
      sessionStorage.removeItem("paymentDetails");
      const response = await axios.post("http://127.0.0.1:8000/payment/initiate-payment/",{
        amount: ticket_price, 
        purchase_order_id: "order_123",
        purchase_order_name: "Test Order",
        ticket_id: ticket_id,
        ticket_type: ticket_type,
        event_id: eventId,
        customer_userid: storedUserId,
        customer_name: storedusername,       
        customer_email: storeduseremail,
      });
      if(response.data.payment_url){
        sessionStorage.setItem("paymentDetails", JSON.stringify({
          amount: ticket_price,
          purchase_order_id: "order_123",
          purchase_order_name: "Test Order",
          ticket_id: ticket_id,
          ticket_type: ticket_type,
          event_id: eventId,
          customer_userid: storedUserId,
          customer_name: storedusername,
          customer_email: storeduseremail,
          check: true,  
        }));
        window.location.href = response.data.payment_url;
      }
    }
    catch(error){
      console.error("Payment initiation failed", error);
    }
  }


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
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg" onClick={() => setOpenPopup(true)}>
                Book Now
              </button>
              {openPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                  <div className="rounded-md p-6 bg-white text-black w-5/6 md:w-1/3 h-[80vh] overflow-y-auto">
                    <div className="flex flex-row justify-between">
                      <h2 className="font-sans text-2xl font-bold">Payment</h2>
                      <button onClick={() => setOpenPopup(false)}>X</button>
                    </div>
                    {tickets.length === 0 ? (
                      <p>No tickets found</p>
                    ) : (
                      tickets.map((ticket) => (
                        <div key={ticket.ticket_id} className="flex flex-col mt-4 border-b pb-4">
                          <div className="flex flex-row justify-between">
                            <h2 className="font-sans text-xl font-semibold">
                              Ticket Type: {ticket.ticket_type}
                            </h2>
                            <h2 className="font-sans text-xl font-bold">Rs: {ticket.ticket_price}</h2>
                          </div>
                          <button className="w-full mt-4 bg-green-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg" onClick={ () => handlePayment(ticket.ticket_id, ticket.ticket_type, ticket.ticket_price)}>
                            Pay
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

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
        {/*<img src="/khalti-logo.png" alt="Organizer" className="w-12 h-12 rounded-full" /> */}
        <div>
          <p className="font-semibold">{username ? `Organizer Name: ${username}` : "Organizer Info"}</p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>

      {/* Location Map */}
      {city && country && (
        <div className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg z-10">
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[latitude, longitude]}>
              <Popup>Event Location</Popup>
            </Marker>
          </MapContainer>
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
