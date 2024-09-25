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
      <div className='displayFlex alignBottom spaceBetween'>
        <h2 className='font purpleFont'>To-Dos</h2>

        <div className='displayFlex littlePadding'>
          {/* onclick filter the current task list */}
          <p
            className='fontLight whiteFont smallFont littlePadding'
          >
            Active
          </p>
          <p className='fontLight whiteFont smallFont littlePadding'>Completed</p>
        </div>
      </div>

      {/* individual tasks */}
      <div className='displayFlex flexColumn littlePadding littleMargin'>
        {todos?.map(({id, completed, title, difficulty, dueDate, notes}) => (
          <div key={id} className='displayFlex flexColumn darkGrey littleMargin roundedCorners'>

             <div className='displayFlex spaceBetween alignCenter'>
              <label>
                <input
                  type='checkbox'
                  value={id}
                  className=''
                  // checked={selectedIds.includes(`${id}`)}
                   checked={completed} //if completed = True then the checkbox is checked
                  onClick={(e) => { handleCheckboxChange(e) }}
                />
                {/* figure out how to update db dynamically */}
                {completed = selectedIds.includes(`${id}`)}
              </label>

              <p className='whiteFont font smallFont'>{title}</p>
              <p className='whiteFont font smallFont'>DELETE</p>
            </div>

            <div className='displayFlex spaceBetween'>
              <p className='lightGreyFont font smallFont'>{difficulty}</p>
              <p className='lightGreyFont font smallFont'>{dueDate.slice(0, (dueDate.length - 13))}</p>
              <p className='lightGreyFont font smallFont'>{notes}</p>
            </div>

          </div>
        ))}

      </div>
    </>
  )
}

export default ToDoList;
