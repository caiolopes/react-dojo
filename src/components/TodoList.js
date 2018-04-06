import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  render() {
    const { todos, toggleDone, onRemove } = this.props;

    return (
      <Fragment>
        {todos.map(item => (
          <TodoItem key={item._id} item={item} toggleDone={toggleDone} onRemove={onRemove} />
        ))}
      </Fragment>
    );
  }
}

export default TodoList;
