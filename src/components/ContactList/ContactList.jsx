import PropTypes from 'prop-types';
import styles from './ContactListCss.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={styles.list}>
      {contacts.map((contact, id) => (
        <li className={styles.item} key={contact.id}>
          {contact.name}: {contact.number}
          <button
            type="button"
            className={styles.btnDel}
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.prototype = {
  contacts: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactList;
