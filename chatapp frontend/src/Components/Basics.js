import React, { useState, useContext } from 'react';
import { TokenContext } from './TokenContext';
import { SenderContext } from './SenderId';
import SavedMessages from './SavedMessages'; 

const Basics = () => {
    const  sessionToken  = useContext(TokenContext);
    const  sender  = useContext(SenderContext);
    
    const [savedMessages, setSavedMessages] = useState([]);
    const [isSavedMessagesVisible, setIsSavedMessagesVisible] = useState(false);

    const fetchSavedMessages = async () => {
        try {
            const response = await fetch('http://localhost:1337/api/functions/getSavedMsg', {
                method: 'POST',
                headers: {
                    'X-Parse-Application-Id': 'appId',
                    'X-Parse-REST-API-Key': 'restAPIKey',
                    'X-Parse-Session-Token': sessionToken.token,
                }
            });
            const data = await response.json();
            console.log(data);
            const texts = data.result.map(msg => msg.text);
            setSavedMessages(texts);
            setIsSavedMessagesVisible(true);
        } catch (error) {
            console.error('Error fetching saved messages:', error);
        }
    };

    return (
        <div className='w-[425px] h-[22%] flex flex-col items-start justify-between px-2.5 mt-5'>
            <p className='text-[20px] font-semibold'>Basics</p>
            <button
                className='w-full h-[37%] shadow-md border-none rounded-[15px] bg-white flex flex-row items-center justify-between'
                onClick={fetchSavedMessages}
            >
                <img className='w-[20px] h-[20px] ml-3' src='./assets/save.svg' alt=''></img>
                <div className='w-[80%] flex items-center justify-start text-[22px] font-normal'>
                    <p>Saved Messages</p>
                </div>
                <img className='w-[16px] h-[16px] mr-3' src='./assets/left-arrow.svg' alt=''></img>
            </button>
            <button className='w-full h-[37%] shadow-md border-none rounded-[15px] bg-white flex flex-row items-center justify-between'>
                <img className='w-[20px] h-[20px] ml-3' src='./assets/star.svg' alt=''></img>
                <div className='w-[80%] flex items-center justify-start text-[22px] font-normal'>
                    <p>Pinned Messages</p>
                </div>
                <img className='w-[16px] h-[16px] mr-3' src='./assets/left-arrow.svg' alt=''></img>
            </button>
            {isSavedMessagesVisible && <SavedMessages savedMessages={savedMessages} />}
        </div>
    );
};

export default Basics;
