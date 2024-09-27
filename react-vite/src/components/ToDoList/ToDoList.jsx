import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
// import { useModal } from "../../context/Modal";
// import TaskEditModal from "../TasksEditModal";
import { getTodoList } from '../../redux/todolist.js';


function ToDoList(userId) {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.userTodos)
  // const { setModalContent} = useModal()
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    dispatch(getTodoList()).then(()=> setIsLoaded(true));
  }, [dispatch, userId, setIsLoaded])

  // const openModal = (id) => {
    // const task = todos.objTodos[id]
    // setModalContent(<TaskEditModal taskType='Todo' task={task}/>)
// }

  const handleCheckboxChange = (e) => {
    const checkedId = e.target.value;
    if(e.target.checked && !selectedIds.includes(checkedId)){
      setSelectedIds([...selectedIds, checkedId])
    } else {
      setSelectedIds(selectedIds.filter(id => id !== checkedId))
    }
  }

  if(isLoaded) return (
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
        {todos.arrTodos?.map(({id, completed, title, difficulty, dueDate, notes}) => (
          <div key={id}
          // onClick={()=>openModal(id)}
          className='displayFlex flexColumn darkGrey littleMargin roundedCorners'>

             <div className='displayFlex spaceBetween alignCenter'>
              <label>
                <input
                  type='checkbox'
                  value={id}
                  className=''
                  // checked={selectedIds.includes(`${id}`)}
                   checked={completed} //if completed = True then the checkbox is checked
                  onChange={(e) => { handleCheckboxChange(e) }}
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
