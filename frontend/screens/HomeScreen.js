import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { ContactContext } from '../context/ContactContext';
import ContactList from '../components/ContactList';

export default function HomeScreen({ navigation }) {
  const { contacts } = useContext(ContactContext);
  const { colors } = useTheme();

  if (!contacts|| contacts.length === 0) {
    return <Text>No contacts to show</Text>;
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <ContactList navigation={navigation}/>
      <Button mode="contained" onPress={() => navigation.navigate('Create')} style={styles.button}>
        Create Contact
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
  },
});