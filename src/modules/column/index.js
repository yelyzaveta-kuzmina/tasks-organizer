import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
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
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div className={styles.droppBox} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Task key={task.id} index={index} task={task} />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className={styles.bottomButtons}>
        <AddCardButton onClick={onTaskAdd} />
        <DeleteColumnButton className={styles.deleteColumnButton} onClick={onDelete} />
      </div>
    </div>
  );
};

export default Column;
