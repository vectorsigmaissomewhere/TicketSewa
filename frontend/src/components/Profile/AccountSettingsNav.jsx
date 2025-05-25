import React, { useState } from 'react';
import '../../styles/accountsetting.scss';
import { Link } from 'react-router-dom';
import { decodeToken } from '../../Utils/authtoken';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccountSettingsNav = () => {
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('authToken');
  const decodedToken = decodeToken(token);
  const userId = decodedToken?.user_id || null;

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (password !== password2) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/changepassword/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password, password2 })
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Password Changed Successfully");
        //setMessage("Password Changed Successfully");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Failed to connect to the server");
    }
  };
  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/profile/`, {
        method: 'PATCH',  
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: userId, email: newEmail }) 
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Email Updated Successfully");
        //setMessage('Email Updated Successfully');
        setEmail(newEmail);
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Failed to connect to the server');
    }
  };  

  return (
    <div className="profile-navigation-main">
      <div className="profile-navigation-navbar">
        <p>Settings</p>
        <Link to={"/settings/accountprofile"}><button className="public-profile-button">
          <img src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" alt="Profile Icon" />
          Public Profile
        </button></Link>
        <Link to={"/settings/accountconfig"}><button className="account-button" style={{ backgroundColor: "#e0e0e0" }}>
          <img src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" alt="Profile Icon" />
          Account
        </button></Link>
        {/*
        <Link to={"/settings/transaction"}><button className="transaction-button">
          <img src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" alt="Profile Icon" />
          Transaction
        </button></Link>*/}
      </div>

      <div className="profile-navigation-details">
        <h2>Account</h2>

        <form onSubmit={handleEmailChange}>
          <div className="change-username">
            <label>Email</label>
            <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder={email} />
            <p>Change your email</p>
          </div>
          <button className="submit-button" type="submit">Submit</button>
        </form>

        <form style={{ marginTop: "10px" }} onSubmit={handlePasswordChange}>
          <div className="change-password">
            <label>Change Password</label>
            <input type="password" style={{ width: "80%" }} placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" style={{ width: "80%" }} placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
            <p>Regularly updating your password helps keep your account secure.</p>
          </div>
          <button className="submit-button" type="submit">Submit</button>
          {message && <p style={{ color: 'red' }}>{message}</p>}
        </form>

        <div className="account-security-info">
          <p>
            Keep your account secure by updating your email and password regularly.
            Ensure your email is valid for password recovery and notifications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsNav;
