import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { getTodoList } from '../../redux/todolist.js';


function ToDoList(userId) {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todoList.todos)
  const [checked, setChecked] = useState(false);
  
  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch, userId])

  const handleCheck = () => {
    setChecked(!checked)
  }

  return (
    <>
      <h1>ToDoList Componenet</h1>

      {console.log("todos", JSON.stringify(todos))}

      <p>To-Dos</p>
      <div className='displayFlex'>
        {/* onclick filter the current task list */}
        <p>Active</p>
        <p>Scheduled</p>
        <p>Completed</p>
      </div>

      {/* individual tasks */}
      <div className='displayFlex flexColumn'>
        {todos?.map(({id, completed, title, difficulty, dueDate, notes}) => (
          <div key={id} className='displayFlex'>
            <input
              type='checkbox'
              checked={checked}
              onClick={handleCheck}
            />
            <p>{completed}</p>
            <p>{title}</p>
            <p>{difficulty}</p>
            <p>{dueDate}</p>
            <p>{notes}</p>
          </div>
        ))}

      </div>
    </>
  )
}

export default ToDoList;