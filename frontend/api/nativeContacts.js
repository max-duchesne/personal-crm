import * as Contacts from 'expo-contacts';
import { API_URL } from './api';

const formatPhoneNumber = (phoneNumberObj) => {
  //console.log(phoneNumberObj);
  if (!phoneNumberObj) return '';
  const { digits } = phoneNumberObj;
  console.log('digits:', digits);
  return digits;
};

const formatAddress = (addressObj) => {
  if (!addressObj) return '';
  const { street, city, region, postalCode, country, id, name } = addressObj;
  return `${name || ''} ${street || ''} ${city || ''} ${region || ''} ${postalCode || ''} ${country || ''}`;
};

export const importContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();

  if (status !== 'granted') {
    console.error('Permission to access contacts was denied');
    throw new Error('Permission to access contacts was denied');
  }

  const { data } = await Contacts.getContactsAsync({
    fields: [
      Contacts.Fields.FirstName,
      Contacts.Fields.LastName,
      Contacts.Fields.PhoneNumbers,
      Contacts.Fields.Emails,
      Contacts.Fields.Addresses,
    ],
  });

  const transformedContacts = data.map(contact => ({
    first_name: contact.firstName,
    last_name: contact.lastName,
    phone: formatPhoneNumber(contact.phoneNumbers?.[0]),
    email: contact.emails?.[0]?.email || '',
    address: formatAddress(contact.addresses?.[0]),
  }));

  try {
    const response = await fetch(`${API_URL}/contacts/import_contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedContacts),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error importing contacts:', errorResponse);
      throw new Error('Network response was not ok');
    }    

    console.log('Contacts imported successfully.');
  } catch (error) {
    console.error('Error importing contacts:', error);
  }
};