import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';

import { ContactProvider } from './context/ContactContext';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import CreateContactScreen from './screens/CreateContactScreen';
import CreateInteractionScreen from './screens/CreateInteractionScreen';

const Stack = createNativeStackNavigator();

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
    text: '#ffffff',
  },
};

export default function App() {
  return (
    <ContactProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailScreen} />
            <Stack.Screen name="CreateContact" component={CreateContactScreen} />
            <Stack.Screen name="CreateInteraction" component={CreateInteractionScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ContactProvider>
  );
}