import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

export const EditButton = () => {
  return <FontAwesomeIcon icon={faEdit} />;
};

export const SubmitButton = () => {
  return <FontAwesomeIcon icon={faCheck} />;
};

export const DeleteButton = ({ className, onClick }) => {
  return <FontAwesomeIcon className={className} onClick={onClick} icon={faTimes} />;
};
