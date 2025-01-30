import React from 'react';

const ProfileDetails = () => {
  return (
    <div className='w-[425px] h-[12%] flex flex-row items-center justify-between px-2.5 mt-[11%]'>
      <div className='w-[70px]'>
        <img src={'assets/profile.svg'} alt='' className='w-full'></img>
      </div>
      <div className='flex flex-col items-start justify-center w-[72%] h-[48%]'>
        <p className='text-[20px] font-semibold'>Mhd Shaar</p>
        <p className='text-[16px] font-normal'>+963 982 305 060</p>
      </div>
      <div className='w-[20px]'>
        <img src={'./assets/editProfile.svg'} alt=''></img>
      </div>
    </div>
  );
};

export default ProfileDetails;
