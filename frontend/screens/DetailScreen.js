import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { API_URL } from '../api/api';
import { ContactContext } from '../context/ContactContext';

export default function DetailScreen({ route, navigation }) {
  const { contact } = route.params;
  const { colors } = useTheme();
  const { updateContact, deleteContact } = useContext(ContactContext);
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

      updateContact(formattedContact);
    } catch (error) {
      console.error('Error updating contact details:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/contacts/${contact.id}/`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
  
      console.log('Contact deleted successfully');
      deleteContact(contact.id);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor: colors.background}]}>

      <Text style={[styles.label, {color: colors.text}]}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.first_name}
        onChangeText={(value) => handleChange('first_name', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.last_name}
        onChangeText={(value) => handleChange('last_name', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Email:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.email}
        onChangeText={(value) => handleChange('email', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.phone}
        onChangeText={(value) => handleChange('phone', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Address:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.address}
        onChangeText={(value) => handleChange('address', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Bio:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.bio}
        onChangeText={(value) => handleChange('bio', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Notes:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.notes}
        onChangeText={(value) => handleChange('notes', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Company:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.company}
        onChangeText={(value) => handleChange('company', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Title:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.title}
        onChangeText={(value) => handleChange('title', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Birthday:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.birthday}
        onChangeText={(value) => handleChange('birthday', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>LinkedIn:</Text>
      <TextInput
        style={styles.input}
        value={updatedContact.linkedin}
        onChangeText={(value) => handleChange('linkedin', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Interactions:</Text>
      {Array.isArray(contact.interactions) && contact.interactions.map((interaction, index) => (
        <ScrollView key={index} style={[styles.interactionContainer, {backgroundColor: colors.surface}]}>
          <Text style={[styles.label, {color: colors.text}]}>Interaction {index + 1}:</Text>
          <Text style={[styles.label, {color: colors.text}]}>Title: {interaction.title}</Text>
          <Text style={[styles.label, {color: colors.text}]}>Type: {interaction.interaction_type}</Text>
          <Text style={[styles.label, {color: colors.text}]}>Date: {interaction.interaction_date}</Text>
          <Text style={[styles.label, {color: colors.text}]}>Location: {interaction.interaction_location}</Text>
          <Text style={[styles.label, {color: colors.text}]}>Notes: {interaction.notes}</Text>
        </ScrollView>
      ))}

      <Button mode="contained" onPress={handleUpdate} style={styles.button}>
        Update
      </Button>
      
      <Button mode="contained" onPress={handleDelete} style={[styles.button, {backgroundColor: colors.error}]}>
        Delete
      </Button>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    marginVertical: 10,
  },
});