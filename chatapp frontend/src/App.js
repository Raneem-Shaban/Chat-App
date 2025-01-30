import './App.css';
import './index.css'
import Signpass from './Components/Signpass'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TokenProvider  } from './Components/TokenContext';
import {  ConversationProvider } from './Components/ConversationToken';
import {  ReciverProvider } from './Components/ReciverId';
import {  SenderProvider } from './Components/SenderId';
import Data from './Components/Data';
import ChatPage from './Page/ChatPage';

function App() {
  return (
    <TokenProvider>
      <ConversationProvider>
        <SenderProvider>
          <ReciverProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Signpass />} />
                <Route path='/Data' element={<Data />} />
                <Route path='/Homepage' element={<ChatPage />} />
              </Routes>
            </BrowserRouter>
          </ReciverProvider>
        </SenderProvider>
      </ConversationProvider>
    </TokenProvider>
  );
}

export default App;