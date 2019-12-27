import React, { createContext, useContext } from 'react';
import { useTasks } from './tasks';
import { useColumns } from './columns';

const AppStateContext = createContext(null);

export const AppStateProvider = ({ children }) => {
  const { columns, onColumnAdd, onColumnDelete, onColumnUpdate } = useColumns();
  const { tasks, getColumnTasks, onTaskAdd, onTaskDelete, onTaskUpdate, onTaskMove } = useTasks();

  const contextValue = {
    columns,
    onColumnAdd,
    onColumnDelete,
    onColumnUpdate,
    tasks,
    getColumnTasks,
    onTaskAdd,
    onTaskDelete,
    onTaskUpdate,
    onTaskMove
  };

  return <AppStateContext.Provider value={contextValue}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => useContext(AppStateContext);
