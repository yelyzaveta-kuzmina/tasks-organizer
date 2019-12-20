import React, { createContext, useContext } from 'react';
import { useTasks } from './tasks';
import { useColumns } from './columns';

const AppStateContext = createContext(null);

export const AppStateProvider = ({ children }) => {
  const { columns, onColumnAdd, onColumnDelete, onColumnUpdate } = useColumns();
  const { tasks, onTaskAdd, onTaskDelete, onTaskUpdate } = useTasks();

  const contextValue = {
    columns,
    onColumnAdd,
    onColumnDelete,
    onColumnUpdate,
    tasks,
    onTaskAdd,
    onTaskDelete,
    onTaskUpdate
  };

  return <AppStateContext.Provider value={contextValue}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => useContext(AppStateContext);
