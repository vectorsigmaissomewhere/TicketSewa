import React from 'react'
import '../../styles/accountsetting.scss';
import { Link } from 'react-router-dom';

const AddModerator = () => {
  return (
    <>
      <div className="profile-navigation-main">
        <div className="profile-navigation-navbar">
        <p>Settings</p>
        <Link to={"/settings/accountprofile"}><button className="public-profile-button">
            <img src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" alt="Profile Icon" />
            Public Profile
          </button></Link>
          <Link to={"/settings/accountconfig"}><button className="account-button">
            <img src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" alt="Profile Icon" />
            Account
          </button></Link>
          <Link to={"/settings/transaction"}><button className="transaction-button">
            <img src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" alt="Profile Icon" />
            Transaction
          </button></Link>
          <Link to={"/settings/moderator"}><button className="moderator-button" style={{ backgroundColor: "#e0e0e0" }}>
            <img src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" alt="Profile Icon" />
            Add Moderator
          </button></Link>
        </div>
        <div className="profile-navigation-details">
          <h2>Add Moderator</h2>
          <hr style={{ width: "100%", textAlign: "left", marginLeft: "0" }} />
          <div className="moderator-list">
            <label style={{ textDecoration: "underline" }}>Current moderator list</label>
            <p>Cristiano Ronaldo</p>
            <p>Krishna Dev</p>
            <p>Shalya Shalya</p>
            <p>Shakira Shakira</p>
          </div>
          
          <form>
            <div className="add-moderator">
              <label>Add Moderator</label>
              <input type="text" />
              <p>Your name appears around your profile. It's where people check the contributor profile. You can remove it at any time.</p>
            </div>
            <button className="submit-button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddModerator

