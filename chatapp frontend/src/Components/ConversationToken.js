import { createContext, useState } from 'react';
const ConversationContext = createContext();

const ConversationProvider = ({ children }) => {
  const [conversationId, setConversationId] = useState(null);

  return (
    <ConversationContext.Provider value={{ conversationId, setConversationId }}>
      {children}
    </ConversationContext.Provider>
  );
};
export { ConversationProvider ,ConversationContext   };
