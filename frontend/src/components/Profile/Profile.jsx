import React from 'react'
import Profileheading from '../Profile/Profileheading'
import Event from '../Profile/Event'
import ProfileNavigation from '../Profile/ProfileNavigation'
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { eventContributorId } = useParams();
  return (
    <div>
      <Profileheading />
      <h2>User ID: {eventContributorId}</h2>
      <ProfileNavigation />
    </div>
  )
}

export default Profile
