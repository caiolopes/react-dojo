import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing.unit,
  },
  textfield: {
    minWidth: 200,
  },
});

class TodoForm extends Component {
  state = {
    newTodo: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.newTodo.length > 0) {
      this.props.onAddTodo(this.state.newTodo);
      this.setState({ error: '', newTodo: '' });
    }
  };

  handleChange = (event) => {
    const newTodo = event.target.value;
    this.setState({ newTodo, error: '' });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            required
            id="new-todo"
            className={classes.textfield}
            placeholder="What are you up to?"
            margin="normal"
            value={this.state.newTodo}
            onChange={this.handleChange}
          />
          <Button className={classes.button} type="submit" variant="raised" color="primary">Add #{this.props.total + 1}</Button>
          <Typography variant="title" style={{color: 'red'}}>{this.state.error}</Typography>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(TodoForm);
