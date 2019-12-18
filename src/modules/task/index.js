import React from 'react';
import { DeleteButton } from '../../components/font-awesome-icons';
import styles from './styles.module.scss';

class Task extends React.Component {
  state = {
    isTaskTitleEdited: !Boolean(this.props.title)
  };

  onTaskTitleChange = (event) => {
    this.props.onChange({
      ...this.props.task,
      title: event.target.value
    });
  };

  render() {
    const { isTaskTitleEdited } = this.state;
    const { task, onDelete } = this.props;

    return (
      <div className={styles.task}>
        {!isTaskTitleEdited && task.title}
        {isTaskTitleEdited && (
          <input
            className={styles.input}
            placeholder="Enter a title for this card..."
            value={task.title}
            onChange={this.onTaskTitleChange}
          />
        )}
        <DeleteButton className={styles.deleteTask} onClick={onDelete} />
      </div>
    );
  }
}

export default Task;
