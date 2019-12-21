import { useCallback } from 'react';
import { useAppState } from '../../state';

export const useColumn = ({ column }) => {
  const { tasks, onColumnDelete, onColumnUpdate, onTaskAdd } = useAppState();

  const onDelete = useCallback(() => {
    onColumnDelete(column.id);
  }, [column, onColumnDelete]);

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
