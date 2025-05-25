import React, { useState, useEffect } from 'react';
import '../../styles/accountsetting.scss';
import { Link } from 'react-router-dom';
import { decodeToken } from '../../Utils/authtoken';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccountPublicProfile = () => {
  const [profileDetail, setProfileDetail] = useState({
    name: '',
    public_email: '',
    bio: '',
    social_account1: '',
    social_account2: '',
    social_account3: '',
    social_account4: '',
    location: '',
  });

  const token = localStorage.getItem('authToken');
  const decodedToken = decodeToken(token);
  const userId = decodedToken?.user_id || null;

  useEffect(() => {
    if (userId) {
      axios
        .get('http://127.0.0.1:8000/api/user/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProfileDetail(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId, token]);

  const handleChange = (e) => {
    setProfileDetail({ ...profileDetail, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch('http://127.0.0.1:8000/api/user/profile/', profileDetail, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setProfileDetail(response.data);
        toast.success("Profile updated Successfully");
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to update profile.');
      });
  };

  return (
    <>
      <div className="profile-navigation-main">
        <div className="profile-navigation-navbar">
          <p>Settings</p>
          <Link to={"/settings/accountprofile"}>
            <button className="public-profile-button" style={{ backgroundColor: "#e0e0e0" }}>
              <img src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" alt="Profile Icon" />
              Public Profile
            </button>
          </Link>
          <Link to={"/settings/accountconfig"}>
            <button className="account-button">
              <img src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" alt="Profile Icon" />
              Account
            </button>
          </Link>
          {/*
          <Link to={"/settings/transaction"}>
            <button className="transaction-button">
              <img src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" alt="Profile Icon" />
              Transaction
            </button>
          </Link>*/}
        </div>
        <div className="profile-navigation-details">
          <h2>Public Profile</h2>

          <form onSubmit={handleSubmit}>
            <div className="public-name">
              <label>Name</label>
              <input type="text" name="name" value={profileDetail.name} onChange={handleChange} />
              <p>Your name appears around your profile. You can remove it at any time.</p>
            </div>
            <div className="public-email">
              <label>Public Email</label>
              <input type="email" name="public_email" value={profileDetail.public_email} onChange={handleChange} />
              <p>Your email appears around your profile. You can remove it at any time.</p>
            </div>
            <div className="public-bio">
              <label>Bio</label>
              <textarea className="profile-bio-textarea" name="bio" rows="6" cols="40" value={profileDetail.bio} onChange={handleChange}></textarea>
              <p>Your bio appears around your profile. You can remove it at any time.</p>
            </div>
            <div className="public-social-account">
              <label>Social Accounts</label>
              {[1, 2, 3, 4].map((num) => (
                <div key={num} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                  <img className="editicon" src="https://w7.pngwing.com/pngs/279/877/png-transparent-hyperlink-computer-icons-link-text-logo-number.png" alt="Link Icon" />
                  <input
                    type="text"
                    name={`social_account${num}`}
                    value={profileDetail[`social_account${num}`] || ''}
                    onChange={handleChange}
                    style={{ width: "80%" }}
                  />
                </div>
              ))}
            </div>
            <div>
              <label>Location</label>
              <input type="text" name="location" value={profileDetail.location} onChange={handleChange} />
              <p>Your location appears around your profile. You can remove it at any time.</p>
            </div>
            <button className="submit-button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AccountPublicProfile;
