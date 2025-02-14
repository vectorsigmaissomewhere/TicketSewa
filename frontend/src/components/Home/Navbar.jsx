import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  // get the access token
  const user_acces_token = localStorage.getItem('authToken');

  if (user_acces_token) {
    try{
      const decodedToken = jwtDecode(user_acces_token);
      console.log("Decoded Token:", decodedToken);
      console.log("User Id;", decodedToken.user_id);
      console.log("Email:", decodedToken.email);
      console.log("Access Token:", user_acces_token);
      console.log("Is this running");
    }
    catch(error){
      console.error("Invalid token:", error);
    }
  }
  // logout code 
  const navigate = useNavigate();
  const logout_event = (e) =>{
    localStorage.removeItem('authToken')
    navigate('/');
  }
  return (
    <nav className="bg-indigo-950 text-white px-5 py-3">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Logo */}
        <div>
          <a href="#" className="no-underline text-lg font-bold text-white">
            ticket<span className="text-blue-400">Sewa</span>
          </a>
        </div>

        {/* Hamburger Icon */}
        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Links */}
        <ul
          className={`${
            menuOpen ? 'block' : 'hidden'
          } w-full md:flex md:w-auto md:gap-6 mt-4 md:mt-0`}
        >
          <li>
            <a
              href="#"
              className="block md:inline hover:text-blue-400 transition duration-300"
            >
              Concerts
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block md:inline hover:text-blue-400 transition duration-300"
            >
              Sports
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block md:inline hover:text-blue-400 transition duration-300"
            >
              Arts
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block md:inline hover:text-blue-400 transition duration-300"
            >
              Family
            </a>
          </li>
        </ul>

        {/* Sign-in/Register */}
        <div className="hidden md:block">
        <Link to={'/profile'}><a
            className="no-underline text-sm hover:text-blue-400 transition duration-300"
          >
            Profile
          </a></Link>
          {!user_acces_token && (
            <Link to={'/login'}><a
            className="no-underline text-sm hover:text-blue-400 transition duration-300"
          >
            Sign in/Register
          </a></Link>
          )}
          {user_acces_token && (
            <Link><a
              className="no-underline text-sm hover:text-blue-400 transition duration-300" onClick={logout_event}
            >
              Logout
            </a></Link>
          )}
        </div>
      </div>

      {/* Conditionally Render Search Form */}
      {menuOpen && (
        <div className="bg-slate-300 justify-center py-4 mx-5 md:mx-20 px-5 my-2">
          <form>
            <div className="flex flex-wrap items-center gap-4">
              {/* First Input */}
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 p-2.5"
                placeholder="Enter City"
                required
              />

              {/* Select Input */}
              <select
                name="language"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 p-2.5"
                required
              >
                <option value="English">English</option>
                <option value="Nepali">Nepali</option>
              </select>

              {/* Second Input */}
              <input
                type="text"
                id="company"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 p-2.5"
                placeholder="Search by Artist, Event"
                required
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
