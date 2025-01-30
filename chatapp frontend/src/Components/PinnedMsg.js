import React from 'react';
import { CiStar } from "react-icons/ci";
import '../CssFiles/PinnedMsg.css';

const PinnedMessage = ({ pinnedBy, pinnedMessage }) => {
    return (
        <div className="pinned-message-container">
            <div className="pinned-message-header">
                <span><CiStar className='star-icon'/></span>
                <span className="pinned-by">{pinnedBy}</span>
                <span className="pinned-message-content"> Pined {pinnedMessage}</span>
            </div>
        </div>
    );
};

export default PinnedMessage;
