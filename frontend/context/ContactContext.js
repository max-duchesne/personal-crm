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

  const addContact = (newContact) => {
    setContacts(prevContacts => {
      const title = newContact.last_name[0].toUpperCase();
      let group = prevContacts.find(item => item.title === title);
  
      if (!group) {
        group = { title, data: [] };
        prevContacts.push(group);
      }
  
      group.data.push(newContact);
  
      group.data.sort((a, b) => {
        const lastNameComparison = a.last_name.localeCompare(b.last_name);
        if (lastNameComparison !== 0) return lastNameComparison;
        return a.first_name.localeCompare(b.first_name);
      });
  
      return [...prevContacts];
    });
  };

  const updateContact = (updatedContact) => {
    setContacts(prevContacts => {
      const updatedContacts = prevContacts.map(group => {
        if (!Array.isArray(group.data)) {
          return group;
        }
  
        const updatedData = group.data.map(contact => {
          if (contact.id === updatedContact.id) {
            return updatedContact;
          }
          return contact;
        });
  
        return { ...group, data: updatedData };
      });
      return updatedContacts;
    });
  };

  const deleteContact = (idToDelete) => {
    setContacts(prevContacts => {
      const updatedContacts = prevContacts.map(group => {
        if (!Array.isArray(group.data)) {
          return group;
        }
  
        const updatedData = group.data.filter(contact => contact.id !== idToDelete);
        return { ...group, data: updatedData };
      }).filter(group => group.data.length > 0);
      return updatedContacts;
    });
  };  

  return (
    <ContactContext.Provider value={{ contacts, addContact, updateContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};