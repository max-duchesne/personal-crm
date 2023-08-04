import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { ContactContext } from '../context/ContactContext';
import { importContacts } from '../api/nativeContacts';
import ContactList from '../components/ContactList';

export default function HomeScreen({ navigation }) {
  const { contacts, refreshContacts } = useContext(ContactContext);
  const { colors } = useTheme();

  const handleImportContacts = async () => {
    try {
      await importContacts();
      refreshContacts();
    } catch (error) {
      console.error('Error importing contacts:', error);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <ContactList navigation={navigation}/>
      <Button mode="contained" onPress={() => navigation.navigate('CreateContact')} style={styles.button}>
        Create Contact
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('CreateInteraction')} style={styles.button}>
        Create Interaction
      </Button>
      <Button mode="contained" onPress={handleImportContacts} style={styles.button}>
        Import Contacts
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
  },
});