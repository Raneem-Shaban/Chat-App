import React from 'react';
import ProfileDetails from './ProfileDetails';
import Basics from './Basics';
import Settings from './Settings';

const Profile = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center gap-6 rounded-3xl static'>
      <ProfileDetails />
      <Basics />
      <Settings />
    </div>
  );
};

export default Profile;
