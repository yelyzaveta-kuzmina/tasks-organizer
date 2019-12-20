import React from 'react';
import Column from '../column';
import { useAppState } from '../../state';
import styles from './styles.module.scss';

export const Columns = () => {
  const { columns, onColumnAdd } = useAppState();

  return (
    <div className={styles.columnsWrapper}>
      {columns.map((column, index) => (
        <Column key={index} column={column} />
      ))}
      <button className={styles.addButton} onClick={onColumnAdd}>
        + Add column
      </button>
    </div>
  );
};
