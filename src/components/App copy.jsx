import React, { Component } from 'react';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Message from './Message/Message';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactGetLocal = localStorage.getItem('contacts');
    const contactParse = JSON.parse(contactGetLocal);
    // console.log(contactParse);

    if (contactParse) {
      this.setState({ contacts: contactParse });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    console.log(prevState);
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      // Обязательная проверка или все зациклтся
      // console.log('UPDATE');
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  //////////////////////////////////////////////////////////////////////
  formSubmitData = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    const { contacts } = this.state;
    // console.log(contacts);

    const isExist = contacts.find(contact => contact.name === data.name);
    console.log(isExist);

    if (isExist) {
      return Notify.failure(`${data.name} is alredy in contacts.`);
    }
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));

    // contacts.some(contact => contact.name === data.name)
    //   ? Notify.failure(`${data.name} is alredy in contacts.`)
    //   : this.setState(prevState => ({
    //       contacts: [newContact, ...prevState.contacts],
    //     }));
  };

  filterOnChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getVisibleContacts = data => {
    const { filter, contacts } = this.state;

    const normolizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normolizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { contacts, filter } = this.state;
    // console.log(contacts);

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
          <ContactForm onSubmit={this.formSubmitData} />

          <h2>Contacts</h2>
          <Filter onChange={this.filterOnChange} value={filter} />

          {contacts.length > 0 ? (
            <ContactList
              onDeleteContact={this.deleteContact}
              contacts={visibleContacts}
            />
          ) : (
            <Message message="You don`t have any contacts!" />
          )}
        </Section>
      </div>
    );
  }
}
