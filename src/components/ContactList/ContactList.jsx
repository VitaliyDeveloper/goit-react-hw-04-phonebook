import PropTypes from 'prop-types';
import styles from './ContactListCss.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  // console.log(contacts);
  return (
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li className={styles.item} key={id}>
            {name} : {number}
            <button
              type="button"
              className={styles.btnDel}
              onClick={() => onDeleteContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.prototype = {
  contacts: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactList;
