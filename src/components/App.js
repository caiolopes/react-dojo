import React, { Component, Fragment } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [{ id: 1, text: 'item 1' }, { id: 2, text: 'item 2' }],
    };

    this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  handleAddTodo(text) {
    const { todos } = this.state;
    todos.push({ id: new Date().getTime(), text });
    this.setState({ todos });
  }

  handleMarkAsDone(id) {
    this.setState((prevState, props) => {
      return { todos: prevState.todos.filter(item => item.id !== id) };
    });
  }

  render() {
    const { todos } = this.state;

    return (
      <Fragment>
        <TodoForm onAddTodo={this.handleAddTodo} total={todos.length} />
        <TodoList
          todos={todos}
          onMarkAsDone={this.handleMarkAsDone}
        />
      </Fragment>
    );
  }
}

export default App;
