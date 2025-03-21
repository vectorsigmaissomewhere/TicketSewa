import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { decodeToken } from '../../Utils/authtoken';
import '../../styles/updateevent.scss';

const UpdateEvent = () => {
    const [ticket_type, setTicketType] = useState('');
    const [ticket_price, setTicketPrice] = useState('');
    const [message, setMessage] = useState('');
    const { eventId } = useParams();
    const token = localStorage.getItem("authToken");
    const storedUserId = token ? decodeToken(token).user_id : null;

    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        event_type: "",
        event_image: null,
        country: "",
        city: "",
        latitude: "",
        longitude: "",
        address: "",
        date: "",
        time: "",
        ticket_active: false,
        max_tickets: "",
        is_featured: false
    });

    const handleTicketSubmit = async (e) => {
        e.preventDefault();
        if (!storedUserId) {
            setMessage("User not authenticated");
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/ticketviewapi/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ticket_type,
                    ticket_price: Number(ticket_price), // Convert to number
                    event: eventId, // Match backend key
                    user: storedUserId // Match backend key
                })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Ticket Added Successfully");
            } else {
                setMessage(data.error || "Something went wrong");
            }
        } catch (error) {
            setMessage("Failed to connect to the server");
        }
    };

    useEffect(() => {
        if (!storedUserId) return;

        const fetchTicketAddCheck = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/checkticketadd/${eventId}/${storedUserId}/`);
                console.log("Can I see the message");
                console.log(response.data.checked);
            } catch (err) {
                console.log("Error fetching the results:", err);
            }
        };
        fetchTicketAddCheck();

        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/eventviewapi/${eventId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEventData(response.data);
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };
        if (eventId) fetchEventDetails();

    }, [eventId, storedUserId, token]); // Ensure storedUserId is included

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        setEventData((prevData) => ({
            ...prevData,
            event_image: e.target.files[0],
        }));
    };

    const handleEventUpdate = async (e) => {
        e.preventDefault();
        if (!storedUserId) {
            alert("User not authenticated!");
            return;
        }

        const updatedEventData = new FormData();
        Object.entries(eventData).forEach(([key, value]) => {
            updatedEventData.append(key, value);
        });

        try {
            await axios.put(`http://127.0.0.1:8000/eventviewapi/${eventId}/`, updatedEventData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Event updated successfully!");
        } catch (error) {
            console.error("Error updating event:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex flex-col space-x-4 md:flex-row md:space-x-4">
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Add Ticket</h2>
                <form onSubmit={handleTicketSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Ticket Type</label>
                        <input
                            type="text"
                            value={ticket_type}
                            onChange={(e) => setTicketType(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Ticket Price</label>
                        <input
                            type="number"
                            value={ticket_price}
                            onChange={(e) => setTicketPrice(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
            </div>

            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Update Event</h2>
                <form onSubmit={handleEventUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold">Event Title</label>
                        <input name='name' type='text' value={eventData.name} onChange={handleInputChange} required className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Update Event Image</label>
                        <input name='event_image' type='file' onChange={handleFileChange} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Description</label>
                        <textarea name='description' rows="4" value={eventData.description} onChange={handleInputChange} required className="w-full p-2 border rounded" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold">Country</label>
                            <input name="country" type='text' value={eventData.country} onChange={handleInputChange} required className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold">City</label>
                            <input name="city" type='text' value={eventData.city} onChange={handleInputChange} required className="w-full p-2 border rounded" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold">Date</label>
                            <input name="date" type='date' value={eventData.date} onChange={handleInputChange} required className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold">Time</label>
                            <input name="time" type='time' value={eventData.time} onChange={handleInputChange} required className="w-full p-2 border rounded" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Featured Event</label>
                        <input name="is_featured" type='checkbox' checked={eventData.is_featured} onChange={handleInputChange} className="ml-2" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Update Event</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateEvent;
