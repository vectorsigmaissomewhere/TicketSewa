import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password,
    };

    axios
      .post("http://127.0.0.1:8000/api/user/login/", userCredentials)
      .then((response) => {
        setEmail("");
        setPassword("");
        setErrorMessage("");
        setMessage("Login Successful");
        setErrors({});
        console.log("User logged in successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setErrorMessage("Login failed. Please check your credentials.");
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
      <div className="flex flex-col sm:flex-row w-11/12 max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div
          className="flex-1 bg-cover bg-center flex flex-col justify-center items-center text-white p-6 sm:min-h-[300px]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            Welcome Back
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-center px-4">
            Welcome to TicketSewa — your all-access pass to hundreds of live
            events, from music concerts and sports games to arts, theater, and
            family shows.
          </p>
        </div>
        <div className="flex-1 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Log In</h2>
          <p className="text-xs sm:text-sm mb-4">
            New to TicketSewa?{" "}
            <a href="#" className="text-blue-500 underline">
              Sign Up
            </a>
          </p>
          {message && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span>{message}</span>
            </div>
          )}
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span>{errorMessage}</span>
            </div>
          )}
          {errors && (
            <ul className="mb-4">
              {Object.keys(errors).map((key, index) => (
                <li key={index} className="text-red-500">
                  {`${key}: ${errors[key]}`}
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-xs sm:text-sm mt-2 mb-4">
              By continuing past this page, you agree to the{" "}
              <a href="#" className="text-blue-500 underline">
                Terms of Use
              </a>{" "}
              and understand that information will be used as described in our{" "}
              <a href="#" className="text-blue-500 underline">
                Privacy Policy
              </a>
              .
            </p>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
            >
              Log In
            </button>
            <div className="mt-4">
              <a href="#" className="text-blue-500 text-center block">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;