import React from 'react';
import { SafeAreaView, View, SectionList, StyleSheet, Text } from 'react-native';

export default function ContactList(props) {
  const { contacts } = props;

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={contacts}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.first_name} {item.last_name}</Text>
          </View>
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