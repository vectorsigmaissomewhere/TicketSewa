import React from 'react'
import Navbar from '../Home/Navbar'
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-4">
        {/* Flex Container for Main Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Content (Hero, Recommended, Popular Near You) */}
          <div className="flex-1">
            {/* Hero Section */}
            <div
              className="relative w-full h-64 bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <h1 className="text-3xl font-bold">Concerts</h1>
                  <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">Explore Now</button>
                </div>
              </div>
            </div>

            {/* Recommended for You */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    category: "Concerts",
                    image: "https://m.media-amazon.com/images/I/71WJlUBG91L._AC_SL1273_.jpg",
                  },
                  {
                    category: "Sports",
                    image: "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_concert-posters-cf75300061d3ed9b67842abf57ce0ef9.jpg?ts%20=%201699434317",
                  },
                  {
                    category: "Arts",
                    image: "https://marketplace.canva.com/EAFIygYzkes/1/0/1131w/canva-blue-minimalist-concert-music-cover-poster-CGNgQz4KqL0.jpg",
                  },
                  {
                    category: "Family",
                    image: "https://cdn.myportfolio.com/76ce5144-333f-4edb-9e00-1169625819f7/c1d371ba-43a7-4c4c-8291-16de1511f1f6_rw_3840.jpg?h=6951017f1504a7f845fdaf1d82fa747e",
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded shadow overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.category}
                      className="w-full h-auto"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{item.category}</h3>
                      <p className="text-gray-600">Event details here</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Popular Near You */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Popular Near You</h2>
              {[
                {
                  category: "Concerts",
                  events: [
                    { name: "Rock Fest 2024", image: "https://m.media-amazon.com/images/I/71WJlUBG91L._AC_SL1273_.jpg" },
                    { name: "Jazz Night Live", image: "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_concert-posters-cf75300061d3ed9b67842abf57ce0ef9.jpg?ts%20=%201699434317" },
                  ],
                },
                {
                  category: "Sports",
                  events: [
                    { name: "Grand Slam Finals", image: "https://marketplace.canva.com/EAFIygYzkes/1/0/1131w/canva-blue-minimalist-concert-music-cover-poster-CGNgQz4KqL0.jpg" },
                    { name: "City Marathon 2024", image: "https://cdn.myportfolio.com/76ce5144-333f-4edb-9e00-1169625819f7/c1d371ba-43a7-4c4c-8291-16de1511f1f6_rw_3840.jpg?h=6951017f1504a7f845fdaf1d82fa747e" },
                  ],
                },
                {
                  category: "Arts",
                  events: [
                    { name: "Art Expo 2024", image: "https://m.media-amazon.com/images/I/71WJlUBG91L._AC_SL1273_.jpg" },
                    { name: "Creative Minds Gallery", image: "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_concert-posters-cf75300061d3ed9b67842abf57ce0ef9.jpg?ts%20=%201699434317" },
                  ],
                },
                {
                  category: "Family",
                  events: [
                    { name: "Fun Fair Carnival", image: "https://marketplace.canva.com/EAFIygYzkes/1/0/1131w/canva-blue-minimalist-concert-music-cover-poster-CGNgQz4KqL0.jpg" },
                    { name: "Kids Wonderland Adventure", image: "https://cdn.myportfolio.com/76ce5144-333f-4edb-9e00-1169625819f7/c1d371ba-43a7-4c4c-8291-16de1511f1f6_rw_3840.jpg?h=6951017f1504a7f845fdaf1d82fa747e" },
                  ],
                },
              ].map((categoryData, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{categoryData.category}</h3>
                    <button className="text-blue-500 hover:underline">See All {categoryData.category}</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoryData.events.map((event, i) => (
                      <div key={i} className="bg-white rounded shadow overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-full h-auto"
                        />
                        <div className="p-4">
                          <h4 className="text-lg font-semibold">{event.name}</h4>
                          <p className="text-gray-600">Event details</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>


            {/* International Tour Section */}
            <section className="bg-white rounded shadow p-6">
              <h2 className="text-2xl font-bold text-center mb-6">International Tour</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Cards */}
                {[
                  {
                    category: "Concerts",
                    title: "Rajesh Dai",
                    link: "All International Concerts",
                    image: "https://m.media-amazon.com/images/I/71WJlUBG91L._AC_SL1273_.jpg",
                  },
                  {
                    category: "Sports",
                    title: "SPR vs JAB",
                    link: "All International Sports",
                    image: "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_concert-posters-cf75300061d3ed9b67842abf57ce0ef9.jpg?ts%20=%201699434317",
                  },
                  {
                    category: "Arts",
                    title: "Dot Anime Con",
                    link: "All International Arts",
                    image: "https://marketplace.canva.com/EAFIygYzkes/1/0/1131w/canva-blue-minimalist-concert-music-cover-poster-CGNgQz4KqL0.jpg",
                  },
                  {
                    category: "Family Shows",
                    title: "Ko Banchha Crorepati",
                    link: "All International Family Shows",
                    image: "https://cdn.myportfolio.com/76ce5144-333f-4edb-9e00-1169625819f7/c1d371ba-43a7-4c4c-8291-16de1511f1f6_rw_3840.jpg?h=6951017f1504a7f845fdaf1d82fa747e",
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-gray-600">{item.category}</p>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <a href="#" className="text-blue-500 hover:underline">
                        {item.link}
                      </a>
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
              {[
                {
                  name: "Rock Fiesta",
                  details: "An epic rock concert in your city.",
                  image: "https://m.media-amazon.com/images/I/71WJlUBG91L._AC_SL1273_.jpg",
                },
                {
                  name: "Championship Finals",
                  details: "Witness the ultimate showdown.",
                  image:
                    "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_concert-posters-cf75300061d3ed9b67842abf57ce0ef9.jpg?ts%20=%201699434317",
                },
                {
                  name: "Art Gala 2025",
                  details: "A celebration of modern art.",
                  image:
                    "https://marketplace.canva.com/EAFIygYzkes/1/0/1131w/canva-blue-minimalist-concert-music-cover-poster-CGNgQz4KqL0.jpg",
                },
                {
                  name: "Family Fun Fest",
                  details: "A day full of joy for the whole family.",
                  image:
                    "https://cdn.myportfolio.com/76ce5144-333f-4edb-9e00-1169625819f7/c1d371ba-43a7-4c4c-8291-16de1511f1f6_rw_3840.jpg?h=6951017f1504a7f845fdaf1d82fa747e",
                },
              ].map((event, index) => (
                <div key={index} className="flex bg-white rounded shadow overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-1/3 h-24 object-cover"
                  />
                  <div className="p-2 flex-1">
                    <h3 className="text-lg font-semibold">{event.name}</h3>
                    <p className="text-gray-600">{event.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 bg-gray-800 text-white p-6">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Left Section */}
          <div>
            <h3 className="text-xl font-bold">ticketSewa</h3>
            <p className="mt-2">Let's connect</p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-blue-500">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-pink-500">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-red-500">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          {/* Help Section */}
          <div className="mt-6 md:mt-0">
            <h4 className="text-lg font-bold">Help</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Queries
                </a>
              </li>
            </ul>
          </div>
          {/* Footer Rights */}
          <div className="mt-6 md:mt-0 text-center md:text-right">
            <p>© 2024-3000 Ticketmaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
