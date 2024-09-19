import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { getTodoList } from '../../redux/todolist.js';


function ToDoList(userId) {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todoList.todos)
  const [selectedIds, setSelectedIds] = useState([]);
  
  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch, userId])

  const handleCheckboxChange = (e) => {
    const checkedId = e.target.value;
    if(e.target.checked && !selectedIds.includes(checkedId)){
      setSelectedIds([...selectedIds, checkedId])
    } else {
      setSelectedIds(selectedIds.filter(id => id !== checkedId))
    }
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
            <label>
              <input
                type='checkbox'
                value={id}
                checked={selectedIds.includes(`${id}`)}
                onClick={(e) => { handleCheckboxChange(e) }}
              />
              {completed}
            </label>
            {console.log(selectedIds)}

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