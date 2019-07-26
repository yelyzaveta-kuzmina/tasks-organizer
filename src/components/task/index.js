import React from 'react';
import styles from './styles.module.scss';

class Task extends React.Component {
  state = {
    isTaskTitleEdited: !Boolean(this.props.title),
    isDescriptionEdited: !Boolean(this.props.title)
  };

  onTaskTitleChange = (event) => {
    this.props.onChange({
      ...this.props.task,
      title: event.target.value
    });
  };

  onBlur = () => {
    this.setState({ isTaskTitleEdited: false });
  };

  render() {
    const { isTaskTitleEdited } = this.state;
    const { task } = this.props;
    return (
      <div>
        <div className={styles.task}>
          {!isTaskTitleEdited && task.title}
          {isTaskTitleEdited && (
            <input
              className={styles.input}
              placeholder="Enter a title for this card..."
              value={task.title}
              onBlur={this.onBlur}
              onChange={this.onTaskTitleChange}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Task;
