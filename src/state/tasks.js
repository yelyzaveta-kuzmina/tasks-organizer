import { useState, useEffect, useCallback } from 'react';
import uuidv4 from 'uuid/v4';
import { persistTasks, getPersistedTasks } from '../utils/local-storage';

const initialTasks = getPersistedTasks();

const getEmptyTaskObject = ({ columnId, position }) => ({
  id: uuidv4(),
  title: '',
  position,
  columnId
});

export const useTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    persistTasks(tasks);
  }, [tasks]);

  const getColumnTasks = useCallback(
    (columnId) => {
      return tasks
        .filter((task) => task.columnId === columnId)
        .sort((task1, task2) => (task1.position > task2.position ? 1 : -1));
    },
    [tasks]
  );

  const onTaskAdd = useCallback(({ columnId }) => {
    setTasks((tasks) => [...tasks, getEmptyTaskObject({ columnId, position: tasks.length })]);
  }, []);

  const onTaskDelete = useCallback((taskId) => {
    setTasks((tasks) => {
      const { columnId, position } = tasks.find((task) => task.id === taskId);
      return tasks
        .filter((task) => task.id !== taskId)
        .map((task) => {
          if (task.columnId === columnId && task.position > position) {
            return { ...task, position: task.position - 1 };
          }
          return task;
        });
    });
  }, []);

  const onTaskUpdate = useCallback((taskId, data) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, ...data };
        }
        return task;
      })
    );
  }, []);

  const onTaskMove = useCallback(
    ({ taskId, sourceColumnId, sourceIndex, destinationColumnId, destinationIndex }) => {
      setTasks((tasks) => {
        return tasks.map((task) => {
          let { position } = task;
          if (task.columnId === sourceColumnId && position > sourceIndex) {
            position--;
          }

          if (task.columnId === destinationColumnId && position >= destinationIndex) {
            position++;
          }
          return { ...task, position };
        });
      });
      onTaskUpdate(taskId, { columnId: destinationColumnId, position: destinationIndex });
    },
    [setTasks, onTaskUpdate]
  );

  return { tasks, getColumnTasks, onTaskAdd, onTaskDelete, onTaskUpdate, onTaskMove };
};
