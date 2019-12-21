import React from 'react';
import moveIcon from './move.svg';
import ClassName from 'classnames';
import styles from './styles.module.scss';

const DraggableElementIcon = ({ className }) => {
  return <img src={moveIcon} alt="graggable" className={ClassName(className, styles.moveIcon)} />;
};

export default DraggableElementIcon;
