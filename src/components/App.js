import React, { Component, Fragment } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import * as api from '../api/todo';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };

    this.toggleDone = this.toggleDone.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  handleAddTodo(text) {
    api.addTodo(text).then(todo => {
      const { todos } = this.state;
      todos.push(todo);
      this.setState({ todos });
    });
  }

  toggleDone(id) {
    const { todos } = this.state;

    api.editTodo(todos.find(todo => todo._id === id))
      .then(editedTodo => {
        this.setState((prevState, props) => {
          return {
            todos: prevState.todos.map(item => {
              return item._id === editedTodo._id ? editedTodo : item;
            }),
          };
        });
      });
  }

  handleRemove(id) {
    api.removeTodo(id).then(todo => {
      this.setState((prevState, props) => {
        return { todos: prevState.todos.filter(item => item._id !== todo._id) };
      });
    })
  }

  componentDidMount() {
    api.getTodos().then(todos => this.setState({ todos }));
  }

  render() {
    const { todos } = this.state;

    return (
      <Fragment>
        <TodoForm onAddTodo={this.handleAddTodo} total={todos.length} />
        <TodoList
          todos={todos}
          toggleDone={this.toggleDone}
          onRemove={this.handleRemove}
        />
      </Fragment>
    );
  }
}

export default App;
