import axios from 'axios';

/**
 * Version v1 without authentication
 */
var api = axios.create({
  baseURL: 'https://react-dojo.herokuapp.com/v1/',
});

export async function getTodos() {
  try {
    const response = await api.get('todos');

    return response.data.todos;
  } catch (error) {
    console.error(error);
  }
}

export async function addTodo(text) {
  try {
    const response = await api.post('todos', { text });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function editTodo(todo) {
  try {
    const response = await api.patch(`todos/${todo._id}`, { completed: !todo.completed });

    return response.data.todo;
  } catch (error) {
    console.error(error);
  }
}

export async function removeTodo(id) {
  try {
    const response = await api.delete(`todos/${id}`);

    return response.data.todo;
  } catch (error) {
    console.error(error);
  }
}
