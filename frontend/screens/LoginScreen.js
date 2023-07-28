import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, useTheme } from 'react-native-paper';
import { authenticate } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { logIn } = useContext(AuthContext);
  const { colors } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await authenticate(username, password);
      logIn();
      navigation.navigate('Home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={[styles.input, { backgroundColor: colors.surface, color: colors.text }]}
      />
      <TextInput
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={[styles.input, { backgroundColor: colors.surface, color: colors.text }]}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
      <Button mode="contained" onPress={handleLogin} style={[styles.button, { backgroundColor: colors.primary }]}>
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    marginVertical: 10,
  },
});