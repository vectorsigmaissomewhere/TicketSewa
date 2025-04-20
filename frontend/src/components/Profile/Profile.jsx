import React from 'react'
import Navbar from '../Home/Navbar'
import Footer from '../Home/Footer'
import Profileheading from '../Profile/Profileheading'
import Event from '../Profile/Event'
import ProfileNavigation from '../Profile/ProfileNavigation'
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { eventContributorId } = useParams();
  return (
    <div>
      <Navbar />
      <Profileheading />
      <ProfileNavigation />
    </div>
  )
}

export default Profile
