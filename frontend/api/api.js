export const API_URL = 'http://192.168.0.71:8000';

export const fetchContacts = async () => {
  try {
    const response = await fetch(`${API_URL}/contacts/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};