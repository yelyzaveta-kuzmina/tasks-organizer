import React from 'react';
import { addColumn } from '../../utils/local-storage';
import { EditButton, SubmitButton, DeleteColumnButton } from '../../components/font-awesome-icons';
import Task from '../task';
import AddCardButton from '../../components/add-card-button';
import styles from './styles.module.scss';

const EMPTY_TASK = {
  title: ''
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

  onTaskDelete = (indexToRemove) => {
    this.props.onChange({
      ...this.props.column,
      tasks: this.props.column.tasks.filter((task, index) => {
        return index !== indexToRemove;
      })
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
    const { column, onColumnDelete } = this.props;
    return (
      <div className={styles.column}>
        <form onSubmit={() => addColumn(column)}>
          <div className={styles.columnHeader}>
            <div className={styles.title}>
              {!isTitleEdited && column.title}
              {isTitleEdited && (
                <input
                  required
                  type="text"
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
              {!isTitleEdited && <EditButton />}
              {isTitleEdited && column.title !== '' && <SubmitButton />}
            </button>
          </div>
          {column.tasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              onChange={(updatedTask) => this.onTaskUpdate(index, updatedTask)}
              onDelete={() => this.onTaskDelete(index)}
            />
          ))}
          <div className={styles.bottomButtons}>
            <AddCardButton onClick={this.onTaskCreate} />
            <DeleteColumnButton className={styles.deleteColumnButton} onClick={onColumnDelete} />
          </div>
          <button type="submit">Submit column</button>
        </form>
      </div>
    );
  }
}

export default Column;
