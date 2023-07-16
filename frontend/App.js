import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import ContactList from './components/ContactList';
import { fetchContacts } from './api/api';

export default function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts()
      .then(data => setContacts(data))
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, []);
  
  return (
    <View style={styles.container}>
      <ContactList contacts={contacts}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});