import { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isEdit, setIsEdit] = useState(false);

  const [transaction, setTransaction] = useState({
    amount: '',
    category: '',
    date: '',
  });

  return (
    <Context.Provider
      value={{
        transaction,
        setTransaction,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </Context.Provider>
  );
};
