import React from 'react'
import '../../styles/allevent.scss';
import { Heart } from "lucide-react";

const EventList = () => {
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
      <div className='main-container-eventlist-event'>
        <div className='heading-name'>
          All Events 
        </div>
        <div class="main-container">
    <div class="main-container-first">
      <div class="main-container-image">
        <img src="https://img.freepik.com/free-vector/gradient-musical-event-poster-template_23-2150520412.jpg" alt="Event Image"/>
      </div>
      <div class="content">
        <div>
          <div class="title">Amazing Music Concert with Famous Artists...</div>
          <div class="time">📅 July 20, 2025 - 8:00 PM</div>
        </div>
        <div class="like">
        <Heart />
        </div>
        <button class="event-btn">View Event Details</button>
      </div>
    </div>

    <div class="main-container-first">
      <div class="main-container-image">
        <img src="https://www.shutterstock.com/image-photo/concert-stage-audience-turns-on-260nw-2435542313.jpg" alt="Event Image"/>
      </div>
      <div class="content">
        <div>
          <div class="title">Live Rock Festival 2025 in Your City...</div>
          <div class="time">📅 August 10, 2025 - 7:30 PM</div>
        </div>
        <div class="like">
        <Heart />
        </div>
        <button class="event-btn">View Event Details</button>
      </div>
    </div>

    <div class="main-container-first">
      <div class="main-container-image">
        <img src="https://media.istockphoto.com/id/1461816749/photo/a-crowd-of-people-with-raised-arms-during-a-music-concert-with-an-amazing-light-show-black.jpg?s=612x612&w=0&k=20&c=-hdWCLDP5AI9A3mjq3JPMPKhXxJ2P1iItPDFktQHxX8=" alt="Event Image"/>
      </div>
      <div class="content">
        <div>
          <div class="title">Electronic Dance Night 2025 Featuring Top DJs...</div>
          <div class="time">📅 September 5, 2025 - 9:00 PM</div>
        </div>
        <div class="like">
        <Heart />
        </div>
        <button class="event-btn">View Event Details</button>
      </div>
    </div>

    <div class="main-container-first">
      <div class="main-container-image">
        <img src="https://media.istockphoto.com/id/1806011581/photo/overjoyed-happy-young-people-dancing-jumping-and-singing-during-concert-of-favorite-group.jpg?s=612x612&w=0&k=20&c=cMFdhX403-yKneupEN-VWSfFdy6UWf1H0zqo6QBChP4=" alt="Event Image"/>
      </div>
      <div class="content">
        <div>
          <div class="title">Hip-Hop Legends Tour 2025 with Special Guests...</div>
          <div class="time">📅 October 15, 2025 - 6:45 PM</div>
        </div>
        <div class="like">
        <Heart />
        </div>
        <button class="event-btn">View Event Details</button>
      </div>
    </div>
    </div>
      </div>
    </div>
    </>
  )
}

export default EventList