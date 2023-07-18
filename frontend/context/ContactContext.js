import { createContext, useState, useEffect } from 'react';
import { fetchContacts } from "../api/api";

export const ContactContext = createContext({
  contacts: [],
  updateContacts: () => {},
});

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

  const updateContacts = (updatedContact) => {
    setContacts(prevContacts => {
      const updatedContacts = prevContacts.map(contact => {
        if (contact.id === updatedContact.id) {
          return updatedContact;
        }
        return contact;
      });
      return updatedContacts;
    });
  };

  return (
    <ContactContext.Provider value={{ contacts, updateContacts }}>
      {children}
    </ContactContext.Provider>
  );
};