import React, { useState, useCallback } from 'react';
import { DeleteButton } from '../../components/font-awesome-icons';
import { useTask } from './state';
import styles from './styles.module.scss';

const Task = ({ task }) => {
  const { onDelete, onTitleChange } = useTask({ task });
  const [taskTitleInput, setTaskTitleInput] = useState(task.title || '');

  const onSubmit = useCallback(() => {
    onTitleChange(taskTitleInput);
  }, [taskTitleInput, onTitleChange]);

  return (
    <div className={styles.task}>
      <input
        className={styles.input}
        placeholder="Enter a title for this card..."
        value={taskTitleInput}
        onChange={(event) => setTaskTitleInput(event.target.value)}
        onBlur={onSubmit}
      />
      <DeleteButton className={styles.deleteTask} onClick={onDelete} />
    </div>
  );
};

export default Task;
