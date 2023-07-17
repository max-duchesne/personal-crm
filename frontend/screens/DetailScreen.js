import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailScreen({ route }) {
  const { contact } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{contact.first_name} {contact.last_name}</Text>
      <Text style={styles.details}>{contact.address}</Text>
      <Text style={styles.details}>{contact.birthday}</Text>
      <Text style={styles.details}>Add all the other details here</Text>
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