import PropTypes from 'prop-types';
import styles from './FilterCss.module.css';

const Filter = ({ value, onChange }) => (
  <div className={styles.filterContainer}>
    <label>
      <p className={styles.description}>Find conntact by name</p>
      <input
        onChange={onChange}
        value={value}
        className={styles.input}
        type="text"
        name="text"
        title="Text for find contacts"
      />
    </label>
  </div>
);

Filter.prototype = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Filter;
