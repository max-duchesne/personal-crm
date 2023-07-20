import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { API_URL } from '../api/api';
import { ContactContext } from '../context/ContactContext';

export default function CreateContactScreen() {
  const { addContact } = useContext(ContactContext);
  const [newContact, setNewContact] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    notes: '',
    company: '',
    title: '',
    birthday: '',
    linkedin: '',
  });

  const handleChange = (fieldName, value) => {
    setNewContact((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleCreateContact = async () => {
    try {
      const formattedFirstName = newContact.first_name ? newContact.first_name[0].toUpperCase() + newContact.first_name.slice(1) : '';
      const formattedLastName = newContact.last_name[0].toUpperCase() + newContact.last_name.slice(1);
      const formattedBirthday = newContact.birthday === '' ? null : newContact.birthday;
      const formattedContact = { ...newContact, first_name: formattedFirstName, last_name: formattedLastName, birthday: formattedBirthday };

      const response = await fetch(`${API_URL}/contacts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedContact),
      });

      if (!response.ok) {
        throw new Error('Failed to create new contact');
      }

      const createdContact = await response.json();
      addContact(createdContact);
      console.log('New contact created successfully');
    } catch (error) {
      console.error('Error creating new contact:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={newContact.first_name}
        onChangeText={(value) => handleChange('first_name', value)}
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={newContact.last_name}
        onChangeText={(value) => handleChange('last_name', value)}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={newContact.email}
        onChangeText={(value) => handleChange('email', value)}
      />

      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={newContact.phone}
        onChangeText={(value) => handleChange('phone', value)}
      />

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={newContact.address}
        onChangeText={(value) => handleChange('address', value)}
      />

      <Text style={styles.label}>Bio:</Text>
      <TextInput
        style={styles.input}
        value={newContact.bio}
        onChangeText={(value) => handleChange('bio', value)}
      />

      <Text style={styles.label}>Notes:</Text>
      <TextInput
        style={styles.input}
        value={newContact.notes}
        onChangeText={(value) => handleChange('notes', value)}
      />

      <Text style={styles.label}>Company:</Text>
      <TextInput
        style={styles.input}
        value={newContact.company}
        onChangeText={(value) => handleChange('company', value)}
      />

      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={newContact.title}
        onChangeText={(value) => handleChange('title', value)}
      />

      <Text style={styles.label}>Birthday:</Text>
      <TextInput
        style={styles.input}
        value={newContact.birthday}
        onChangeText={(value) => handleChange('birthday', value)}
      />

      <Text style={styles.label}>LinkedIn:</Text>
      <TextInput
        style={styles.input}
        value={newContact.linkedin}
        onChangeText={(value) => handleChange('linkedin', value)}
      />

      <Button title="Create Contact" onPress={handleCreateContact} />
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
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});