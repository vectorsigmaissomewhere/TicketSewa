import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { decodeToken } from '../../Utils/authtoken';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Rate from './Rate';
import Footer from '../Home/Footer'
import Profileheading from '../Profile/Profileheading'
import Navbar from "../Home/Navbar";
import { toast } from 'react-toastify'; // 👈 add this
import 'react-toastify/dist/ReactToastify.css';

const EventDetail = () => {
  const { eventId } = useParams();  // Extract eventId from the URL
  const [eventDetails, setEventDetails] = useState(null);
  const navigate = useNavigate();
  const [suggestedEvent, setSuggestedEvent] = useState(null);
  const [likedEvents, setLikedEvents] = useState([]);
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
  const [eventcommentlist, setEventCommentList] = useState([]);
  const [storedusername, setStoredUserName] = useState('');
  const [storeduseremail, setStoredUserEmail] = useState('');
  const [username, setUserName] = useState('');
  const [location, setUserLocation] = useState('');
  const [latitude, setEventLatitude] = useState('');
  const [longitude, setEventLongitude] = useState('');
  const [message, setMessage] = useState('');
  const [event_comment, setEventComment] = useState('');
  const [eventrate, setEventRate] = useState(5);
  const [visibleComments, setVisibleComments] = useState(5);
  /*stored the response for being eligible to edit the eventdetail */
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/eventviewapi/${eventId}/`);
        setEventDetails(response.data);
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
    const fetchSuggestedEvents = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/suggestedeventviewapi/${eventId}/`);
        setSuggestedEvent(response.data);
        console.log("Getting suggested event")
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching the suggested events:", err);
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
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/profile-by-id/${storedUserId}/`);
        setStoredUserDetail(response.data);
        console.log("This is the name", response.data.name);
        setStoredUserName(response.data.name);
        setStoredUserEmail(response.data.email);
        console.log(storedusername);
        console.log(storeduseremail);
        console.log("This is the response from the storeduserid");
        console.log(response.data)
      }
      catch (err) {
        console.log(err);
      }
    }
    const fetchAverageEventRate = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/event/eventrateapi/${eventId}/`);
        setEventRate(response.data);
        console.log("This is the average event rating");
        console.log(eventrate);
        console.log(response.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    const fetchEventComment = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/event/eventcommentapi/${eventId}/`);
        setEventCommentList(response.data);
        console.log("This is the event comment list");
        console.log(response.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchEventTickets();
    fetchEventDetails();
    fetchSuggestedEvents();
    fetchTicketAddCheck();
    fetchStoredUserDetail();
    fetchAverageEventRate();
    fetchEventComment();
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
  const handlePayment = async (ticket_id, ticket_type, ticket_price) => {
    console.log(`This is the ticket price ${ticket_price}`);
    try {
      sessionStorage.removeItem("paymentDetails");
      const response = await axios.post("http://127.0.0.1:8000/payment/initiate-payment/", {
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
      // manipulate this response.data and this is how we can send the user id or secret key
      if (response.data.payment_url) {
        sessionStorage.setItem("paymentDetails", JSON.stringify({
          amount: ticket_price,
          purchase_order_id: "order_123",
          purchase_order_name: "Test Order",
          ticket_id: ticket_id,
          ticket_type: ticket_type,
          amount: ticket_price,
          event_id: eventId,
          customer_userid: storedUserId,
          customer_name: storedusername,
          customer_email: storeduseremail,
          check: true,
        }));
        window.location.href = response.data.payment_url;
      }
    }
    catch (error) {
      console.error("Payment initiation failed", error);
    }
  }
  const handleLike = async (eventId) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/like_event/",
        { event: eventId, user: userId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );

      if (response.status === 201) {
        setLikedEvents((prev) => [...prev, eventId]);
      }
    } catch (error) {
      console.error("Error liking event:", error);
    }
  };

  const handleCheckContributor = (eventContributorId) => {
    navigate(`/profile/${eventContributorId}`);
  };

  /*submit the comment */
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!storedUserId) {
      setMessage("User not authenticated");
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/commentviewapi/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user: storedUserId,
          event: eventId,
          content: event_comment,
        })
      });
      const data = await response.json();
      if (response.ok) {
        setEventComment('');
        toast.success("Comment Added Successfully");
        setMessage("Comment Added Successfully");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Failed to connect to the server");
    }
  }


  return (
    <>
    <Navbar/>
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
                          <button className="w-full mt-4 bg-green-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg" onClick={() => handlePayment(ticket.ticket_id, ticket.ticket_type, ticket.ticket_price)}>
                            Pay
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>
            {/* You can do rating */}
            <div>
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < eventrate ? "text-yellow-500" : "text-gray-300"}>
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-600">(Rating)</span>
              </div>
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
      {/*Rate Now */}
      <div className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg space-y-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition self-start">
          Rate Now
        </button>

        <div className="flex justify-end items-center space-x-4">
          <Rate eventId={eventId} userId={storedUserId} />
        </div>
      </div>
      {/* Add the comment */}
      <div className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg space-y-6">
        <form onSubmit={handleCommentSubmit}>
          <textarea
            placeholder="Leave a comment..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
            value={event_comment}
            onChange={(e) => setEventComment(e.target.value)}
            required
          ></textarea>
          <div className="flex justify-end mt-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              type="submit">
              Submit Comment
            </button>
          </div>
        </form>
      </div>

      {/* List all the comments */}
      <div className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {eventcommentlist.length === 0 ? (
          <p className="text-gray-600">No comments yet.</p>
        ) : (
          eventcommentlist.slice(0, visibleComments).map((comment, index) => (
            <div key={index} className="mb-4 border-b pb-2">
              <p className="text-sm font-semibold text-blue-800">{comment.user_fullname}</p>
              <p className="text-gray-700 mt-1">{comment.comment || comment.content}</p>
            </div>
          ))
        )}
      </div>
      <div className="max-w-4xl mx-auto p-6 mt-6">
      {eventcommentlist.length > visibleComments && (
        <button
          className="mt-2 px-4 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => setVisibleComments(prev => prev + 5)}
        >
          Read More Comments
        </button>
      )}
      </div>

      {/* Suggested contents  */}
      <div className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg">
        {suggestedEvent && suggestedEvent.length > 0 && (
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-2xl font-bold mb-4">Suggested Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestedEvent.map((event) => (
                <div key={event.id} className="bg-gray-100 p-4 rounded-lg shadow">
                  <img
                    src={
                      event.event_image?.startsWith("http")
                        ? event.event_image
                        : `${backendURL}${event.event_image}`
                    }
                    alt={event.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="text-xl font-semibold mt-2">{event.name}</h3>
                  <p className="text-sm text-gray-600">📍 {event.city}, {event.country}</p>
                  <p className="text-sm text-gray-600">📅 {new Date(event.date).toDateString()}</p>
                  <button
                    onClick={() => navigate(`/eventdetail/${event.event_id}`)}
                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div >
    <Footer/>
    </>
  );
};

export default EventDetail;
