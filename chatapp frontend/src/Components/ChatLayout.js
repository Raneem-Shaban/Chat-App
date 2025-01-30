import React, { useState, useEffect,useContext } from 'react';
import '../CssFiles/ChatLayout.css';
import MessageHeader from './MessageHeader';
import Message from './Message';
import PinnedMessage from './PinnedMsg';
import MessageInput from './MessageInput';
import { ConversationContext } from './ConversationToken';
import { TokenContext } from './TokenContext';
import { ReciverContext } from './ReciverId';
import { SenderContext } from './SenderId';

function ChatLayout() {
  const conversationId = useContext(ConversationContext)
  const  sessionToken  = useContext(TokenContext);
  const  recivedId  = useContext(ReciverContext);
  const  senderId  = useContext(SenderContext);
  const [messages, setMessages] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const [pinnedMessage, setPinnedMessage] = useState(null);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const headers = {
          'X-Parse-Application-Id': 'appId',
          'X-Parse-REST-API-Key': 'restAPIKey',
          'X-Parse-Session-Token': sessionToken.token,
        };

        const body = JSON.stringify({
          conversation: conversationId.conversationId ,
        });

        const response = await fetch('http://localhost:1337/api/functions/getMsgs', {
          method: 'POST',
          headers,
          body,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMessages(data.result);

      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [refresh , conversationId.conversationId]);

  useEffect(() => {
    const fetchPinnedMsg = async()=>{
      try{
        const headers = {
          'X-Parse-Application-Id': 'appId',
          'X-Parse-REST-API-Key': 'restAPIKey',
          'X-Parse-Session-Token': sessionToken.token,
        };

        const body = JSON.stringify({
          conversation: conversationId.conversationId,
        });

        const response = await fetch('http://localhost:1337/api/functions/getPinnedMsg', {
          method: 'POST',
          headers,
          body,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPinnedMessage(data.result);

      } catch (error) {
        console.error('Error fetching pinned messages:', error);
      }
    };
    fetchPinnedMsg();
  }, [refresh,conversationId.conversationId]);

  const currentUser = senderId.sender; // The current logged in user
  const sendTo = recivedId.reciver
  console.log(currentUser , sendTo)

  const user = {
    profileImage: 'gojo.jpg',
    isOnline: true,
    username: 'John Doe',
    status: 'Online', // can be 'online', 'last seen at...', 'is typing...'
  };



  const handleSendMessage = async (messageText) => {
    const newMessage = {
      text: messageText,
      reciver: {
        __type: "Pointer",
        className: "_User",
        objectId: sendTo,
      },
      isDeleted: false,
      createdAt: new Date().toISOString(), // For immediate UI feedback
    };

    try {
      const headers = {
        'X-Parse-Application-Id': 'appId',
        'X-Parse-REST-API-Key': 'restAPIKey',
        'X-Parse-Session-Token': sessionToken.token,
      };

      const body = JSON.stringify(newMessage);

      const response = await fetch('http://localhost:1337/api/classes/Msg', {
        method: 'POST',
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setRefresh(refresh + 1)
      // Update the local state to include the new message
      setMessages((prevMessages) => [...prevMessages, data]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const headers = {
        'X-Parse-Application-Id': 'appId',
        'X-Parse-REST-API-Key': 'restAPIKey',
        'X-Parse-Session-Token': sessionToken.token,
      };
      const body = JSON.stringify({ msg: messageId });
      const response = await fetch('http://localhost:1337/api/functions/deleteMsg', {
        method: 'POST',
        headers,
        body,
      });
      const data = await response.json();
      console.log(data);

      // Update the local state to remove the deleted message
      setRefresh(refresh + 1)

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }

  const handleSavedMessage = async (messageId) => {
    try {
      const headers = {
        'X-Parse-Application-Id': 'appId',
        'X-Parse-REST-API-Key': 'restAPIKey',
        'X-Parse-Session-Token': sessionToken.token,
      };
      const body = JSON.stringify({ msg: messageId });
      const response = await fetch('http://localhost:1337/api/functions/saveMsg', {
        method: 'POST',
        headers,
        body,
      });
      const data = await response.json();
      console.log(data);

      // Update the local state to remove the deleted message
      setRefresh(refresh + 1)

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error Saving message:', error);
    }
  }
  return (
    <div className='ChatLayout_container'>
{conversationId.conversationId !== undefined && (
      <>
        <MessageHeader user={user} />
        {pinnedMessage && (
          <PinnedMessage pinnedBy={pinnedMessage.pinnedBy} pinnedMessage={pinnedMessage.text} />
        )}
        <div className="message-list">
          {messages.map((msg) => (
            msg.objectId && msg.reciver && msg.reciver.objectId? (
              <Message
                key={msg.objectId}
                messageId={msg.objectId}
                text={msg.text}
                timeSent={new Date(msg.createdAt).toLocaleTimeString()}
                reciver={msg.reciver.objectId}
                currentUser={currentUser}
                seen={msg.issen}
                onDeleteMessage={handleDeleteMessage}
                onSaved={handleSavedMessage}
              />
            ) : null // Skip rendering this message if required fields are missing
          ))}
        </div>
        <div className='SendMsg_container'>
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </>
    )}
    </div>
  );
}

export default ChatLayout;
