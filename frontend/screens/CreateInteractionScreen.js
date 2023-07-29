import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, Picker } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { API_URL, createInteraction as apiCreateInteraction } from '../api/api';
import { ContactContext } from '../context/ContactContext';

export default function CreateInteractionScreen({ navigation }) {
  const { contacts, addInteraction } = useContext(ContactContext);
  const { colors } = useTheme();
  const INTERACTION_CHOICES = [
    {label: 'Email', value: 'email'},
    {label: 'Phone call', value: 'call'},
    {label: 'Text message', value: 'text'},
    {label: 'In person meeting', value: 'meeting_in_person'},
    {label: 'Virtual meeting', value: 'meeting_virtual'},
    {label: 'Other', value: 'other'},
  ];
  const [newInteraction, setNewInteraction] = useState({
    title: '',
    contact: '',
    interaction_type: 'other',
    interaction_date: '',
    interaction_location: '',
    notes: '',
  });

  const handleChange = (fieldName, value) => {
    setNewInteraction((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleCreateInteraction = async () => {
    try {
      const fullName = newInteraction.contact.split(' ');
      const [firstName, lastName] = fullName;
      let target;
  
      for (let i = 0; i < contacts.length; i++) {
        target = contacts[i].data.find(target => 
          target.first_name.toLowerCase() === firstName.toLowerCase() && 
          target.last_name.toLowerCase() === lastName.toLowerCase()
        );
        if (target) break;
      }
  
      if (!target) {
        console.error('Error creating new interaction: Invalid contact name');
        return;
      }
  
      const formattedContact = `${API_URL}/contacts/${target.id}/`;
      const formattedDate = newInteraction.interaction_date === '' ? null : newInteraction.interaction_date;
      const formattedInteraction = { ...newInteraction, contact: formattedContact, interaction_date: formattedDate };
  
      const createdInteraction = await apiCreateInteraction(formattedInteraction);
  
      addInteraction(createdInteraction, target.id);
      console.log('New interaction created successfully');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error creating new interaction:', error);
    }
  };  

  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor: colors.background}]}>

      <Text style={[styles.label, {color: colors.text}]}>Title:</Text>
      <TextInput
        style={styles.input}
        value={newInteraction.title}
        onChangeText={(value) => handleChange('title', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Contact:</Text>
      <TextInput
        style={styles.input}
        value={newInteraction.contact}
        onChangeText={(value) => handleChange('contact', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Interaction Type:</Text>
      <Picker
        selectedValue={newInteraction.interaction_type}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => handleChange('interaction_type', itemValue)}>
        {INTERACTION_CHOICES.map((choice, index) => (
          <Picker.Item label={choice.label} value={choice.value} key={index} />
        ))}
      </Picker>

      <Text style={[styles.label, {color: colors.text}]}>Interaction Date:</Text>
      <TextInput
        style={styles.input}
        value={newInteraction.interaction_date}
        onChangeText={(value) => handleChange('interaction_date', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Interaction Location:</Text>
      <TextInput
        style={styles.input}
        value={newInteraction.interaction_location}
        onChangeText={(value) => handleChange('interaction_location', value)}
      />

      <Text style={[styles.label, {color: colors.text}]}>Notes:</Text>
      <TextInput
        style={styles.input}
        value={newInteraction.notes}
        onChangeText={(value) => handleChange('notes', value)}
      />

      <Button mode="contained" onPress={handleCreateInteraction} style={styles.button}>
        Create Interaction
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