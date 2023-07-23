import React, { useContext } from 'react';
import { SafeAreaView, View, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ContactContext } from '../context/ContactContext';

export default function ContactList({ navigation }) {
  const { contacts } = useContext(ContactContext);
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <SectionList
        sections={contacts}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { contact: item })}>
            <View style={[styles.item, {backgroundColor: colors.surface}]}>
              <Text style={[styles.title, {color: colors.text}]}>{item.first_name} {item.last_name}</Text>
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={[styles.header, {backgroundColor: colors.primary, color: colors.onPrimary}]}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    padding: 10,
  },
  title: {
    fontSize: 24,
  },
});