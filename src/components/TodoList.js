import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  render() {
    const { todos, onMarkAsDone } = this.props;

    return (
      <ul>
        {todos.map(item => (
          <TodoItem key={item.id} item={item} onMarkAsDone={this.props.onMarkAsDone} />
        ))}
      </ul>
    );
  }
}

export default TodoList;
