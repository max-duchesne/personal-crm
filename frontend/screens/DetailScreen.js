import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { API_URL } from '../api/api';

export default function DetailScreen({ route }) {
  const { contact } = route.params;
  const [updatedContact, setUpdatedContact] = useState({
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone: contact.phone,
    address: contact.address,
    bio: contact.bio,
    notes: contact.notes,
    company: contact.company,
    title: contact.title,
    birthday: contact.birthday ? contact.birthday.toString() : '',
    linkedin: contact.linkedin,
  });

  const handleChange = (fieldName, value) => {
    setUpdatedContact((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const formattedBirthday = updatedContact.birthday === '' ? null : updatedContact.birthday;
      const formattedContact = { ...updatedContact, birthday: formattedBirthday };

      const response = await fetch(`${API_URL}/contacts/${contact.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedContact),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update contact details');
      }
  
      console.log('Contact details updated successfully');
    } catch (error) {
      console.error('Error updating contact details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.first_name}
        onChangeText={(value) => handleChange('first_name', value)}
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.last_name}
        onChangeText={(value) => handleChange('last_name', value)}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.email}
        onChangeText={(value) => handleChange('email', value)}
      />

      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.phone}
        onChangeText={(value) => handleChange('phone', value)}
      />

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.address}
        onChangeText={(value) => handleChange('address', value)}
      />

      <Text style={styles.label}>Bio:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.bio}
        onChangeText={(value) => handleChange('bio', value)}
      />

      <Text style={styles.label}>Notes:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.notes}
        onChangeText={(value) => handleChange('notes', value)}
      />

      <Text style={styles.label}>Company:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.company}
        onChangeText={(value) => handleChange('company', value)}
      />

      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.title}
        onChangeText={(value) => handleChange('title', value)}
      />

      <Text style={styles.label}>Birthday:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.birthday}
        onChangeText={(value) => handleChange('birthday', value)}
      />

      <Text style={styles.label}>LinkedIn:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.linkedin}
        onChangeText={(value) => handleChange('linkedin', value)}
      />

      <Button title="Update" onPress={handleUpdate} />
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
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  details: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
});