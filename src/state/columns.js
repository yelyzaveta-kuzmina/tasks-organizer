import { useEffect, useState, useCallback } from 'react';
import uuidv4 from 'uuid/v4';
import { persistColumns, getPersistedColumns } from '../utils/local-storage';

const initialColumns = getPersistedColumns();

const getEmptyColumnObject = () => ({
  id: uuidv4(),
  title: ''
});

export const useColumns = () => {
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    persistColumns(columns);
  }, [columns]);

  const onColumnAdd = useCallback(() => {
    const newColumn = getEmptyColumnObject();
    setColumns([...columns, newColumn]);
  }, [columns, setColumns]);

  const onColumnDelete = useCallback(
    (columnId) => {
      const newColumns = columns.filter((column) => column.id !== columnId);
      setColumns(newColumns);
    },
    [columns]
  );

  const onColumnUpdate = useCallback(
    (columnId, data) => {
      const updatedColumns = columns.map((column) => {
        if (column.id === columnId) {
          return { ...column, ...data };
        }
        return column;
      });
      setColumns(updatedColumns);
    },
    [columns, setColumns]
  );

  return { columns, onColumnAdd, onColumnDelete, onColumnUpdate };
};
