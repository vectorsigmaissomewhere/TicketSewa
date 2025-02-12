import React, { useState } from 'react';
import { BadgeCheck } from "lucide-react";
import '../../styles/becomecontributor.scss';

const BecomeContributor = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = (e) => {
        e.stopPropagation();
        setIsPopupVisible((prev) => !prev);
    }
    return (
        <>
            <div className='main-container-contributor'>
                <div className='main-container-contributor-inner' onClick={togglePopup}>
                    <BadgeCheck />
                    <p>Become a Contributor</p>
                </div>
            </div>

            {isPopupVisible && (
                <div className='add-contributor-form'>
                    <form>
                        <div className='add-contributor-form-inner'>
                            <label>Add Driving License</label>
                            <input type='file' />
                        </div>
                        <div className='add-contributor-form-inner'>
                            <label>Add Any Government Card</label>
                            <input type='file' />
                        </div>
                        <button className="bg-blue-500 text-white text-lg font-semibold py-2 px-4 rounded-lg cursor-pointer mt-2.5 transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105">Submit</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default BecomeContributor
