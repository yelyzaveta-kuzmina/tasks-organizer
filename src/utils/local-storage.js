export const getColumns = () => {
  const json = localStorage.getItem('columns');
  if (!json) {
    return [];
  }
  return JSON.parse(json);
};

export const addColumn = (column) => {
  const columns = getColumns();
  const newColumns = [...columns, column];
  localStorage.setItem('columns', JSON.stringify(newColumns));
};
