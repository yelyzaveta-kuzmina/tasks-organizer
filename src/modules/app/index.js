import React from 'react';
import { getColumns } from '../../utils/local-storage';
import Header from '../../components/header';
import Column from '../column';
import styles from './styles.module.scss';

const EMPTY_COLUMN = {
  title: '',
  tasks: []
};

class Application extends React.Component {
  state = {
    columns: []
  };

  componentDidMount = () => {
    this.setState({
      columns: getColumns()
    });
  };

  onCreateColumn = () => {
    this.setState({
      columns: [...this.state.columns, EMPTY_COLUMN]
    });
  };

  onColumnDelete = (indexToRemove) => {
    this.setState({
      columns: this.state.columns.filter((column, index) => {
        return index !== indexToRemove;
      })
    });
  };

  onColumnUpdate = (columnIndex, updatedColumn) => {
    this.setState({
      columns: [
        ...this.state.columns.slice(0, columnIndex),
        updatedColumn,
        ...this.state.columns.slice(columnIndex + 1)
      ]
    });
  };

  render() {
    const { columns } = this.state;

    return (
      <>
        <Header />
        <div className={styles.columnsWrapper}>
          {columns.map((column, index) => (
            <Column
              key={index}
              column={column}
              onChange={(updatedColumn) => this.onColumnUpdate(index, updatedColumn)}
              onColumnDelete={() => this.onColumnDelete(index)}
            />
          ))}
          <button className={styles.addButton} onClick={() => this.onCreateColumn()}>
            + Add column
          </button>
        </div>
      </>
    );
  }
}

export default Application;
