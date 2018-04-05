import React from 'react';

const TodoItem = ({ item, onRemove, toggleDone }) => (
  <li style={{
    textDecoration: item.completed ? 'line-through' : 'none'
  }}>{item.text}
  <button style={{margin: 5 }} onClick={(e) => toggleDone(item._id)}>{item.completed ? 'Undone' : 'Done'}</button>
  <button style={{margin: 5 }} onClick={(e) => onRemove(item._id)}>Remove</button>
  </li>
);

export default TodoItem;
