import React, { useState, useCallback } from 'react';
import styles from './styles.module.scss';
import { EditButton, SubmitButton } from '../../../components/font-awesome-icons';

export const Header = ({ title, onTitleChange }) => {
  const [isTitleEdited, setIsTitleEdited] = useState(!title);
  const [titleInput, setTitleInput] = useState(title || '');

  const onSubmit = useCallback(() => {
    setIsTitleEdited(false);
    onTitleChange(titleInput);
  }, [titleInput, onTitleChange]);

  const onTitleInputKeyUp = useCallback(
    (event) => {
      if (event.key === 13 || event.which === 13) {
        onSubmit();
      }
    },
    [onSubmit]
  );

  return (
    <div className={styles.columnHeader}>
      <div className={styles.title}>
        {!isTitleEdited && title}
        {isTitleEdited && (
          <input
            autoFocus
            required
            className={styles.input}
            placeholder="Desk name"
            value={titleInput}
            onBlur={onSubmit}
            onChange={(event) => setTitleInput(event.target.value)}
            onKeyUp={onTitleInputKeyUp}
          />
        )}
      </div>

      {!isTitleEdited && (
        <button className={styles.editSaveButton} onClick={() => setIsTitleEdited(true)}>
          <EditButton />
        </button>
      )}

      {isTitleEdited && titleInput !== '' && (
        <button className={styles.editSaveButton} onClick={onSubmit}>
          <SubmitButton />
        </button>
      )}
    </div>
  );
};
