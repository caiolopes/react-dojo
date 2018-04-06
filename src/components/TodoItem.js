import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'

const styles = theme => ({
  card: {
    margin: 2 * theme.spacing.unit,
    minWidth: 275,
    cursor: 'move',
  },
  button: {
    margin: theme.spacing.unit,
  },
  completed: {
    textDecoration: 'line-through',
  }
});

const cardSource = {
  beginDrag(props) {
		return {
			id: props.item._id,
			index: props.index,
		}
	},
}

const cardTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex || !component) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveCard(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
	},
}

class TodoItem extends React.Component {
  render() {
    const { classes, item, onRemove, toggleDone, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      connectDropTarget(
        <div style={{ opacity }}>
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
        </div>
      )
    );
  }
}

TodoItem = DropTarget('card', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(TodoItem);

TodoItem = DragSource('card', cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))(TodoItem);

export default withStyles(styles)(TodoItem);
