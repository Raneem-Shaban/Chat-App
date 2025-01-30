// src/MessageHeader.js
import React from 'react';
import '../CssFiles/MessageHeader.css'; // Import CSS file for styling
import { CiSearch } from "react-icons/ci";

const MessageHeader = ({ user }) => {
    let profileImage = require(`../Assets/${user.profileImage}`);

    return (
        <div className="message-header">
            <div className="inner-msg-header">
                <div className="profile-section">
                    <div className="profile-image">
                        <img src={profileImage} alt="Profile" />
                    </div>
                    {user.isOnline && <div className="online-indicator"></div>}
                    <div className="user-info">
                        <div className="username">{user.username}</div>
                        <div className="status">{user.status}</div>
                    </div>
                </div>
                <div className="search-icon">
                    <CiSearch className="search-icon"/>
                </div>
            </div>
        </div>
    );
};

export default MessageHeader;
