import { createContext, useState, useContext, useEffect } from 'react';
import { fetchContacts } from "../api/api";
import { AuthContext } from './AuthContext';

export const ContactContext = createContext({
  contacts: [],
  updateContacts: () => {},
});

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      fetchContacts()
        .then(data => {
          setContacts(data);
        })
        .catch(error => {
          console.error('Error fetching contacts:', error);
        });
    }
  }, [isLoggedIn]);

  const binarySearch = (arr, x, start, end) => {
    if (start > end) return start;
 
    let mid=Math.floor((start + end)/2);
 
    if (arr[mid].title === x) return mid;
 
    if(arr[mid].title > x) return binarySearch(arr, x, start, mid - 1);
    else return binarySearch(arr, x, mid + 1, end);
}

const addContact = (newContact) => {
  setContacts(prevContacts => {
    let title;
    if (newContact.last_name) {
      title = newContact.last_name[0].toUpperCase();
    } else {
      title = newContact.first_name[0].toUpperCase();
    }

    let group = prevContacts.find(item => item.title === title);

    if (!group) {
      group = { title, data: [newContact] };
      const index = binarySearch(prevContacts, title, 0, prevContacts.length - 1);
      prevContacts.splice(index, 0, group);
    } else {
      group.data.push(newContact);

      group.data.sort((a, b) => {
        let nameA = a.last_name ? a.last_name : a.first_name;
        let nameB = b.last_name ? b.last_name : b.first_name;
        
        const nameComparison = nameA.localeCompare(nameB);
        if (nameComparison !== 0) return nameComparison;
        return a.first_name.localeCompare(b.first_name);
      });
    }
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

  const addInteraction = (newInteraction, contactId) => {
    setContacts(prevContacts => {
      const updatedContacts = prevContacts.map(group => {
        if (!Array.isArray(group.data)) {
          return group;
        }
  
        const updatedData = group.data.map(contact => {
          if (contact.id === contactId) {
            return {
              ...contact,
              interactions: [...contact.interactions, newInteraction],
            };
          }
          return contact;
        });
  
        return { ...group, data: updatedData };
      });
      return updatedContacts;
    });
  };  

  return (
    <ContactContext.Provider value={{ contacts, addContact, updateContact, deleteContact, addInteraction }}>
      {children}
    </ContactContext.Provider>
  );
};