import React, { useState, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import DraggableElementIcon from '../../components/graggable-element-icon';
import { DeleteButton } from '../../components/font-awesome-icons';
import { useTask } from './state';
import styles from './styles.module.scss';

const Task = ({ task, index }) => {
  const { onDelete, onTitleChange } = useTask({ task });
  const [taskTitleInput, setTaskTitleInput] = useState(task.title || '');

  const onSubmit = useCallback(() => {
    onTitleChange(taskTitleInput);
  }, [taskTitleInput, onTitleChange]);

  return (
    <Draggable index={index} draggableId={task.id}>
      {(provided, snapshot) => (
        <div
          className={styles.task}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <input
            className={styles.input}
            placeholder="Enter a title for this card..."
            value={taskTitleInput}
            onChange={(event) => setTaskTitleInput(event.target.value)}
            onBlur={onSubmit}
          />
          <DraggableElementIcon className={styles.moveIcon} {...provided.dragHandleProps} />
          <DeleteButton className={styles.deleteTask} onClick={onDelete} />
        </div>
      )}
    </Draggable>
  );
};

export default Task;
