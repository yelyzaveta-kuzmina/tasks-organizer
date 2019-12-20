import { useCallback } from 'react';
import { useAppState } from '../../state';

export const useTask = ({ task }) => {
  const { onTaskDelete, onTaskUpdate } = useAppState();

  const onDelete = useCallback(() => {
    onTaskDelete(task.id);
  }, [task]);

  const onUpdate = useCallback(
    (data) => {
      onTaskUpdate(task.id, data);
    },
    [task, onTaskUpdate]
  );

  const onTitleChange = useCallback(
    (title) => {
      onUpdate({ title });
    },
    [onUpdate]
  );

  return {
    onDelete,
    onTitleChange
  };
};
