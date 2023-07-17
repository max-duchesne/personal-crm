//imports needed for this component file
import React, { useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function DetailScreen() {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
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
});