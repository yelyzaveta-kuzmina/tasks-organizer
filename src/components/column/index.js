import React from 'react';
import Task from '../../components/task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
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

  render() {
    const { isTitleEdited } = this.state;
    const { column } = this.props;

    return (
      <div className={styles.column}>
        <div className={styles.columnHeader}>
          {!isTitleEdited && column.title}
          {isTitleEdited && (
            <input
              className={styles.input}
              placeholder="Desk name"
              value={column.title}
              onChange={this.onTitleChange}
            />
          )}

          <button className={styles.editSaveButton} onClick={this.toggleTitleEditing}>
            {!isTitleEdited && <FontAwesomeIcon icon={faEdit} />}
            {isTitleEdited && 'Save'}
          </button>
        </div>

        {column.tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            onChange={(updatedTask) => this.onTaskUpdate(index, updatedTask)}
          />
        ))}

        <div className={styles.columnBody}>
          <button className={styles.editSaveTaskButton} onClick={this.onTaskCreate}>
            + Add a card
          </button>
        </div>
      </div>
    );
  }
}

export default Column;
