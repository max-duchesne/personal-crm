import React, { useContext } from 'react';
import { SafeAreaView, View, SectionList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ContactContext } from '../context/ContactContext';

export default function ContactList({ navigation }) {
  const { contacts } = useContext(ContactContext);

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={contacts}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { contact: item })}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.first_name} {item.last_name}</Text>
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
  },
  title: {
    fontSize: 24,
  },
});