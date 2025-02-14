import React, { useEffect, useState } from 'react';
import { BadgeCheck } from "lucide-react";
import axios from "axios";  
import '../../styles/becomecontributor.scss';
import { decodeToken } from '../../Utils/authtoken';

const BecomeContributor = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const togglePopup = (e) => {
        e.stopPropagation();
        setIsPopupVisible((prev) => !prev);
    };

    // Get the token and user ID
    const token = localStorage.getItem('authToken');
    const userId = token ? decodeToken(token).user_id : null;

    const [formData, setFormData] = useState({
        license_image: null,
        government_card: null,
    });

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: e.target.files[0],
        }));
    };

    const handleContributorAdd = async (e) => {
        e.preventDefault();
        if (!userId) {
            console.log("User ID not found!");
            return;
        }

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);
        });
        form.append("user", userId);

        try {
            const response = await axios.post(`http://127.0.0.1:8000/addcontributor/`, form, config);
            console.log(response.data);

            // Reset form after submission
            setFormData({
                license_image: null,
                government_card: null,
            });

            alert("Contributor request sent successfully!");
        } catch (error) {
            console.error("There is some error:", error);
        } finally {
            console.log("Running the finally code");
        }
    };

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
                    <form onSubmit={handleContributorAdd}>
                        <div className='add-contributor-form-inner'>
                            <label>Add Driving License</label>
                            <input type='file' name='license_image' onChange={handleFileChange} />
                        </div>
                        <div className='add-contributor-form-inner'>
                            <label>Add Any Government Card</label>
                            <input type='file' name='government_card' onChange={handleFileChange} />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white text-lg font-semibold py-2 px-4 rounded-lg cursor-pointer mt-2.5 transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default BecomeContributor;
