import React, { useState, useEffect } from 'react';
import '../../styles/events.scss';
import { decodeToken } from '../../Utils/authtoken';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Heart } from "lucide-react";

const Liked = () => {
  const token = localStorage.getItem('authToken');
  const userId = token ? decodeToken(token).user_id : null;
  const { eventContributorId } = useParams();
  const [eventList, setEventList] = useState([]); 
  const [likedEvents, setLikedEvents] = useState([]);

  const idToUse = eventContributorId || userId; 
  useEffect(() => {
    if (!idToUse) return;

    axios
      .get(`http://127.0.0.1:8000/liked-events/${idToUse}/`)
      .then(response => {
        setEventList(response.data);
        console.log('Liked Events:', response.data);
      })
      .catch(error => {
        console.error('Error fetching liked events:', error);
      });
  }, [idToUse]); 
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
      <div className="contributor-tag">
        <h2>Liked Events</h2>
      </div>
      <div className="main-container">
        {eventList.map((event) => (
          <div className="main-container-first" key={event.event_id}>
          <div className="main-container-image">
          <img src={event.event_image} alt="Event Image" />
          </div>
          <div className="content">
            <div>
              <div className="title">{event.name}</div>
              <div className="time">📅 {new Date(event.date).toDateString()} - {event.time}</div>
            </div>
            {userId && (
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
    </>
  );
};

export default Liked;
