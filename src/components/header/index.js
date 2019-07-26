import React from 'react';
import styles from './styles.module.scss';

const Header = (props) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Wieheißter</span>
    </div>
  );
};

export default Header;
