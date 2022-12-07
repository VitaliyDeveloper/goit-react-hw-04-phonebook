import { useState } from 'react';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Message from './Message/Message';
import useLocalStorage from '../hooks/useLocalStorage';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   if (prevContacts => contacts !== prevContacts) {
  //     return localStorage.setItem('contacts', JSON.stringify(contacts));
  //   }
  // }, [contacts]);

  const formSubmitData = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const isExist = contacts.find(contact => contact.name === name);
    // console.log(isExist);

    if (isExist) {
      return Notify.failure(`${name} is alredy in contacts.`);
    }
    setContacts(prevContacts => [newContact, ...prevContacts]);

    // console.log(contacts);
    // console.log(newContact);
  };

  const filterOnChange = event => {
    setFilter(event.currentTarget.value);
    // console.log(event.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const getVisibleContacts = () => {
    const normolizedFilter = filter.toLowerCase();
    // console.log(normolizedFilter);

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normolizedFilter)
    );
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitData} />

        <h2>Contacts</h2>
        <Filter onChange={filterOnChange} value={filter} />

        {contacts.length > 0 ? (
          <ContactList
            onDeleteContact={deleteContact}
            contacts={getVisibleContacts()}
          />
        ) : (
          <Message message="You don`t have any contacts!" />
        )}
      </Section>
    </div>
  );
}
