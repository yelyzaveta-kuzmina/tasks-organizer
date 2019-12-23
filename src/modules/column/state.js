import { useCallback } from 'react';
import { useAppState } from '../../state';

export const useColumn = ({ column }) => {
  const { tasks, onColumnDelete, onColumnUpdate, onTaskAdd, onTaskDelete } = useAppState();

  const onDelete = useCallback(() => {
    tasks.map((task) => task.id).forEach(onTaskDelete);
    onColumnDelete(column.id);
  }, [column, tasks, onColumnDelete, onTaskDelete]);

  const onUpdate = useCallback(
    (data) => {
      onColumnUpdate(column.id, data);
    },
    [column, onColumnUpdate]
  );

  const onTitleChange = useCallback(
    (title) => {
      onUpdate({ title });
    },
    [onUpdate]
  );

  return {
    tasks: tasks.filter((task) => task.columnId === column.id),
    onDelete,
    onTitleChange,
    onTaskAdd: useCallback(() => onTaskAdd({ columnId: column.id }), [column, onTaskAdd])
  };
};
