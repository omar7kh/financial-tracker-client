import { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [transaction, setTransaction] = useState({
    amount: '',
    category: '',
    date: '',
  });
  const [isPopUp, setIsPopUp] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [popUpText, setPopUpText] = useState('');

  return (
    <Context.Provider
      value={{
        transaction,
        setTransaction,
        isEdit,
        setIsEdit,
        isPopUp,
        setIsPopUp,
        isDeleteConfirm,
        setIsDeleteConfirm,
        popUpText,
        setPopUpText,
      }}
    >
      {children}
    </Context.Provider>
  );
};
