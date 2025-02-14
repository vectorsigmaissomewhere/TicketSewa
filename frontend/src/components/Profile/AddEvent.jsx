import React, { useEffect, useState } from 'react';
import { X } from "lucide-react";
import '../../styles/addevent.scss';
import axios from 'axios';
import { decodeToken } from '../../Utils/authtoken';

const AddEvent = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [formData, setFormData] = useState({
        user: "",
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

    const token = localStorage.getItem('authToken');
    const decodedToken = decodeToken(token);
    const userId = decodedToken?.user_id || null;

    useEffect(() => {
        if (userId) {
            setFormData((prevData) => ({ ...prevData, user: userId }));
        }
    }, [userId]);

    const togglePopup = (e) => {
        e.stopPropagation();
        setIsPopupVisible((prev) => !prev);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: e.target.files[0],
        }));
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert("User not authenticated!");
            return;
        }

        const eventData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            eventData.append(key, value);
        });

        try {
            const response = await axios.post("http://127.0.0.1:8000/eventviewapi/", eventData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Event created successfully!");
            setIsPopupVisible(false);
        } catch (error) {
            console.error("Error creating event:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <div className='main-container-addevent'>
                <div className='main-container-addevent-inner' onClick={togglePopup}>
                    <X size={40} className="cross-icon" />
                    <p>Add Event</p>
                </div>
            </div>
            {isPopupVisible && (
                <div className='add-event-form'>
                    <form onSubmit={handleEventSubmit}>
                        <div className='add-event-form-inner'>
                            <label>Event Title</label>
                            <input name='name' type='text' value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Add Event Image</label>
                            <input name='event_image' type='file' onChange={handleFileChange} />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Add Description</label>
                            <textarea name='description' className='inner-textarea' rows="6" value={formData.description} onChange={handleInputChange} required />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Category</label>
                            <select name="event_type" value={formData.event_type} onChange={handleInputChange} required>
                                <option value="" disabled>Choose Category</option>
                                <option value="concert">Concert</option>
                                <option value="sport">Sport</option>
                                <option value="art">Art</option>
                                <option value="family">Family</option>
                            </select>
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Country</label>
                            <input name="country" type='text' value={formData.country} onChange={handleInputChange} required />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>City</label>
                            <input name="city" type='text' value={formData.city} onChange={handleInputChange} required />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Longitude</label>
                            <input name="longitude" type='text' value={formData.longitude} onChange={handleInputChange} required />
                            <label>Latitude</label>
                            <input name="latitude" type='text' value={formData.latitude} onChange={handleInputChange} required />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Address</label>
                            <input name="address" type='text' value={formData.address} onChange={handleInputChange} />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Event Date</label>
                            <input name="date" type='date' value={formData.date} onChange={handleInputChange} required />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Event Time</label>
                            <input name="time" type='time' value={formData.time} onChange={handleInputChange} required />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Ticket Active Status</label>
                            <select name="ticket_active" value={formData.ticket_active} onChange={handleInputChange} required>
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </select>
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Capacity</label>
                            <input name="max_tickets" type='number' value={formData.max_tickets} onChange={handleInputChange} />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Featured Event</label>
                            <input name="is_featured" type='checkbox' checked={formData.is_featured} onChange={handleInputChange} />
                        </div>
                        <button className="bg-blue-500 text-white text-lg font-semibold py-2 px-4 rounded-lg cursor-pointer mt-2.5 transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105">
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default AddEvent;


