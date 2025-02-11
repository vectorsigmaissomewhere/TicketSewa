import React from 'react';
import '../../styles/accountsetting.scss';
import { Link } from 'react-router-dom';

const AccountPublicProfile = () => {
  return (
    <>
      <div className="profile-navigation-main">
        <div className="profile-navigation-navbar">
          <p>Settings</p>
          <Link to={"/settings/accountprofile"}><button className="public-profile-button" style={{ backgroundColor: "#e0e0e0" }}>
            <img
              src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png"
              alt="Profile Icon"
            />
            Public Profile
          </button>
          </Link>
          <Link to={"/settings/accountconfig"}><button className="account-button">
            <img
              src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png"
              alt="Profile Icon"
            />
            Account
          </button>
          </Link>
          <Link to={"/settings/transaction"}><button className="transaction-button">
            <img
              src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png"
              alt="Profile Icon"
            />
            Transaction
          </button>
          </Link>
          <Link to={"/settings/moderator"}><button className="moderator-button">
            <img
              src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png"
              alt="Profile Icon"
            />
            Add Moderator
          </button></Link>
        </div>
        <div className="profile-navigation-details">
          <h2>Public Profile</h2>
          <div className="profile-picture">
            <label>Profile Picture</label>
            <img
              className="profile-picture-main"
              src="https://static.vecteezy.com/system/resources/thumbnails/033/889/256/small/sunset-on-the-sea-shore-generated-by-ai-photo.jpg"
              alt="Profile Image"
            />
            <label htmlFor="file-upload" className="editicon-label">
              <img
                className="editicon"
                src="https://w7.pngwing.com/pngs/122/880/png-transparent-letter-mail-mailing-email-mailbox-inbox-thumbnail.png"
                alt="Upload Image"
              />
            </label>
            <input type="file" id="file-upload" name="file-upload" accept="image/*" style={{ display: "none" }} />
          </div>

          <form>
            <div className="public-name">
              <label>Name</label>
              <input type="text" />
              <p>Your name appears around your profile. It's where people check the contributor profile. You can remove it at any time.</p>
            </div>
            <div className="public-email">
              <label>Public Email</label>
              <input type="email" />
              <p>Your email appears around your profile. It's where people check the contributor profile. You can remove it at any time.</p>
            </div>
            <div className="public-bio">
              <label>Bio</label>
              <textarea className="profile-bio-textarea" rows="6" cols="40"></textarea>
              <p>Your bio appears around your profile. It's where people check the contributor profile. You can remove it at any time.</p>
            </div>
            <div className="public-social-account">
              <label>Social Accounts</label>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                <img className="editicon" src="https://w7.pngwing.com/pngs/279/877/png-transparent-hyperlink-computer-icons-link-text-logo-number.png" alt="Upload Image" />
                <input type="text" style={{ width: "80%" }} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                <img className="editicon" src="https://w7.pngwing.com/pngs/279/877/png-transparent-hyperlink-computer-icons-link-text-logo-number.png" alt="Upload Image" />
                <input type="text" style={{ width: "80%" }} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                <img className="editicon" src="https://w7.pngwing.com/pngs/279/877/png-transparent-hyperlink-computer-icons-link-text-logo-number.png" alt="Upload Image" />
                <input type="text" style={{ width: "80%" }} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                <img className="editicon" src="https://w7.pngwing.com/pngs/279/877/png-transparent-hyperlink-computer-icons-link-text-logo-number.png" alt="Upload Image" />
                <input type="text" style={{ width: "80%" }} />
              </div>
            </div>
            <div>
              <label>Location</label>
              <input type="text" />
              <p>Your location appears around your profile. It's where people check the contributor profile. You can remove it at any time.</p>
            </div>
            <button className="submit-button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AccountPublicProfile;
