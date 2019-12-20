import { safeParse } from './json';

const COLUMNS_KEY = 'todos:columns';
const TASKS_KEY = 'todos:tasks';

export const persistColumns = (columns) =>
  localStorage.setItem(COLUMNS_KEY, JSON.stringify(columns));

export const persistTasks = (tasks) => localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

export const getPersistedColumns = () => {
  const json = localStorage.getItem(COLUMNS_KEY);
  return safeParse(json, []);
};

export const getPersistedTasks = () => {
  const json = localStorage.getItem(TASKS_KEY);
  return safeParse(json, []);
};
