import { useState, useEffect, useCallback } from 'react';
import uuidv4 from 'uuid/v4';
import { persistTasks, getPersistedTasks } from '../utils/local-storage';

const initialTasks = getPersistedTasks();

const getEmptyTaskObject = ({ columnId }) => ({
  id: uuidv4(),
  title: '',
  columnId
});

export const useTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    persistTasks(tasks);
  }, [tasks]);

  const onTaskAdd = useCallback(({ columnId }) => {
    const newTask = getEmptyTaskObject({ columnId });
    setTasks((tasks) => [...tasks, newTask]);
  }, []);

  const onTaskDelete = useCallback((taskId) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  }, []);

  const onTaskUpdate = useCallback(
    (taskId, data) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, ...data };
        }
        return task;
      });
      setTasks(updatedTasks);
    },
    [tasks]
  );

  return { tasks, onTaskAdd, onTaskDelete, onTaskUpdate };
};
