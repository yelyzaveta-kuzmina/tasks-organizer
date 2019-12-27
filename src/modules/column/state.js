import { useCallback, useMemo } from 'react';
import { useAppState } from '../../state';

export const useColumn = ({ column }) => {
  const { getColumnTasks, onColumnDelete, onColumnUpdate, onTaskAdd, onTaskDelete } = useAppState();

  const tasks = useMemo(() => {
    return getColumnTasks(column.id);
  }, [getColumnTasks, column.id]);

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
    tasks,
    onDelete,
    onTitleChange,
    onTaskAdd: useCallback(() => onTaskAdd({ columnId: column.id }), [column, onTaskAdd])
  };
};
