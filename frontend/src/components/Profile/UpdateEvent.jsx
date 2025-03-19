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
    }, [eventId, storedUserId]); // Ensure storedUserId is included

    return (
        <div className="update-main-container">
            <button>
                Add Ticket
            </button>
            <div className="update-main-container-addticket">
                <div className="update-addticket-inner">
                    <div className="update-addticket-text">
                        <h2>Add Ticket</h2>
                    </div>
                    <div className="update-addticket-close-btn">
                        <button>Close</button>
                    </div>
                    <div>
                        <form onSubmit={handleTicketSubmit}>
                            <div>
                                <label>Ticket Type</label>
                                <input type="text" value={ticket_type} onChange={(e) => setTicketType(e.target.value)} required />
                            </div>
                            <div>
                                <label>Ticket Price</label>
                                <input type="number" value={ticket_price} onChange={(e) => setTicketPrice(e.target.value)} required />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateEvent;
