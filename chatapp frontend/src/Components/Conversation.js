import React, { useEffect, useState, useContext } from 'react';
import Contact from './Contact';
import { TokenContext } from './TokenContext';
import { ConversationContext } from './ConversationToken';
import { ReciverContext } from './ReciverId';
import { SenderContext } from './SenderId';
import { useNavigate } from "react-router-dom";

const Conversation = () => {
    const [contacts, setContacts] = useState([]);
    const  sessionToken  = useContext(TokenContext);
    const  { setConversationId}  = useContext(ConversationContext);
    const  { setReciver}  = useContext(ReciverContext);
    const  { setSender}  = useContext(SenderContext);
    const  sender  = useContext(SenderContext);
    console.log(sender.sender)
    const navigate = useNavigate();

    console.log(sessionToken.token);
    function setConversation (convId , reciver , sender){
        setConversationId(convId)
        setReciver(reciver)
        setSender(sender)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/functions/getConversations', {
                    method: 'POST',
                    headers: {
                        'X-Parse-Application-Id': 'appId',
                        'X-Parse-REST-API-Key': 'restAPIKey',
                        'X-Parse-Session-Token': sessionToken.token
                    }
                });

                const data = await response.json();
                console.log(data);
                const userArray = data.result.userArray.map((item) => ({
                    img: '40px.svg',
                    name : sender.sender !== item.id.users[0].objectId ? item.id.users[0].username : item.id.users[1].username,
                    conversation: item.id.objectId,
                    reciver: item.id.users[0].objectId !== sender.sender? item.id.users[0].objectId : item.id.users[1].objectId,
                    sender: item.id.users[0].objectId === sender.sender? item.id.users[0].objectId : item.id.users[1].objectId,
                    msg: item.message.text,
                    date: new Date(item.message.createdAt),
                    isOnline: true,
                    hasUnread: true
                }));

                setContacts(userArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [sessionToken.token]);


    

    return (
        <div className='w-full h-full overflow-x-hidden overflow-y-auto text-justify pt-2 bg-[#FCFCFC] custom-scroll'>
            {contacts.map((contact, index) => (
                <Contact
                    key={`${contact.name}-${contact.date}`}
                    img={`./assets/${contact.img}`}
                    name={contact.name}
                    msg={contact.msg}
                    date={contact.date}
                    isOnline={contact.isOnline}
                    hasUnread={contact.hasUnread}
                    onClick={() => setConversation(contact.conversation,contact.reciver,contact.sender)}
                />
            ))}
        </div>
    );
};

export default Conversation;
