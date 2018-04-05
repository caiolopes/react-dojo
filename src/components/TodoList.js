import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  render() {
    const { todos, toggleDone, onRemove } = this.props;

    return (
      <ul>
        {todos.map(item => (
          <TodoItem key={item._id} item={item} toggleDone={toggleDone} onRemove={onRemove} />
        ))}
      </ul>
    );
  }
}

export default TodoList;
