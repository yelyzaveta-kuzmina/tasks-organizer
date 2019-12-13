import React from 'react';
import Task from '../../components/task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

const EMPTY_TASK = {
  title: '',
  description: '',
  labels: []
};

class Column extends React.Component {
  state = {
    isTitleEdited: !Boolean(this.props.title)
  };

  toggleTitleEditing = () => {
    this.setState({ isTitleEdited: !this.state.isTitleEdited });
  };

  onTitleChange = (event) => {
    this.props.onChange({
      ...this.props.column,
      title: event.target.value
    });
  };

  onHandleKey = (event) => {
    if (event.key === 13 || event.which === 13) {
      this.toggleTitleEditing();
    }
  };
  onTaskCreate = () => {
    this.props.onChange({
      ...this.props.column,
      tasks: [...this.props.column.tasks, EMPTY_TASK]
    });
  };

  onTaskUpdate = (taskIndex, updatedTask) => {
    this.props.onChange({
      ...this.props.column,
      tasks: [
        ...this.props.column.tasks.slice(0, taskIndex),
        updatedTask,
        ...this.props.column.tasks.slice(taskIndex + 1)
      ]
    });
  };

  onBlur = () => {
    this.setState({ isTitleEdited: false });
  };

  render() {
    const { isTitleEdited } = this.state;
    const { column } = this.props;

    return (
      <div className={styles.column}>
        <div className={styles.columnHeader}>
          <div className={styles.title}>
            {!isTitleEdited && column.title}
            {isTitleEdited && (
              <input
                autoFocus={isTitleEdited}
                className={styles.input}
                placeholder="Desk name"
                value={column.title}
                onBlur={this.onBlur}
                onChange={this.onTitleChange}
                onKeyUp={this.onHandleKey}
              />
            )}
          </div>

          <button className={styles.editSaveButton} onClick={this.toggleTitleEditing}>
            {!isTitleEdited && <FontAwesomeIcon icon={faEdit} />}
            {isTitleEdited && column.title !== '' && <FontAwesomeIcon icon={faCheck} />}
          </button>
        </div>

        {column.tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            onChange={(updatedTask) => this.onTaskUpdate(index, updatedTask)}
          />
        ))}

        <button className={styles.addCard} onClick={this.onTaskCreate}>
          + Add a card
        </button>
      </div>
    );
  }
}

export default Column;
