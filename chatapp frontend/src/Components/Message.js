import React, { useState, useEffect, useRef } from 'react';
import '../CssFiles/Message.css';
import { BiEdit } from "react-icons/bi";
import { IoBookmarksOutline } from "react-icons/io5";
import { BsCheck2 } from "react-icons/bs";
import { BsCheck2All } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import { RiArrowGoForwardLine } from "react-icons/ri";
import { PiStarLight } from "react-icons/pi";


const Message = ({messageId, text, timeSent, reciver, currentUser, seen, onDeleteMessage, onSaved}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showDots, setShowDots] = useState(false);
    const messageRef = useRef(null);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenu = () => {
        setShowMenu(false);
        setShowDots(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (messageRef.current && !messageRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isSender = reciver !== currentUser ;

    const messageClass = `message ${isSender ? 'sender' : 'receiver'}`;
    const dotsClass = `dots ${isSender ? 'dots-sender' : 'dots-receiver'}`;
    const menuClass = `menu ${isSender ? 'menu-sender' : 'menu-receiver'}`;

    const handleDelete = () => {
        onDeleteMessage(messageId);
    };

    const handleSaveMsg = ()=>{
        onSaved(messageId);
        closeMenu()
    }

    return (
        <div
            className={messageClass}
            onMouseEnter={() => setShowDots(true)}
            ref={messageRef}
        >
            <div className="message-content">{text}</div>
            <div className="message-info">
                <div className={`message-time ${isSender ? 'sender' : 'receiver'}`}>{timeSent}</div>
                {isSender && (
                    <div className="message-status check-icon">
                        {seen ? <BsCheck2All />: <BsCheck2 />
                        }
                    </div>
                )}
            </div>
            {showDots && (
                <div className={dotsClass} onClick={toggleMenu}>
                    ...
                </div>
            )}
            {showMenu && (
                <div className={menuClass}>
                    <div className="reactions">
                        <span>👍</span>
                        <span>❤️</span>
                        <span>😂</span>
                        <span>😮</span>
                        <span>😢</span>
                    </div>
                    <div className="options">
                        <div><RiArrowGoForwardLine className='icon'/>Replay</div>
                        <div><PiStarLight className='icon'/>Pin</div>
                        {isSender && <div><BiEdit className='icon'/>Edit</div>}
                        <div onClick={handleSaveMsg}><IoBookmarksOutline className='icon'/>Save</div>
                        <div onClick={handleDelete}> <TbTrash className='icon'/>Delete</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Message;
