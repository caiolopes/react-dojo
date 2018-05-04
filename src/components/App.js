import React, { Component, Fragment } from 'react';
import update from 'immutability-helper'
import CssBaseline from 'material-ui/CssBaseline';
import Grid from 'material-ui/Grid';

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

    api.editTodo(todos.find(todo => todo._id === id));

    this.setState((prevState, props) => {
      return {
        todos: prevState.todos.map(item => {
          return item._id === id ? { ...item, completed: !item.completed } : item;
        }),
      };
    });
  }

  handleRemove(id) {
    api.removeTodo(id);

    this.setState((prevState, props) => {
      return { todos: prevState.todos.filter(item => item._id !== id) };
    });
  }

  moveCard = (dragIndex, hoverIndex) => {
		const { todos } = this.state
		const dragCard = todos[dragIndex]

		this.setState(
			update(this.state, {
				todos: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			}),
		)
	}

  componentDidMount() {
    api.getTodos().then(todos => this.setState({ todos }));
  }

  render() {
    const { todos } = this.state;

    return (
      <Fragment>
        <CssBaseline />
        <Grid container justify="center">
          <Grid item md={6} lg={4}>
            <TodoForm onAddTodo={this.handleAddTodo} total={todos.length} />
            <TodoList
              moveCard={this.moveCard}
              todos={todos}
              toggleDone={this.toggleDone}
              onRemove={this.handleRemove}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default App;
