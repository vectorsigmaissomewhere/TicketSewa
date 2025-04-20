import React, { useState, useEffect } from 'react'
import Navbar from '../Home/Navbar'
import Footer from '../Home/Footer'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { decodeToken } from '../../Utils/authtoken';

const Home = () => {
  const navigate = useNavigate();
  const navToEvent = (e) => {
    e.preventDefault();
    navigate("/event");
  };
  const [isfeaturedEvent, setIsFeaturedEvent] = useState([]);
  const [internationlEvent, setInternationalEvent] = useState([]);
  const [popularConcert, setPopularConcert] = useState([]);
  const [recommendEvent, setRecommendEvent] = useState([]);
  const [popularSport, setPopularSport] = useState([]);
  const [popularArt, setPopularArt] = useState([]);
  const [popularFamily, setPopularFamily] = useState([]);
  const token = localStorage.getItem('authToken');
  const decodedToken = decodeToken(token);
  const userId = decodedToken?.user_id || null;
  const handleCategoryClick = (category) => {
    navigate(`/event?category=${category}`);
  };
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/featureviewapi/')
      .then(response => {
        setIsFeaturedEvent(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://127.0.0.1:8000/internationaleventapi/')
      .then(response => {
        setInternationalEvent(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://127.0.0.1:8000/popularconcerteventapi/')
      .then(response => {
        setPopularConcert(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://127.0.0.1:8000/popularsporteventapi/')
      .then(response => {
        setPopularSport(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://127.0.0.1:8000/populararteventapi/')
      .then(response => {
        setPopularArt(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://127.0.0.1:8000/popularfamilyeventapi/')
      .then(response => {
        setPopularFamily(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get(`http://127.0.0.1:8000/api/event/recommendeventapi/${userId}/`)
      .then((response) => {
        console.log("Recommended Events");
        console.log(response.data);
        setRecommendEvent(response.data.events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-4">
        {/* Flex Container for Main Content */}
        <div
              className="relative w-full h-80 bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <h1 className="text-3xl font-bold">Concerts</h1>
                  <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded" onClick={navToEvent}>Explore Now</button>
                </div>
              </div>
            </div>
        <div className="flex flex-col lg:flex-row">
          {/* Left Content (Hero, Recommended, Popular Near You) */}
          <div className="flex-1">
            {/* Hero Section */}

            {/* Recommended for You */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendEvent.length > 0 ? (
                  recommendEvent.map((event) => (
                    <div key={event.event_id} className="bg-white rounded shadow overflow-hidden cursor-pointer" onClick={() => navigate(`/eventdetail/${event.event_id}`)}>
                      <img src={`http://127.0.0.1:8000${event.image}`}
                        alt={event.name}
                        className="w-full h-auto"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{event.name}</h3>
                        <p className="text-gray-600">{event.description}</p>
                        <p className="text-sm text-gray-500">{event.city}, {event.country}</p>
                        <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No events available to display.</p>
                )}
              </div>
            </section>

            {/* Popular Near You */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Popular Near You</h2>

              {[
                { category: "Concerts", events: popularConcert.slice(0, 2) },
                { category: "Sports", events: popularSport.slice(0, 2) },
                { category: "Arts", events: popularArt.slice(0, 2) },
                { category: "Family", events: popularFamily.slice(0, 2) },
              ].map((categoryData, index) => (
                categoryData.events.length > 0 && (  // Only render if there are events
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">{categoryData.category}</h3>
                      {/*<button className="text-blue-500 hover:underline cursor-pointer" onClick={() => handleCategoryClick(categoryData.key)}>
                        See All {categoryData.category} 
                      </button>*/}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categoryData.events.map((event, i) => (
                        <div key={i} className="bg-white rounded shadow overflow-hidden" onClick={() => navigate(`/eventdetail/${event.event_id}`)}>
                          <img
                            src={`http://127.0.0.1:8000${event.event_image}`}
                            alt={event.name}
                            className="w-full h-auto"
                          />
                          <div className="p-4">
                            <h4 className="text-lg font-semibold">{event.name}</h4>
                            <p className="text-gray-600">{event.description || "Event details"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </section>

            {/* International Tour Section */}
            <section className="bg-white rounded shadow p-6">
              <h2 className="text-2xl font-bold text-center mb-6">International Tour</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Cards */}
                {internationlEvent.map((item, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => navigate(`/eventdetail/${item.event_id}`)}>
                    <img
                      src={`http://127.0.0.1:8000${item.event_image}`}
                      alt={item.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-gray-600">{item.event_type}</p>
                      <h3 className="text-lg font-bold">{item.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Content (Featured Section) */}
          <aside className="w-full lg:w-1/4 lg:pl-8">
            <h2 className="text-xl font-semibold mb-4">Featured</h2>
            <div className="space-y-4">
              {isfeaturedEvent.map((event, index) => (
                <div
                  key={index}
                  className="flex bg-white rounded shadow overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/eventdetail/${event.event_id}`)} // Add onClick here for navigation
                >
                  <img
                    src={`http://127.0.0.1:8000${event.event_image}`}
                    alt={event.name}
                    className="w-1/3 h-24 object-cover"
                  />
                  <div className="p-2 flex-1">
                    <h3 className="text-lg font-semibold">{event.name}</h3>
                    <p className="text-gray-600">{event.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
