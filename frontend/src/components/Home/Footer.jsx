import React from 'react'

const Footer = () => {
  return (
    <>
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

export default Footer
