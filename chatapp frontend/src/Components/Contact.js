import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Contact = ({ img,name,msg, date, isOnline, hasUnread,onClick }) => {
    let msgText = msg.length > (hasUnread ? 22 : 26) ? `${msg.slice(0, hasUnread ? 22 : 26)}...` : msg;

    let timeDiff = (new Date() - new Date(date)) / 3600000;
    let timeText = `${Math.floor(timeDiff)}h`;

    const contactMsgInfoClass = classNames('w-80', {
        'w-70': hasUnread,
    });

    return (
        <div className='w-full min-h-[17%] max-h-[300px] mt-1 flex items-center justify-between pl-5 pr-5 bg-[#FCFCFC] hover:bg-opacity-10 hover:bg-teal-400 focus:bg-opacity-10 focus:bg-teal-400'
        onClick={onClick}>
            <div className='relative inline-block'>
                <img src={img} alt='' className='w-16 h-16'></img>
                <span className={`status w-4 h-4 rounded-full border-2 absolute bottom-0 right-0 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            </div>
            <div className={contactMsgInfoClass}>
                <p className='text-xl font-semibold pl-3'>{name}</p>
                <span className='text-base text-gray-500 pl-3'>{msgText} .{timeText}</span>
            </div>
            {hasUnread && <div className='w-[10%]'><div className='w-4 h-4 bg-red-500 rounded-full aspect-w-1 aspect-h-1'></div></div>}
        </div>
    );
}

Contact.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    isOnline: PropTypes.bool,
    hasUnread: PropTypes.bool,
};

export default Contact;
