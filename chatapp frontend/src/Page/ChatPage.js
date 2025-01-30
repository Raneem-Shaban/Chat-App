import React,{useContext} from 'react'
import '../CssFiles/ChatPage.css'
import ChatLayout from '../Components/ChatLayout'
import ContactsLayout from '../Components/ContactsLayout'
import { TokenContext  } from '../Components/TokenContext';

function ChatPage() {
  const  setToken  = useContext(TokenContext);
  console.log(setToken.token)
  return (
    <div className='container'>
      <ContactsLayout/>
      <div className='rightSide'>
        <ChatLayout/>
      </div>
    </div>
  )
}

export default ChatPage
