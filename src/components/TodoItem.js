import React, { Component } from 'react';

const TodoItem = ({ item, onMarkAsDone }) => (
  <li>{item.text} <button onClick={(e) => onMarkAsDone(item.id)}>Done</button></li>
);

export default TodoItem;
