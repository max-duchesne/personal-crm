import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './api';

export const authenticate = async (username, password) => {
  const response = await fetch(`${API_URL}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    })
  });

  const { access, refresh } = await response.json();

  await AsyncStorage.setItem('access_token', access);
  await AsyncStorage.setItem('refresh_token', refresh);
};

export const getAccessToken = async () => {
  return AsyncStorage.getItem('access_token');
};

export const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refresh_token');

  const response = await fetch(`${API_URL}/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });

  if (response.ok) {
    const { access } = await response.json();
    await AsyncStorage.setItem('access_token', access);
    return access;
  }

  throw new Error('Unable to refresh access token');
};