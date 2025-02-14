import React, {useState, useEffect} from 'react'
import '../../styles/events.scss'
import AddEvent from '../Profile/AddEvent'
import BecomeContributor from '../Profile/BecomeContributor'
import { decodeToken } from '../../Utils/authtoken';
import axios from "axios";

const Event = () => {
  const token = localStorage.getItem('authToken');
  const userId = token ? decodeToken(token).user_id : null;
  const [verificationStatus, setVerificationStatus] = useState([]);

  useEffect(() => {
    if (!userId) return; 
    axios.get(`http://127.0.0.1:8000/api/contributor/check-contributor-verification/${userId}/`)
        .then(response => {
            setVerificationStatus(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}, [userId]);
  return (
    <>
    <div class="contributor-tag">
    <h2>All Contributor Groups</h2>
  </div>
  <div class="main-container">
    <div class="main-container-first">
      <div class="main-container-image">
        <img src="https://img.freepik.com/free-vector/gradient-musical-event-poster-template_23-2150520412.jpg" alt="Event Image"/>
      </div>
      <div class="content">
        <div>
          <div class="title">Amazing Music Concert with Famous Artists...</div>
          <div class="time">📅 July 20, 2025 - 8:00 PM</div>
        </div>
        <div class="buttons">
          <button class="update-btn">Update</button>
        </div>
        <button class="event-btn">View Event Details</button>
      </div>
    </div>

    <div class="main-container-first">
      <div class="main-container-image">
        <img src="https://www.shutterstock.com/image-photo/concert-stage-audience-turns-on-260nw-2435542313.jpg" alt="Event Image"/>
      </div>
      <div class="content">
        <div>
          <div class="title">Live Rock Festival 2025 in Your City...</div>
          <div class="time">📅 August 10, 2025 - 7:30 PM</div>
        </div>
        <div class="buttons">
          <button class="update-btn">Update</button>
        </div>
        <button class="event-btn">View Event Details</button>
      </div>
    </div>

    <div class="main-container-first">
      <div class="main-container-image">
        <img src="https://media.istockphoto.com/id/1461816749/photo/a-crowd-of-people-with-raised-arms-during-a-music-concert-with-an-amazing-light-show-black.jpg?s=612x612&w=0&k=20&c=-hdWCLDP5AI9A3mjq3JPMPKhXxJ2P1iItPDFktQHxX8=" alt="Event Image"/>
      </div>
      <div class="content">
        <div>
          <div class="title">Electronic Dance Night 2025 Featuring Top DJs...</div>
          <div class="time">📅 September 5, 2025 - 9:00 PM</div>
        </div>
        <div class="buttons">
          <button class="update-btn">Update</button>
        </div>
        <button class="event-btn">View Event Details</button>
      </div>
    </div>

    <div class="main-container-first">
      <div class="main-container-image">
        <img src="https://media.istockphoto.com/id/1806011581/photo/overjoyed-happy-young-people-dancing-jumping-and-singing-during-concert-of-favorite-group.jpg?s=612x612&w=0&k=20&c=cMFdhX403-yKneupEN-VWSfFdy6UWf1H0zqo6QBChP4=" alt="Event Image"/>
      </div>
      <div class="content">
        <div>
          <div class="title">Hip-Hop Legends Tour 2025 with Special Guests...</div>
          <div class="time">📅 October 15, 2025 - 6:45 PM</div>
        </div>
        <div class="buttons">
          <button class="update-btn">Update</button>
        </div>
        <button class="event-btn">View Event Details</button>
      </div>
    </div>
  </div>
  {verificationStatus?.verified === false && (
    <BecomeContributor />
)}
  {verificationStatus?.verified === true && (
    <AddEvent/>
)}
    </>
  )
}

export default Event
