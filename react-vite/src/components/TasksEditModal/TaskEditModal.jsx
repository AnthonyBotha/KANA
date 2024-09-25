import { useModal } from "../../context/Modal"
import { useState } from "react";
import { useSelector } from "react-redux";
// import Select from 'react-select'
import './TaskEditModal.css'

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
    const [newItem, setNewItem] = useState()
    const [selectedTags, setSelectedTags] = useState([])
    const [selectedRepeats, setSelectedRepeats] = useState({ value: 'Weekly', label: 'Weekly' })
    const [repeatEvery, setRepeatEvery] = useState(1)
    const [repeatOn, setRepeatOn] = useState([])

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

    const addChecklistItem = () => {
        //dispatch a thunk to update the checklist in db and state for the specific task
    }
    const deleteChecklistItem = () => {
        //dispatch a thunk to update the checklist in db and state for the specific task
    }

    return (
        <div className="lightPurple task-edit-modal">
            <div className="orange-header">

                <div className="heading">
                    <h3>Edit {taskType}</h3>
                    <div className="action-buttons">
                        <button onClick={closeModal}>Cancel</button>
                        <button>Save</button>
                    </div>
                </div>

                <div className="title">
                    <p>Title*</p>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
                </div>

                <div className="notes">
                    <p>Notes</p>
                    <input type="text" onChange={(e) => setNotes(e.target.value)} value={notes} />
                </div>

            </div>

            {/* Checklist */}
            {(taskType == 'Daily' || taskType == 'Todo') &&

                <div className="checklist">
                    <p>Checklist</p>
                    {/* Adding checklist from database */}
                    {task.checklist.length > 0 && task.checklist.map(el => (
                        <div key={el.id}>
                            <input type='checkbox' defaultChecked={el.completed} />
                            <input type='text' value={el.description} />
                            <button onClick={deleteChecklistItem}>Delete</button>
                        </div>
                    ))}
                    {/* New checklist item input */}
                    <div>
                        <input type='checkbox' defaultChecked={false} />
                        <input
                            id="new-checklist-item-input"
                            type='text'
                            placeholder="New checklist item"
                            onChange={(e) => setNewItem(e.target.value)}
                            // value={newItem}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addChecklistItem(newItem);
                                    setNewItem('');
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
                <p>Difficulty</p>
                <select name='difficulty' defaultValue="Easy">
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
                    <input type="date"/>
                </div>
            }

            {/* ONLY FOR DAILY */}
            {/* repeats */}
            {taskType === 'Daily' &&
                <>
                    <div>
                        <p>Start Date</p>
                        <input type="date" />
                    </div>
                    <div>
                        <p>Repeats</p>
                        <RepeatsSelector
                            selectedRepeats={selectedRepeats}
                            setSelectedRepeats={setSelectedRepeats}
                        />
                    </div>
                    <div>
                        <p>Repeat Every</p>
                        <div>
                            <input
                                type="number"
                                value={repeatEvery}
                                onChange={(e) => setRepeatEvery(parseInt(e.target.value))}
                            />
                            <p>{when(selectedRepeats)}</p>
                        </div>
                    </div>

                    {selectedRepeats.value === 'Weekly' &&
                        <div>
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
                <p>Tags</p>
                <TagSelector
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
            </label>


            {/* Delete this TaskType */}
            <div id="delete-task-button">
                <p onClick={handleDelete}><FaRegTrashAlt />Delete this {taskType}</p>
            </div>


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
        name="tags"
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
