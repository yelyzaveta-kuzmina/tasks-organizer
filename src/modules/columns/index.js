import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../column';
import { useAppState } from '../../state';
import styles from './styles.module.scss';

export const Columns = () => {
  const [isTaskDragged, setIsTaskDragged] = useState(false);
  const { columns, onColumnAdd, onTaskUpdate } = useAppState();

  const onDragEnd = useCallback(
    (result) => {
      const { draggableId: taskId, destination } = result;
      setIsTaskDragged(false);
      if (!destination) {
        return;
      }
      const { droppableId: columnId } = destination;
      onTaskUpdate(taskId, { columnId });
    },
    [onTaskUpdate, setIsTaskDragged]
  );

  return (
    <div className={styles.columnsWrapper}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column, index) => (
          <Column isTaskDragged={isTaskDragged} key={index} column={column} />
        ))}
      </DragDropContext>
      <button className={styles.addButton} onClick={onColumnAdd}>
        + Add column
      </button>
    </div>
  );
};
