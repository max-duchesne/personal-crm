import React from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

export default function ContactList(props) {
  const { contacts } = props;

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.first_name} {item.last_name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={Item}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'grey',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 32,
  },
});