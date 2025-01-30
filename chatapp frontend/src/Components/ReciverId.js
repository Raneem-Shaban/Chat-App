import { createContext, useState } from 'react';

const ReciverContext = createContext();

const ReciverProvider = ({ children }) => {
  const [reciver, setReciver] = useState(null);

  return (
    <ReciverContext.Provider value={{ reciver, setReciver }}>
      {children}
    </ReciverContext.Provider>
  );
};

export { ReciverProvider, ReciverContext   };