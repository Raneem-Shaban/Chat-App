import React, { useState } from 'react';
import '../CssFiles/MessageInput.css';

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            onSendMessage(message);
            setMessage(''); // Clear the input after sending
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="message-input-container">
            <input
                type="text"
                className="message-input"
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
            />
            <button className="send-button" onClick={handleSendMessage}>
                &#10148;
            </button>
        </div>
    );
};

export default MessageInput;
