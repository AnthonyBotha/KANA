//Action Types
const LOAD_TODO_LIST = 'todos/LOAD_TODO_LIST';
// const CREATE_TODO_LIST = 'todos/CREATE_TODO_LIST';
// const UPDATE_TODO_LIST = 'todos/UPDATE_TODO_LIST';
// const DELETE_TODO_LIST = 'todos/DELETE_TODO_LIST';

//Action Creators
const loadTodoList = (todos) => {
  return {
    type: LOAD_TODO_LIST,
    payload: todos
  }
};

// const createTodoList = (todos) => {
//   return {
//     type: CREATE_TODO_LIST,
//     payload: todos
//   }
// };

// const updateTodoList = (todos) => {
//   return {
//     type: UPDATE_TODO_LIST,
//     payload: todos
//   }
// };

// const deleteTodoList = (todoId) => {
//   return {
//     type: DELETE_TODO_LIST,
//     payload: todoId
//   }
// };

//Thunks
export const getTodoList = () => async (dispatch) => {
  const response = await fetch("/api/todos/current");

  if (response.ok) {
    const todoList = await response.json();
    dispatch(loadTodoList(todoList));
  } else {
    return { server: "Error getting todo list. Please try again."}
  }
}

//Reducer
const initialState = {};

const todoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODO_LIST: {
      const newState = { ...state };
      const todoList = action.payload.todoList;
      newState[todoList.id] = todoList;
      return newState;
    }
    default: 
      return state;
  }
}

export default todoListReducer;