import React, { useEffect, useState }  from 'react'
import '../../styles/allevent.scss';
import { Heart } from "lucide-react";
import { decodeToken } from '../../Utils/authtoken';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/eventviewapi/")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);
  const [likedEvents, setLikedEvents] = useState([]);
  const token = localStorage.getItem('authToken');
  const decodedToken = decodeToken(token);
  const userId = decodedToken?.user_id || null;

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
    <div className='main-container-eventlist'>
      <div className='main-container-eventlist-filter'>
        <div className='filter-content'>
          <p>Apply Filters</p>
        </div>
        <form>
        <div className='filter-content'>
          <label>Category</label>
          <input type='text'/>
        </div>
        <div className='filter-content'>
          <label>Event Type</label>
          <input type='text'/>
        </div>
        <div className='filter-content'>
          <label>Genre</label>
          <input type='text'/>
        </div>
        <div className='filter-content'>
          <label>Country</label>
          <input type='text'/>
        </div>
        <div className='filter-content'>
          <label>City</label>
          <input type='text'/>
        </div>
        <div className='filter-content'>
          <label>Ticket Active</label>
          <input type='text'/>
        </div>
        <div className='filter-content'>
          <label>Event Date</label>
          <input type='text'/>
        </div>
        <div className='filter-content'>
          <label>Capacity</label>
          <input type='text'/>
        </div>
        <button className="bg-blue-500 text-white text-lg font-semibold py-1 px-2 rounded-lg cursor-pointer mt-2.5 transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 ml-auto mr-2 block">Add filter</button>
        </form>
      </div>
      <div className="main-container-eventlist-event">
      <div className="heading-name">All Events</div>
      <div className="main-container">
        {events.map((event) => (
          <div className="main-container-first" key={event.event_id}>
            <div className="main-container-image">
              <img
                src={`http://127.0.0.1:8000${event.event_image}`}
                alt="Event Image"
              />
            </div>
            <div className="content">
              <div>
                <div className="title">{event.name}</div>
                <div className="time">
                  📅 {new Date(event.date).toDateString()} - {event.time}
                </div>
              </div>
              <p>{event.event_id}</p>
              <div className="like">
              <Heart
                    size={24}
                    color={likedEvents.includes(event.event_id) ? "red" : "gray"}
                    onClick={() => handleLike(event.event_id)}
                    style={{ cursor: "pointer" }}
                  />
              </div>
              <button className="event-btn">View Event Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  )
}

export default EventList