//Action Types
const LOAD_TODO_LIST = 'todos/LOAD_TODO_LIST';
// const CREATE_TODO_LIST_ITEM = 'todos/CREATE_TODO_LIST_ITEM';
// const UPDATE_TODO_LIST_ITEM = 'todos/UPDATE_TODO_LIST_ITEM';
// const DELETE_TODO_LIST_ITEM = 'todos/DELETE_TODO_LIST_ITEM';

//Action Creators
const loadTodoList = (todos) => {
  return {
    type: LOAD_TODO_LIST,
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

//Thunks
export const getTodoList = () => async (dispatch) => {
  const response = await fetch("/api/todos/current");

  if (response.ok) {
    const todos = await response.json();
    dispatch(loadTodoList(todos));
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
      const todos = action.payload.todos;
      newState.todos = todos;
      return newState;
    }
    default: 
      return state;
  }
}

export default todoListReducer;