import React, { Component } from 'react';
import styles from './ContactFormCss.module.css';
import { nanoid } from 'nanoid';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  handleChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
    // console.log(this.state);
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleOnSubmit}>
        <label htmlFor="this.nameInputId">
          <p className={styles.inputTitle}>Name</p>
          <input
            className={styles.input}
            value={this.state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={this.handleChange}
            id={this.nameInputId}
            required
          />
        </label>
        <label htmlFor="numberInputId">
          <p className={styles.inputTitle}>Number</p>
          <input
            className={styles.input}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={this.handleChange}
            id={this.numberInputId}
            required
          />
        </label>
        <button className={styles.formBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
