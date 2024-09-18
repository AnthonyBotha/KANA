import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getTodoList } from '../../redux/todolist.js';


function ToDoList(userId) {
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todoList)

  
  useEffect(() => {
    dispatch(getTodoList(userId.userId));
  }, [dispatch, userId])
  


  return (
    <>
      <h1>ToDoList Componenet</h1>
      {JSON.stringify(userId.userId)}
      {console.log(JSON.stringify(todoList))}
    </>
  )
}

export default ToDoList;