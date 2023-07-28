import { getAccessToken, refreshAccessToken } from './auth';

export const API_URL = 'http://192.168.0.71:8000/api';

export const fetchContacts = async () => {
  try {
    let token = await getAccessToken();

    let response = await fetch(`${API_URL}/contacts/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.status === 401) {
      token = await refreshAccessToken();
      response = await fetch(`${API_URL}/contacts/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};