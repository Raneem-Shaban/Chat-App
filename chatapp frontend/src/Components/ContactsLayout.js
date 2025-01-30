import React, { useState } from 'react';
import Search from './Search';
import Conversation from './Conversation';
import Profile from './Profile';

const ContactsLayout = () => {
    const [showProfile, setShowProfile] = useState(false);

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    return (
        <div className="w-full lg:w-[30%] h-screen bg-gray-50 flex flex-col items-center relative">
            <div className="w-full h-1/5 bg-white flex items-center justify-between px-5">
                <h2 className="text-2xl font-semibold">Chats</h2>
                <div className="flex items-center space-x-4">
                    <img src={'/assets/toggle.svg'} alt='' className='w-5 h-5' />
                    <img src={'/assets/edit.svg'} alt='' className='w-5 h-5' onClick={toggleProfile} />
                </div>
            </div>
            <Search />
            <Conversation />
            {showProfile && (
                <div className="fixed inset-0 flex z-50 animate-fadeIn">
                    <div className="absolute inset-0 bg-black bg-opacity-60" onClick={toggleProfile}></div>
                    <div className="relative bg-white z-10 w-4/5 lg:w-1/3 h-full flex flex-col items-center gap-6 rounded-r-2xl shadow-lg animate-slideInLeft">
                        <Profile />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactsLayout;
