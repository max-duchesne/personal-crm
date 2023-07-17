import { createContext, useState, useEffect } from 'react';
import { fetchContacts } from "../api/api";

export const ContactContext = createContext([]);

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts()
      .then(data => {
        setContacts(data);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, []);

  return (
    <ContactContext.Provider value={contacts}>
      {children}
    </ContactContext.Provider>
  );
};