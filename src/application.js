import React from 'react';
import Header from './components/header';
import Column from './components/column';
import './index.css';

const EMPTY_COLUMN = {
  title: '',
  tasks: []
};

class Application extends React.Component {
  state = {
    columns: []
  };

  onCreateColumn = () => {
    this.setState({
      columns: [...this.state.columns, EMPTY_COLUMN]
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
    console.log(this.state);
    return (
      <>
        <Header onCreateColumn={this.onCreateColumn} />
        <div className="columnsWrapper">
          {columns.map((column, index) => (
            <Column
              key={index}
              column={column}
              onChange={(updatedColumn) => this.onColumnUpdate(index, updatedColumn)}
            />
          ))}
          <button className="addButton" onClick={() => this.onCreateColumn()}>
            + Add another list
          </button>
        </div>
      </>
    );
  }
}

export default Application;
