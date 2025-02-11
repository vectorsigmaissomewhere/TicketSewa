import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Profileheading = () => {
  const defaultBg = 'https://static.vecteezy.com/system/resources/thumbnails/033/889/256/small/sunset-on-the-sea-shore-generated-by-ai-photo.jpg';
  const [profileFile, setProfileFile] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfileFile(selectedFile);
  };

  const togglePopup = (e) => {
    e.stopPropagation(); // Prevent body click from closing it immediately
    setIsPopupVisible((prev) => !prev);
  };

  // Close popup when clicking outside
  document.addEventListener("click", () => setIsPopupVisible(false));


  return (
    <>
      <div className="flex flex-col bg-[#ebeef2]">
      <div className="h-[20vh] bg-cover bg-center relative" style={{ backgroundImage: `url(${defaultBg})` }}>
      {/* Profile Image Container */}
      <div className="ml-5 absolute z-10 flex flex-col items-center">
        {/* Profile Picture */}
        <img className="rounded-full w-[140px] h-[100px] border-2 border-white" src="https://static.vecteezy.com/system/resources/thumbnails/033/889/256/small/sunset-on-the-sea-shore-generated-by-ai-photo.jpg"/>

        {/* Hidden File Input */}
        <input type="file" id="file-upload" accept="image/*" className="hidden" onChange={handleFileChange} />

        {/* Edit Button */}
        <label htmlFor="file-upload" className="cursor-pointer absolute top-[65px] left-[100px]">
          <img
            className="w-[25px] h-[20px]"
            src="https://w7.pngwing.com/pngs/122/880/png-transparent-letter-mail-mailing-email-mailbox-inbox-thumbnail.png"
            alt="Edit Profile"
          />
        </label>
      </div>
    </div>

        {/* Lower Container */}
        <div className='flex justify-between items-center p-1 border border-gray-300 bg-[#ebeef2]'>
          {/* Left Section */}
          <div>
            <p className="font-sans">Cristiano Ronaldo</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <img className="w-[20px] h-[15px]" 
                     src="https://w7.pngwing.com/pngs/122/880/png-transparent-letter-mail-mailing-email-mailbox-inbox-thumbnail.png" 
                     alt="Email" />
                <a className="text-sm">ronaldo@gmail.com</a>
              </div>
              <div className="flex items-center gap-1">
                <img className="w-[20px] h-[15px]" 
                     src="https://w7.pngwing.com/pngs/122/880/png-transparent-letter-mail-mailing-email-mailbox-inbox-thumbnail.png" 
                     alt="Phone" />
                <a className="text-sm">98-98-98-98-98</a>
              </div>
              <p className="text-sm">Passionate IT student & developer skilled in Django, React, and MySQL.</p>
              {/* Social Media Icons */}
              <div className="bg-red-500 w-full ml-[3%] flex justify-end gap-2 p-1">
                {Array(4).fill().map((_, i) => (
                  <img key={i} className="w-[20px] h-[15px]" 
                       src="https://w7.pngwing.com/pngs/122/880/png-transparent-letter-mail-mailing-email-mailbox-inbox-thumbnail.png" 
                       alt="Social Icon" />
                ))}
              </div>
            </div>
          </div>

          {/* Settings Icon */}
          <div onClick={togglePopup} className="cursor-pointer relative">
            <img className="w-[20px] h-[15px]" 
                 src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/3-vertical-dots-icon.png" 
                 alt="Menu" />
          </div>
        </div>
      </div>

      {/* Profile Settings Popup */}
      {isPopupVisible && (
        <div className="absolute top-[200px] right-[40px] bg-white border border-gray-300 rounded-md shadow-md z-[1000] p-3">
          <div className="flex flex-col bg-[#dadce0] p-3 gap-2 shadow-md">
          <Link to="/settings/accountprofile"><button className="w-[140px] h-[20px] font-sans bg-white border-0 rounded-md cursor-pointer">Settings</button></Link>
            <button className="w-[140px] h-[20px] font-sans bg-white border-0 rounded-md cursor-pointer">Logout</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profileheading;
