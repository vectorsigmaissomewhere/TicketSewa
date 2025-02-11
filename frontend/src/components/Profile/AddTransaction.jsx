import React from 'react'
import '../../styles/accountsetting.scss';
import { Link } from 'react-router-dom';

const AddTransaction = () => {
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
            <Link to={"/settings/transaction"}><button className="transaction-button" style={{ backgroundColor: "#e0e0e0" }}>
              <img src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" alt="Profile Icon" />
              Transaction
            </button></Link>
            <Link to={"/settings/moderator"}><button className="moderator-button">
              <img src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png" alt="Profile Icon" />
              Add Moderator
            </button></Link>
        </div>
        <div className="profile-navigation-details">
          <h2>Add Transaction</h2>
          <form>
            <div className="transaction-name">
              <label>Select Transaction Name</label>
              <select id="transaction_name" name="transaction_name">
                <option value="" disabled selected>Choose a transaction type</option>
                <option value="number1transaction">Transaction One</option>
                <option value="number2transaction">Transaction Two</option>
              </select>
              <p>Select the appropriate transaction type to ensure proper payment processing.</p>
            </div>
            <div className="transaction-number">
              <label>Select Transaction Number</label>
              <input type="text"/>
              <p>Enter the transaction number provided after completing the payment. This helps in verifying your payment.</p>
            </div>
            <button className="submit-button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddTransaction
