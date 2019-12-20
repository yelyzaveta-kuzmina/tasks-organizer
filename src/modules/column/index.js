import React from 'react';
import { DeleteColumnButton } from '../../components/font-awesome-icons';
import Task from '../task';
import AddCardButton from '../../components/add-card-button';
import { useColumn } from './state';
import { Header } from './header';
import styles from './styles.module.scss';

const Column = ({ column }) => {
  const { tasks, onDelete, onTitleChange, onTaskAdd } = useColumn({ column });

  return (
    <div className={styles.column}>
      <Header title={column.title} onTitleChange={onTitleChange} />

      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}

      <div className={styles.bottomButtons}>
        <AddCardButton onClick={onTaskAdd} />
        <DeleteColumnButton className={styles.deleteColumnButton} onClick={onDelete} />
      </div>
    </div>
  );
};

export default Column;
