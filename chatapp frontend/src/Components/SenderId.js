import { createContext, useState } from 'react';

const SenderContext = createContext();

const SenderProvider = ({ children }) => {
  const [sender, setSender] = useState(null);

  return (
    <SenderContext.Provider value={{ sender, setSender }}>
      {children}
    </SenderContext.Provider>
  );
};

export { SenderProvider, SenderContext };