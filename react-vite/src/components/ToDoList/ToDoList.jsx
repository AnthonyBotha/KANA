import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useModal } from "../../context/Modal";
import TaskEditModal from "../TasksEditModal";
import { getTodoList, thunkUpdateTodo } from '../../redux/todolist.js';


function ToDoList(userId) {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.userTodos)
  const { setModalContent } = useModal()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getTodoList()).then(() => setIsLoaded(true));
  }, [dispatch, userId, setIsLoaded])

  const openModal = (e, id) => {
    if(e.target.tagName !== 'INPUT' || e.target.type !== 'checkbox') {
      const task = todos.objTodos[id]
      setModalContent(<TaskEditModal taskType='Todo' task={task} />)
    }

  }

  const handleCheckboxChange = (e) => {
    const taskId = e.target.value
    const checked = e.target.checked
    console.log(checked)
    const updatedTask = {
        ...todos.objTodos[taskId],
        completed: checked
    };
    console.log('updatedTask,', updatedTask)
    dispatch(thunkUpdateTodo(taskId, updatedTask))
}

  if (isLoaded) return (
    <>
      <div className='displayFlex alignBottom spaceBetween'>
        <h2 className='font purpleFont'>To-Dos</h2>

        <div className='displayFlex littlePadding'>
          {/* onclick filter the current task list */}
          <p className='fontLight whiteFont smallFont littlePadding'>Active</p>
          <p className='fontLight whiteFont smallFont littlePadding'>Completed</p>
        </div>
      </div>

      {/* individual tasks */}
      <div className='displayFlex flexColumn littlePadding littleMargin'>
        {todos.arrTodos?.map(({ id, completed, title, difficulty, dueDate, notes }) => (
          <div key={id}
            onClick={(e) => openModal(e, id)}
            className='displayFlex flexColumn darkGrey littleMargin roundedCorners'>
            <div className='displayFlex spaceBetween alignCenter'>
              <label>
                <input
                  type='checkbox'
                  value={id}
                  className=''
                  checked={completed}
                  onChange={(e) => { handleCheckboxChange(e) }}
                />
              </label>

              <p className='whiteFont font smallFont'>{title}</p>
            </div>

            <div className='displayFlex spaceBetween'>
              <p className='lightGreyFont font smallFont'>{difficulty}</p>
              <p className='lightGreyFont font smallFont'>{dueDate}</p>
              <p className='lightGreyFont font smallFont'>{notes}</p>
            </div>

          </div>
        ))}

      </div>
    </>
  )
}

export default ToDoList;
