import PropTypes from 'prop-types';
import styles from './Message.module.css';

const Message = ({ message }) => (
  <>
    <p className={styles.message}>{message}</p>
  </>
);

Message.prototype = { message: PropTypes.string.isRequired };
export default Message;
