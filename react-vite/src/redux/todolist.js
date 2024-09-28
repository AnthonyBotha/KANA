import { csrfFetch } from "./.csrf";

//Action Types
const LOAD_USERS_TODOS = 'todos/loadUsersTodos';
const CREATE_TODO = 'todos/createTodo';
const UPDATE_TODO = 'todos/updateTodo';
const DELETE_TODO = 'todos/deleteTodo';

//Action Creators
const loadUsersTodos = (todos) => {
  return {
    type: LOAD_USERS_TODOS,
    payload: todos
  }
};

const createTodo = (newTodo) => {
  return {
    type: CREATE_TODO,
    payload: newTodo
  }
};

const updateTodo = (todos) => {
  return {
    type: UPDATE_TODO,
    payload: todos
  }
};

const deleteTodo = (todoId) => {
  return {
    type: DELETE_TODO,
    payload: todoId
  }
};

////////////////////////////////////////////////////////////////
//THUNKS

export const getTodoList = () => async (dispatch) => {
  const response = await fetch("/api/todos/current");

  if (response.ok) {
    const todos = await response.json();
    dispatch(loadUsersTodos(todos));
  } else {
    return { server: "Error getting todo list. Please try again." }
  }
}

export const thunkCreateTodo = (newTodo) => async dispatch => {
  const response = await csrfFetch("/api/todos/", {
      method: "POST",
      body: JSON.stringify(newTodo)
  })
  if (response.ok) {
      const data = await response.json();
      if (data.errors) {
          console.log('Errors: ', data.errors)
          return;
      }
      dispatch(createTodo(data))
  }
}

export const thunkUpdateTodo = (todoId, todo) => async dispatch => {
  const response = await csrfFetch(`/api/todos/${todoId}`, {
    method: "PUT",
    body: JSON.stringify(todo)
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(updateTodo(data))
  }
}

export const thunkDeleteTodo = (todoId) => async dispatch => {
  const response = await csrfFetch(`/api/todos/${todoId}`, {
      method: "DELETE",
  })
  if (response.ok) {
      dispatch(deleteTodo(todoId))
  }
}

//////////////////////////////////////////////////////////////
//REDUCERS
const initialState = {};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS_TODOS: {
      let arrTodos = action.payload.todos
      let objTodos = {}
      arrTodos.forEach(el => (
        objTodos[el.id] = el
      ))
      return { arrTodos, objTodos };
    }
    case CREATE_TODO: {
      let newTodo = action.payload.todo
      let newState = {...state}
      newState.arrTodos.push(newTodo)
      newState.objTodos[newTodo.id] = newTodo
      return newState
  }
    case UPDATE_TODO: {
      let updatedTodo = action.payload
      console.log('=============== updated todo in reducer: ', updatedTodo)
      let newState = { ...state }
      let newTodoArray = newState.arrTodos.map(todo => {
        if (todo.id === updatedTodo.id) return updatedTodo
        return todo
      })
      delete newState.arrTodos
      delete newState.objTodos
      newState.arrTodos = newTodoArray
      let objTodos = {}
      newTodoArray.forEach(el => (
        objTodos[el.id] = el
      ))
      newState.objTodos = objTodos
      return newState
    }
    case DELETE_TODO: {
      let deletedTodoId = action.payload
      let newState = {...state}
      let newTodoArray = newState.arrTodos.filter(todo => {
          return Number(todo.id) !== Number(deletedTodoId)
      })
      delete newState.arrTodos
      delete newState.objTodos
      newState.arrTodos = newTodoArray
      let objTodos = {}
      newTodoArray.forEach(el => (
          objTodos[el.id] = el
      ))
      newState.objTodos = objTodos
      return newState

  }
    default:
      return state;
  }

}

export default todosReducer;
