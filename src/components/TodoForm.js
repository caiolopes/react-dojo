import React, { Component } from 'react';

class TodoForm extends Component {
  state = {
    newTodo: '',
    error: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.newTodo.length > 0) {
      this.props.onAddTodo(this.state.newTodo);
      this.setState({ error: '', newTodo: '' });
    } else {
      this.setState({ error: 'Write something!' });
    }
  };

  handleChange = (event) => {
    const newTodo = event.target.value;
    this.setState({ newTodo, error: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Add todo: <input type="text" value={this.state.newTodo} onChange={this.handleChange} />
        <button>Add #{this.props.total + 1}</button>
        <p style={{color: 'red'}}>{this.state.error}</p>
      </form>
    );
  }
}

export default TodoForm;
