import { useModal } from "../../context/Modal"
import { useState } from "react";
import { useSelector } from "react-redux";
import Select from 'react-select';
import './TaskEditModal.css';


import { FaRegTrashAlt } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";



// import { PiStarFourThin } from "react-icons/pi";

// const renderStar = (num) => {
//     return (
//         Array.from({length: num}, (_, i)=>(
//            <span key={i}><PiStarFourThin/></span>
//         ))
//     )
// }

function TaskEditModal({ taskType, task }) {
    const { closeModal } = useModal();
    const [title, setTitle] = useState(task.title)
    const [notes, setNotes] = useState(task.notes)
    const [selectedTags, setSelectedTags] = useState([])
    const [selectedRepeats, setSelectedRepeats] = useState({ value: 'Weekly', label: 'Weekly' })
    const [repeatEvery, setRepeatEvery] = useState(1)
    const [repeatOn, setRepeatOn] = useState([])
    const [checklist, setChecklist] = useState(task.checklist)
    const [newChecklistItem, setNewChecklistItem] = useState()

    const handleDayClick = (e) => {
        e.target.className = e.target.className === '' ? 'selected-day' : ''
        let clickedDay = e.target.attributes.value.nodeValue
        let newArray
        if (repeatOn.includes(clickedDay)) {
            newArray = repeatOn.filter(day => day !== clickedDay);
        } else {
            newArray = [...repeatOn, clickedDay]
        }
        setRepeatOn(newArray)
    }

    const handleDelete = () => {
        const confirmation = window.confirm(`Are you sure you want to delete this ${taskType}?`)
        if (confirmation) {
            // dispatch thunk to delete task from db and state
        }
    }

    const addChecklistItem = (newChecklistItem) => {
        setChecklist((prev) => [...prev, {description: newChecklistItem, completed: false}])
        console.log(checklist)
        //dispatch a thunk to update the checklist in db and state for the specific task
    }
    const deleteChecklistItem = () => {
        //dispatch a thunk to update the checklist in db and state for the specific task
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)
        console.log(payload)
        console.log(selectedTags)
        console.log(repeatOn)
        // console.log(formData.getAll)
        //switch case
        //gather all elements
    }

    return (
      <div id="modal" className="task">
        <form id="modal-content" className="task" onSubmit={handleSubmit}>

          <div className="displayFlex flexColumn fullWidth">
            <div className="displayFlex alignCenter spaceBetween">
              <p className="font whiteFont xx-largeFont">Edit {taskType}</p>
              <div>
                <button className="littleRightMargin" onClick={closeModal}>Cancel</button>
                <button type='submit'>Save</button>
              </div>
            </div>

            <div className="displayFlex flexColumn noPadding">
                <p className="font whiteFont mediumFont noMargin">Title*</p>
                <input className="littleLeftPadding littleTopMargin font almostBlackFont white noBorder topPadding littleBottomPadding littleBottomMargin roundedCorners" type="text" name='title' onChange={(e) => setTitle(e.target.value)} value={title} />

                <p className="font whiteFont mediumFont noMargin">Notes</p>
                <input className="littleLeftPadding littleTopMargin font almostBlackFont white noBorder topPadding littleBottomPadding littleBottomMargin roundedCorners" type="text" name='notes' onChange={(e) => setNotes(e.target.value)} value={notes} />
            </div>

            {/* Checklist ONLY FOR DAILY AND TODO*/}
            {(taskType == 'Daily' || taskType == 'Todo') &&
              <div className="displayFlex flexColumn noPadding">
                <p className="font whiteFont mediumFont noMargin">Checklist</p>
                {/* Adding checklist from database */}
                {checklist.length > 0 && checklist.map(el => (
                  <div key={el.id}>
                    <input type='checkbox' defaultChecked={el.completed}/>
                    <input type='text' value={el.description} />
                    <button onClick={deleteChecklistItem}>Delete</button>
                  </div>
                ))}

                {/* New checklist item input */}
                <div className="fullWidth displayFlex">
                  <input type='checkbox' defaultChecked={false} />
                  <input
                    className="fullWidth littleLeftPadding littleTopMargin font almostBlackFont white noBorder topPadding littleBottomPadding littleBottomMargin roundedCorners"
                    type='text'
                    placeholder="New checklist item"
                                value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                          e.preventDefault()
                          addChecklistItem(newChecklistItem);
                          setNewChecklistItem('');
                        }
                    }}
                    />
                </div>
              </div>
            }

                {/* ONLY FOR HABIT */}
                {/* Positive Negative */}
                {taskType === 'Habit' &&
                    <div>
                        <CiCircleMinus /><p>Negative</p>
                        <CiCirclePlus /><p>Positive</p>
                    </div>
                }

            {/* Difficulty */}
            <label htmlFor="difficulty">
              <p className="font whiteFont mediumFont noMargin">Difficulty</p>
              <select className="fullWidth littleLeftPadding littleTopMargin font almostBlackFont white noBorder topPadding littleBottomPadding littleBottomMargin roundedCorners"
                      name='difficulty'
                      defaultValue="Easy">
                  <option value="Trivial">Trivial</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
              </select>
            </label>

                {/* ONLY FOR TODO */}
                {/* Due Date */}
                {taskType === 'Todo' &&
                    <div>
                        <p>Due Date</p>
                        <input name="due_date" type="date" />
                    </div>
                }

            {/* ONLY FOR DAILY */}
            {/* repeats */}
            {taskType === 'Daily' &&
              <>
                <div className="displayFlex flexColumn">
                  <p className="font whiteFont mediumFont noMargin">Start Date</p>
                  <input  className="fullWidth littleLeftPadding littleTopMargin font almostBlackFont white noBorder topPadding littleBottomPadding littleBottomMargin roundedCorners"
                          name="start_date"
                          type="date" />
                </div>

                <div>
                  <p className="font whiteFont mediumFont noMargin">Repeats</p>
                  <div className="littleTopMargin littleBottomMargin">
                    <RepeatsSelector
                        selectedRepeats={selectedRepeats}
                        setSelectedRepeats={setSelectedRepeats}
                        />
                  </div>
                </div>

                <div>
                  <p className="font whiteFont mediumFont noMargin">Repeat Every</p>
                  <div>
                    <input
                        className="fullWidth littleLeftPadding littleTopMargin font almostBlackFont white noBorder topPadding littleBottomPadding littleBottomMargin roundedCorners"
                        type="number"
                        name="repeat_every"
                        value={repeatEvery}
                        onChange={(e) => setRepeatEvery(parseInt(e.target.value))}
                        />
                    <p className="font whiteFont mediumFont noMargin">{when(selectedRepeats)}</p>
                  </div>
                </div>

                {selectedRepeats.value === 'Weekly' &&
                  <div className="displayFlex">
                    <span id='day-box' value="Sunday" onClick={(e) => handleDayClick(e)}>Su</span>
                    <span id='day-box' value="Monday" onClick={(e) => handleDayClick(e)}>Mo</span>
                    <span id='day-box' value="Tuesday" onClick={(e) => handleDayClick(e)}>Tu</span>
                    <span id='day-box' value="Wednesday" onClick={(e) => handleDayClick(e)}>We</span>
                    <span id='day-box' value="Thursday" onClick={(e) => handleDayClick(e)}>Th</span>
                    <span id='day-box' value="Friday" onClick={(e) => handleDayClick(e)}>Fr</span>
                    <span id='day-box' value="Saturday" onClick={(e) => handleDayClick(e)}>Sa</span>
                  </div>
                }

              </>
            }

            {/* Tags */}
            <label htmlFor="tags">
              <p className="font whiteFont mediumFont noMargin">Tags</p>
              <div className="littleTopMargin">
                <TagSelector
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    />
              </div>
            </label>


                {/* Delete this TaskType */}
                <div id="delete-task-button" className="redFont font textCenter">
                    <p onClick={handleDelete}><FaRegTrashAlt />Delete this {taskType}</p>
                </div>


          </div>
        </form>
      </div>
    )
}


export default TaskEditModal


// HELPER COMPONENTS & functions



const when = (selectedRepeats) => {
    switch (selectedRepeats.value) {
        case 'Weekly':
            return 'Week'
        case 'Daily':
            return 'Day'
        case 'Monthly':
            return 'Month'
        case 'Yearly':
            return 'Year'
        default:
            return 'Week'
    }
}

function TagSelector({ selectedTags, setSelectedTags }) {
    const tags = useSelector(state => state.tags.tagsArray)
    //creating options array of objects with the tags on the database/redux-store
    const options = []
    tags.forEach(tag => {
        let tagObj = { value: tag, label: tag }
        options.push(tagObj)
    })
    //function to update selected tags state
    const handleSelect = (selectedOptions) => {
        setSelectedTags(selectedOptions)
    }
    //component
    return <Select
        isMulti
        options={options}
        value={selectedTags}
        disabled placeholder="Add tags..."
        onChange={handleSelect}
    />
}


function RepeatsSelector({ selectedRepeats, setSelectedRepeats }) {
    const options = [
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Yearly', label: 'Yearly' },
    ]
    //function to update selected Repeats state
    const handleSelect = (selectedOption) => {
        setSelectedRepeats(selectedOption)
    }

    return <Select
        name="repeats"
        options={options}
        value={selectedRepeats}
        placeholder="Weekly"
        onChange={handleSelect}
    />
}
