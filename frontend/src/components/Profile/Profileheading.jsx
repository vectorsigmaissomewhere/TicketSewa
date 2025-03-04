import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { decodeToken } from '../../Utils/authtoken';

const Profileheading = () => {
  const defaultBg =
    'https://static.vecteezy.com/system/resources/thumbnails/033/889/256/small/sunset-on-the-sea-shore-generated-by-ai-photo.jpg';
  const [profileFile, setProfileFile] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [profileDetail, setProfileDetail] = useState('');
  const { eventContributorId } = useParams();
  const token = localStorage.getItem('authToken');
  const decodedToken = decodeToken(token);
  const userId = decodedToken?.user_id || null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfileFile(selectedFile);
  };

  const togglePopup = (e) => {
    e.stopPropagation(); 
    setIsPopupVisible((prev) => !prev);
  };


  document.addEventListener('click', () => setIsPopupVisible(false));

  if(!eventContributorId){
  if (userId) {
    useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/api/user/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProfileDetail(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);     
  }
}

  if (eventContributorId) {
    useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/api/user/profile-by-id/${eventContributorId}/`)
        .then((response) => {
          setProfileDetail(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [eventContributorId]);     
  }

  return (
    <>
      <div className="flex flex-col bg-[#ebeef2]">
        <div
          className="h-[20vh] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${defaultBg})` }}
        >
          {/* Profile Image Container */}
          <div className="ml-5 absolute z-10 flex flex-col items-center">
            {/* Profile Picture */}
            <img
              className="rounded-full w-[140px] h-[100px] border-2 border-white"
              src="https://static.vecteezy.com/system/resources/thumbnails/033/889/256/small/sunset-on-the-sea-shore-generated-by-ai-photo.jpg"
              alt="Profile"
            />

            {/* Hidden File Input */}
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

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
        <div className="flex justify-between items-center p-1 border border-gray-300 bg-[#ebeef2]">
          {/* Left Section */}
          <div>
            <p className="font-sans">{profileDetail.name}</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <img
                  className="w-[20px] h-[15px]"
                  src="https://w7.pngwing.com/pngs/122/880/png-transparent-letter-mail-mailing-email-mailbox-inbox-thumbnail.png"
                  alt="Email"
                />
                <a className="text-sm">{profileDetail.public_email}</a>
              </div>
              <p className="text-sm">
                {profileDetail.bio || 'Passionate IT student & developer skilled in Django, React, and MySQL.'}
              </p>
              <div className="flex items-center gap-1">
                <img
                  className="w-[20px] h-[18px]"
                  src="https://cdn-icons-png.flaticon.com/512/2838/2838912.png"
                  alt="Location"
                />
                <a className="text-sm">{profileDetail.location || 'Location not provided'}</a>
              </div>
              {/* Social Media Icons */}
              <div className="bg-red-500 w-full ml-[3%] flex flex-row justify-end gap-2 p-1">
                {profileDetail.social_account1 && (
                  <div className="link">
                    <p>{profileDetail.social_account1}</p>
                  </div>
                )}
                {profileDetail.social_account2 && (
                  <div className="link">
                    <p>{profileDetail.social_account2}</p>
                  </div>
                )}
                {profileDetail.social_account3 && (
                  <div className="link">
                    <p>{profileDetail.social_account3}</p>
                  </div>
                )}
                {profileDetail.social_account4 && (
                  <div className="link">
                    <p>{profileDetail.social_account4}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Settings Icon */}
          {!eventContributorId && (
            <div onClick={togglePopup} className="cursor-pointer relative">
              <img
                className="w-[20px] h-[15px]"
                src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/3-vertical-dots-icon.png"
                alt="Menu"
              />
            </div>
          )}
        </div>
      </div>

      {/* Profile Settings Popup */}
      {isPopupVisible && (
        <div className="absolute top-[200px] right-[40px] bg-white border border-gray-300 rounded-md shadow-md z-[1000] p-3">
          <div className="flex flex-col bg-[#dadce0] p-3 gap-2 shadow-md">
            <Link to="/settings/accountprofile">
              <button className="w-[140px] h-[20px] font-sans bg-white border-0 rounded-md cursor-pointer">
                Settings
              </button>
            </Link>
            <button className="w-[140px] h-[20px] font-sans bg-white border-0 rounded-md cursor-pointer">
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profileheading;
