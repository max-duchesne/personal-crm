import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ContactProvider } from './context/ContactContext';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import CreateContactScreen from './screens/CreateContactScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContactProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailScreen} />
          <Stack.Screen name="Create" component={CreateContactScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContactProvider>
  );
}