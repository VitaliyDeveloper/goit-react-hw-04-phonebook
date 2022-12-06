import { useState } from 'react';
import styles from './ContactFormCss.module.css';
import { nanoid } from 'nanoid';

export default function ContactForm({ onSubmit }) {
  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleOnSubmit}>
      <label htmlFor="nameInputId">
        <p className={styles.inputTitle}>Name</p>
        <input
          className={styles.input}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleChange}
          id={nameInputId}
          required
        />
      </label>
      <label htmlFor="numberInputId">
        <p className={styles.inputTitle}>Number</p>
        <input
          className={styles.input}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleChange}
          id={numberInputId}
          required
        />
      </label>
      <button className={styles.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
}
