import React, { useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ContactContext } from '../context/ContactContext';
import ContactList from '../components/ContactList';

export default function HomeScreen({ navigation }) {
  const { contacts, updateContacts } = useContext(ContactContext);

  if (!contacts|| contacts.length === 0) {
    return <Text>No contacts to show</Text>;
  }

  return (
    <View style={styles.container}>
      <ContactList navigation={navigation}/>
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