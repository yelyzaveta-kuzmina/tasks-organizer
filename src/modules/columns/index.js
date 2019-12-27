import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../column';
import { useAppState } from '../../state';
import styles from './styles.module.scss';

export const Columns = () => {
  const [isTaskDragged, setIsTaskDragged] = useState(false);
  const { columns, onColumnAdd, onTaskMove } = useAppState();

  const onDragEnd = useCallback(
    (result) => {
      const { draggableId: taskId, destination, source } = result;
      setIsTaskDragged(false);
      if (!destination) {
        return;
      }
      onTaskMove({
        taskId,
        sourceColumnId: source.droppableId,
        sourceIndex: source.index,
        destinationColumnId: destination.droppableId,
        destinationIndex: destination.index
      });
    },
    [setIsTaskDragged, onTaskMove]
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
