import React from 'react';
import styles from './styles.module.scss';

const AddCardButton = ({ onClick }) => {
  return (
    <button className={styles.addCard} onClick={onClick}>
      + Add a card
    </button>
  );
};

export default AddCardButton;
