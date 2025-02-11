import {React, useState} from 'react'
import { Calendar, MapPin, Heart} from "lucide-react";
import Event from '../Profile/Event'
import Visits from '../Profile/Visits'
import Liked from '../Profile/Liked'

const ProfileNavigation = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <>
    <div className="bg-[#ebeef2] p-2 flex space-x-4">
    <button
          onClick={() => setActiveTab(1)}
          className={`w-[150px] h-[30px] flex items-center justify-center gap-2 rounded-[10px] border-0 cursor-pointer transition-all ${
            activeTab === 1
              ? "bg-blue-600 text-white"
              : "bg-white text-black hover:shadow-[2px_4px_8px_hsl(286,36%,58%,0.5)]"
          }`}
        >
          <Calendar size={16} />
          Events
        </button>

        <button
          onClick={() => setActiveTab(2)}
          className={`w-[150px] h-[30px] flex items-center justify-center gap-2 rounded-[10px] border-0 cursor-pointer transition-all ${
            activeTab === 2
              ? "bg-blue-600 text-white"
              : "bg-white text-black hover:shadow-[2px_4px_8px_hsl(286,36%,58%,0.5)]"
          }`}
        >
          <MapPin size={16} />
          Visits
        </button>

        <button
          onClick={() => setActiveTab(3)}
          className={`w-[150px] h-[30px] flex items-center justify-center gap-2 rounded-[10px] border-0 cursor-pointer transition-all ${
            activeTab === 3
              ? "bg-blue-600 text-white"
              : "bg-white text-black hover:shadow-[2px_4px_8px_hsl(286,36%,58%,0.5)]"
          }`}
        >
          <Heart size={16} />
          Liked
        </button>
    </div>

    {/*showing the content  */}
    {activeTab === 1 && (
      <Event />
    )}
    {activeTab === 2 && (
      <Visits />
    )}
    {activeTab === 3 && (
      <Liked />
    )}
    </>
  )
}

export default ProfileNavigation
