//Action Types
const LOAD_USERS_TODOS = 'todos/loadUsersTodos';
// const CREATE_TODO_LIST_ITEM = 'todos/CREATE_TODO_LIST_ITEM';
// const UPDATE_TODO_LIST_ITEM = 'todos/UPDATE_TODO_LIST_ITEM';
// const DELETE_TODO_LIST_ITEM = 'todos/DELETE_TODO_LIST_ITEM';

//Action Creators
const loadUsersTodos = (todos) => {
  return {
    type: LOAD_USERS_TODOS,
    payload: todos
  }
};

// const createTodoList = (todos) => {
//   return {
//     type: CREATE_TODO_LIST_ITEM,
//     payload: todos
//   }
// };

// const updateTodoList = (todos) => {
//   return {
//     type: UPDATE_TODO_LIST_ITEM,
//     payload: todos
//   }
// };

// const deleteTodoList = (todoId) => {
//   return {
//     type: DELETE_TODO_LIST_ITEM,
//     payload: todoId
//   }
// };

////////////////////////////////////////////////////////////////
//THUNKS

export const getTodoList = () => async (dispatch) => {
  const response = await fetch("/api/todos/current");

  if (response.ok) {
    const todos = await response.json();
    dispatch(loadUsersTodos(todos));
  } else {
    return { server: "Error getting todo list. Please try again."}
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
    default:
      return state;
  }
}

export default todosReducer;
