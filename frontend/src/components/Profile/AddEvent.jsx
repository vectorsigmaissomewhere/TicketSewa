import React, { useState } from 'react';
import { Cross } from "lucide-react";
import '../../styles/addevent.scss';

const AddEvent = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = (e) => {
        e.stopPropagation();
        setIsPopupVisible((prev) => !prev);
    };

    return (
        <>
            <div className='main-container-addevent'>
                <div className='main-container-addevent-inner' onClick={togglePopup}>
                    <Cross size={40} className="cross-icon" />
                    <p>Add Event</p>
                </div>
            </div>
            {isPopupVisible && (
                <div className='add-event-form'>
                    <form>
                        <div className='add-event-form-inner'>
                            <label>Event Title</label>
                            <input type='text' />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Add Event Image</label>
                            <input type='file' />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Add Description</label>
                            <textarea className='inner-textarea' rows="6" cols="40"></textarea>
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Category</label>
                            <input type='text' />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Genre</label>
                            <input type='text' />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Country</label>
                            <input type='text' />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>City</label>
                            <input type='text' />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Longitude and Latitude</label>
                            <input className='longitude' type='text' />
                            <input className='latitude' type='text' />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Ticket Active Status</label>
                            <select className='active_status' name="active_status">
                                <option value="" disabled selected>Choose Ticke Active Status</option>
                                <option value="Active" >Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Event Date</label>
                            <input type='text' />
                        </div>
                        <div className='add-event-form-inner'>
                            <label>Capacity</label>
                            <input type='text' />
                        </div>
                        <button className="bg-blue-500 text-white text-lg font-semibold py-2 px-4 rounded-lg cursor-pointer mt-2.5 transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105">Submit</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default AddEvent;

