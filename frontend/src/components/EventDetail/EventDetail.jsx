import React from "react";

const EventDetail = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Event Header */}
      <div className="relative bg-blue-900 text-white p-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
          <img
            src="/event-poster.jpg"
            alt="Dream On Music Fest"
            className="w-full md:w-1/3 rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Dream On Music Fest</h1>
            <p className="mt-2">📅 13 MAR | 🕒 1:31 AM ONWARDS</p>
            <p className="mt-1">📍 Hyatt Ground, Chuchhepati, Chabahil</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-lg font-semibold">Rs. 899</span>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg">Book Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Event Details</h2>
        <p className="mt-2 text-gray-700">
          Get ready for a Night of Unforgettable Music 🎸 Wander into melody as Albatross, Swar, Sabin Rai & the Pharaoh, and The Rockheads take the stage for an electrifying live performance!
        </p>
      </div>

      {/* Organizer Info */}
      <div className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg flex items-center gap-4">
        <img src="/khalti-logo.png" alt="Khalti Events" className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-semibold">Khalti Events</p>
          <p className="text-sm text-gray-500">Organizer</p>
        </div>
      </div>

      {/* Location Map */}
      <div className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?..."
          className="w-full h-64 rounded-lg"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Terms & Conditions */}
      <div className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Terms & Conditions</h2>
        <ul className="list-disc ml-6 mt-2 text-gray-700">
          <li>Tickets are Non-Refundable & Non-Transferable.</li>
          <li>No sharp or defensive objects allowed.</li>
          <li>The event organizer is not responsible for any unforeseen incidents.</li>
          <li>Do not share tickets or QR codes with others.</li>
          <li>If a ticket is lost or scanned already, no refund will be provided.</li>
        </ul>
      </div>
    </div>
  );
};

export default EventDetail;
