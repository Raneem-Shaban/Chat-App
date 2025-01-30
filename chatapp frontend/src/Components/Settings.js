import React from 'react';

const Settings = () => {
  return (
    <div className='w-[425px] h-[30%] flex flex-col items-start justify-between px-2.5 mt-5'>
      <p className='text-[20px] font-semibold'>Settings</p>
      <div className='w-full h-[90%] flex flex-wrap justify-between'>
        <button className='w-[49%] h-[30%] shadow-md border-none rounded-[15px] bg-white flex flex-row items-center text-[18px] font-normal'>
          <img className='w-[20px] h-[20px] ml-[5%]' alt='' src={'assets/lang.svg'}></img>
          <span className='pl-[3%]'>Language</span>
        </button>
        <button className='w-[49%] h-[30%] shadow-md border-none rounded-[15px] bg-white flex flex-row items-center text-[18px] font-normal'>
          <img className='w-[20px] h-[20px] ml-[5%]' alt='' src={'assets/aboutUs.svg'}></img>
          <span className='pl-[3%]'>About Us</span>
        </button>
        <button className='w-[49%] h-[30%] shadow-md border-none rounded-[15px] bg-white flex flex-row items-center text-[18px] font-normal'>
          <img className='w-[20px] h-[20px] ml-[5%]' alt='' src={'assets/call.svg'}></img>
          <span className='pl-[3%]'>Contact Us</span>
        </button>
        <button className='w-[49%] h-[30%] shadow-md border-none rounded-[15px] bg-white flex flex-row items-center text-[18px] font-normal'>
          <img className='w-[20px] h-[20px] ml-[5%]' alt='' src={'assets/privacy.svg'}></img>
          <span className='pl-[3%]'>Privacy Policy</span>
        </button>
        <button className='w-[49%] h-[30%] shadow-md border-none rounded-[15px] bg-white flex flex-row items-center text-[18px] font-normal'>
          <img className='w-[20px] h-[20px] ml-[5%]' alt='' src={'assets/signOut.svg'}></img>
          <span className='pl-[3%]'>Sign Out</span>
        </button>
        <button className='w-[49%] h-[30%] shadow-md border-none rounded-[15px] bg-white flex flex-row items-center text-[18px] font-normal'>
          <img className='w-[20px] h-[20px] ml-[5%]' alt='' src={'assets/delete.svg'}></img>
          <span className='pl-[3%] text-red-500'>Delete Account</span>
        </button>
      </div>
    </div>
  )
}

export default Settings;