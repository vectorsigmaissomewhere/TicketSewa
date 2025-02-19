import React, {useState, useEffect} from 'react'
import '../../styles/events.scss'
import AddEvent from '../Profile/AddEvent'
import BecomeContributor from '../Profile/BecomeContributor'
import { decodeToken } from '../../Utils/authtoken';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Heart } from "lucide-react";

const Event = () => {
  const token = localStorage.getItem('authToken');
  const userId = token ? decodeToken(token).user_id : null;
  const [verificationStatus, setVerificationStatus] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [userEventList, setUserEventList] = useState([]);
  const { eventContributorId } = useParams();
  const [likedEvents, setLikedEvents] = useState([]);

  if(userId){
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
            if(!userId) return;
            axios.get(`http://127.0.0.1:8000/events/user/${userId}/`)
              .then(response => {
                setUserEventList(response.data);
                console.log("This is userid")
                console.log(response.data);
              })
              .catch(error => {
                console.error(error);
              });
}, [userId]);
  }


  if(eventContributorId){
    useEffect(()=>{
      if(!eventContributorId) return;
      axios.get(`http://127.0.0.1:8000/events/user/${eventContributorId}/`)
        .then(response => {
          setEventList(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, [eventContributorId]);
  }
  const handleLike = async (eventId) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/like_event/",
        {
          event: eventId,
          user: userId, 
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
          },
        }
      );

      if (response.status === 201) {
        setLikedEvents((prev) => [...prev, eventId]);
      }
    } catch (error) {
      console.error("Error liking event:", error);
    }
  };
  return (
    <>
    <div class="contributor-tag">
    <h2>All Contributor Groups</h2>
  </div>
  <div className="main-container">
        {eventList.map((event) => (
          <div className="main-container-first" key={event.event_id}>
          <div className="main-container-image">
            <img src={`http://127.0.0.1:8000${event.event_image}`} alt="Event Image" />
          </div>
          <div className="content">
            <div>
              <div className="title">{event.name}</div>
              <div className="time">📅 {new Date(event.date).toDateString()} - {event.time}</div>
            </div>
            {!userId && (
              <div className="like">
                <Heart
                  size={24}
                  color={likedEvents.includes(event.event_id) ? "red" : "gray"}
                  onClick={() => handleLike(event.event_id)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
            <button className="event-btn">View Event Details</button>
          </div>
        </div>        
        ))}
      </div>
    {verificationStatus?.verified === true && (
      <div className="main-container">
      {userEventList.map((event) => (
        <div className="main-container-first" key={event.event_id}>
        <div className="main-container-image">
          <img src={`http://127.0.0.1:8000${event.event_image}`} alt="Event Image" />
        </div>
        <div className="content">
          <div>
            <div className="title">{event.name}</div>
            <div className="time">📅 {new Date(event.date).toDateString()} - {event.time}</div>
          </div>
          {!userId && (
            <div className="like">
              <Heart
                size={24}
                color={likedEvents.includes(event.event_id) ? "red" : "gray"}
                onClick={() => handleLike(event.event_id)}
                style={{ cursor: "pointer" }}
              />
            </div>
          )}
          <button className="event-btn">View Event Details</button>
        </div>
      </div>        
      ))}
    </div>
    )}
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
