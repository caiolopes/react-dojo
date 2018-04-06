import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import classNames from 'classnames';

const styles = theme => ({
  card: {
    margin: 2 * theme.spacing.unit,
    minWidth: 275,
  },
  button: {
    margin: theme.spacing.unit,
  },
  completed: {
    textDecoration: 'line-through',
  }
});

const TodoItem = ({ classes, item, onRemove, toggleDone }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography
        variant="headline"
        component="h2"
        className={classNames({[classes.completed]: item.completed})}>
        {item.text}
      </Typography>
      <Typography  color="textSecondary">
        {item.completed ? `Completed at: ${new Date(item.completedAt).toLocaleDateString()}`: 'Not completed'}
      </Typography>
    </CardContent>
    <CardActions>
      {!item.completed ? (
        <IconButton aria-label="Done">
          <Icon onClick={(e) => toggleDone(item._id)}>done</Icon>
        </IconButton>
      ) : (
        <IconButton aria-label="Undone">
          <Icon onClick={(e) => toggleDone(item._id)}>cancel</Icon>
        </IconButton>
      )}
      <IconButton className={classes.button} aria-label="Delete">
        <Icon onClick={(e) => onRemove(item._id)}>delete</Icon>
      </IconButton>
    </CardActions>
  </Card>
);

export default withStyles(styles)(TodoItem);
