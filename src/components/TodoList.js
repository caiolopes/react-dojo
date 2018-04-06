import React, { Component, Fragment } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import TodoItem from './TodoItem';


class TodoList extends Component {
  render() {
    const { todos, toggleDone, onRemove, moveCard } = this.props;

    return (
      <Fragment>
        {todos.map((item, index) => (
          <TodoItem key={item._id} item={item} index={index} moveCard={moveCard} toggleDone={toggleDone} onRemove={onRemove} />
        ))}
      </Fragment>
    );
  }
}

export default DragDropContext(HTML5Backend)(TodoList);
