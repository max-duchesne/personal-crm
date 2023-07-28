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

export const createContact = async (newContact) => {
  const token = await getAccessToken();
  
  const response = await fetch(`${API_URL}/contacts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(newContact)
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error('Failed to create new contact');
};

export const updateContact = async (updatedContact) => {
  const token = await getAccessToken();
  
  const response = await fetch(`${API_URL}/contacts/${updatedContact.id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updatedContact)
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error('Failed to update contact');
};

export const deleteContact = async (id) => {
  const token = await getAccessToken();

  const response = await fetch(`${API_URL}/contacts/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete contact');
  }
};

export const createInteraction = async (newInteraction) => {
  const token = await getAccessToken();
  
  const response = await fetch(`${API_URL}/interactions/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(newInteraction)
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error('Failed to create new interaction');
};