import React, { useEffect, useState } from "react";
import "../../styles/allevent.scss";
import { Heart } from "lucide-react";
import { decodeToken } from "../../Utils/authtoken";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState([]);
  const [filters, setFilters] = useState({
    event_type: "",
    country: "",
    city: "",
    ticket_active: "",
    event_date: "",
    capacity: "",
  });

  const token = localStorage.getItem("authToken");
  const decodedToken = decodeToken(token);
  const userId = decodedToken?.user_id || null;
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [filters]); // Fetch events whenever filters change

  const fetchEvents = () => {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });

    const apiUrl = `http://127.0.0.1:8000/api/event/event-list/?${queryParams}`;
    console.log("Fetching events from:", apiUrl); // Debugging log

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("These are the fetched data", response.data)
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    console.log("Filters applied:", filters); // Debugging log
    fetchEvents();
  };

  const handleLike = async (eventId) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/like_event/",
        { event: eventId, user: userId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );

      if (response.status === 201) {
        setLikedEvents((prev) => [...prev, eventId]);
      }
    } catch (error) {
      console.error("Error liking event:", error);
    }
  };

  const handleCheckContributor = (eventContributorId) => {
    navigate(`/profile/${eventContributorId}`);
  };

  return (
    <div className="main-container-eventlist">
      {/* FILTER SECTION */}
      <div className="main-container-eventlist-filter">
        <div className="filter-header">
          <p>Apply Filters</p>
        </div>
        <form onSubmit={handleApplyFilters} className="filter-form">
          <div className="filter-group">
            <label>Event Type</label>
            <select name="event_type" value={filters.event_type} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="concert">Concert</option>
              <option value="sport">Sport</option>
              <option value="art">Art</option>
              <option value="family">Family</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Country</label>
            <input type="text" name="country" value={filters.country} onChange={handleFilterChange} />
          </div>

          <div className="filter-group">
            <label>City</label>
            <input type="text" name="city" value={filters.city} onChange={handleFilterChange} />
          </div>

          <div className="filter-group">
            <label>Ticket Active</label>
            <select name="ticket_active" value={filters.ticket_active} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Event Date</label>
            <input type="date" name="event_date" value={filters.event_date} onChange={handleFilterChange} />
          </div>

          <div className="filter-group">
            <label>Capacity</label>
            <input type="number" name="capacity" value={filters.capacity} onChange={handleFilterChange} />
          </div>

          <button type="submit" className="apply-btn">
            Apply Filters
          </button>
        </form>
      </div>
      {/* EVENT LIST SECTION */}
      <div className="main-container-eventlist-event">
        <div className="heading-name">All Events</div>
        <div className="main-container">
          {events.length === 0 ? (
            <p>No events found</p>
          ) : (
            events.map((event) => (
              <div className="main-container-first" key={event.event_id}>
                <div className="main-container-image">
                  <img src={event.event_image} alt="Event" />
                </div>
                <div className="content">
                  <div>
                    <div className="title">{event.name}</div>
                    <div className="time">
                      📅 {new Date(event.date).toDateString()} - {event.time}
                    </div>
                  </div>
                  <div>
                    <button onClick={() => handleCheckContributor(event.user)}>Check Contributor</button>
                  </div>
                  <div className="like">
                    <Heart
                      size={24}
                      color={likedEvents.includes(event.event_id) ? "red" : "gray"}
                      onClick={() => handleLike(event.event_id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <button
                    className="event-btn"
                    onClick={() => navigate(`/eventdetail/${event.event_id}`)}
                  >
                    View Event Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
