import React, { useState, useEffect } from 'react';
import { Cross } from "lucide-react";
import '../../styles/addevent.scss';

const AddEvent = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = (e) => {
        e.stopPropagation(); 
        setIsPopupVisible((prev) => !prev);
    };
    useEffect(() => {
        const handleClickOutside = () => setIsPopupVisible(false);
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

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
                    
                </div>
            )}
        </>
    );
}

export default AddEvent;
