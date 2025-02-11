import React from 'react';
import '../../styles/accountsetting.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AccountSettingsNav = () => {
  return (
    <>
    <div className="profile-navigation-main">
      <div className="profile-navigation-navbar">
      <p>Settings</p>
      <Link to={"/settings/accountprofile"}><button className="public-profile-button">
          <img 
            src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" 
            alt="Profile Icon" 
          />
          Public Profile
        </button></Link>
        <Link to={"/settings/accountconfig"}><button className="account-button" style={{ backgroundColor: "#e0e0e0" }}>
          <img 
            src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" 
            alt="Profile Icon" 
          />
          Account
        </button></Link>
        <Link to={"/settings/transaction"}><button className="transaction-button">
          <img 
            src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" 
            alt="Profile Icon" 
          />
          Transaction
        </button></Link>
        <Link to={"/settings/moderator"}><button className="moderator-button">
          <img 
            src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" 
            alt="Profile Icon" 
          />
          Add Moderator
        </button></Link>
      </div>

      <div className="profile-navigation-details">
        <h2>Account</h2>
        
        <form>
          <div className="change-username">
            <label>Username</label>
            <input type="text" />
            <p>Your email is required to login to your account.</p>
          </div>
          <button className="submit-button" type="submit">Submit</button>
        </form>

        <form style={{ marginTop: "10px" }}>
          <div className="change-password">
            <label>Change Password</label>
            <input type="password" style={{ width: "80%" }} />
            <input type="password" style={{ width: "80%" }} />
            <p>
              Regularly updating your password helps keep your account secure. 
              Choose a strong, unique password to protect your personal information and privacy.
            </p>
          </div>
          <button className="submit-button" type="submit">Submit</button>
        </form>

        <div className="account-security-info">
          <p>
            Keep your account secure by updating your email and password regularly. 
            Ensure your email is valid for password recovery and notifications.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default AccountSettingsNav;

