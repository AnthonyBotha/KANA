import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { useState } from "react";
import Select from 'react-select';
import CreatebleSelect from 'react-select/creatable'
import * as dailyActions from '../../redux/dailies'
import * as todoActions from '../../redux/todolist'


// import { FaRegTrashAlt } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";




function CreateTaskModal({ taskType }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const [selectedRepeats, setSelectedRepeats] = useState(reactSelectParser('Weekly'))
    const [repeatEvery, setRepeatEvery] = useState(1)
    const [repeatOn, setRepeatOn] = useState([])
    const [checklist, setChecklist] = useState([])
    const [newChecklistItem, setNewChecklistItem] = useState('')
    const [startDate, setStartDate] = useState()
    const [difficulty, setDifficulty] = useState(reactSelectParser('Easy'))
    const [dueDate, setDueDate] = useState(Date.today)


    const handleSubmit = (e) => {
        e.preventDefault()
        const tags = selectedTags.map(tag => (tag.value));
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)

        if (taskType == 'Daily') {
            const newDaily = {
                ...payload,
                checklist,
                tags,
                repeatOn
            }
            dispatch(dailyActions.thunkCreateDaily(newDaily))
        }
        if (taskType == 'Todo') {
            const newTodo = {
                ...payload,
                checklist,
                tags
            }
            dispatch(todoActions.thunkCreateTodo(newTodo))
        }
        closeModal()
    }


    const addChecklistItem = (newChecklistItem) => {
        setChecklist((prev) => [...prev, { description: newChecklistItem, completed: false }])
        //dispatch a thunk to update the checklist in db and state for the specific task
    }

    const updateChecklistCheckbox = (index, e) => {
        const updatedChecklist = checklist.map((el, i) => {
            if (i === index) {
                return { ...el, completed: e.target.checked }
            }
            return el
        })
        setChecklist(updatedChecklist)
        console.log(e.target.checked)
        console.log(e)
        console.log(checklist)
    }

    const updateChecklistDescription = (index, e) => {
        e.preventDefault()
        const updatedChecklist = checklist.map((el, i) => {
            if (i === index) {
                return { ...el, description: e.target.value }
            }
            return el
        })
        setChecklist(updatedChecklist)
    }

    const deleteChecklistItem = (index, e) => {
        e.preventDefault()
        const updatedChecklist = checklist.filter((_, i) => i !== index)
        setChecklist(updatedChecklist)
    }

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

    const checkRepeatOnDays = (day) => {
        if (repeatOn.includes(day))
            return 'selected-day'
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
                            {checklist?.length > 0 && checklist.map((el, index) => (
                                <div key={el.id}>
                                    <input type='checkbox' checked={el.completed} onChange={(e) => updateChecklistCheckbox(index, e)} />
                                    <input type='text' value={el.description} onChange={(e) => updateChecklistDescription(index, e)} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault() }} />
                                    <button onClick={(e) => deleteChecklistItem(index, e)}>Delete</button>
                                </div>
                            ))}

                            {/* New checklist item input */}
                            <div className="fullWidth displayFlex">
                                <input type='checkbox' defaultChecked={false} onChange={(e) => updateChecklistCheckbox(checklist.length, e)} />
                                <input
                                    id="new-checklist-item-input"
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
                        <DifficultySelector
                            difficulty={difficulty}
                            setDifficulty={setDifficulty}
                        />
                    </label>

                    {/* ONLY FOR TODO */}
                    {/* Due Date */}
                    {taskType === 'Todo' &&
                        <div>
                            <p>Due Date</p>
                            <input
                                name="due_date"
                                type="date"
                                value={dueDate}
                                required={true}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                    }

                    {/* ONLY FOR DAILY */}
                    {/* repeats */}
                    {taskType === 'Daily' &&
                        <>
                            <div className="displayFlex flexColumn">
                                <p className="font whiteFont mediumFont noMargin">Start Date</p>
                                <input className="fullWidth littleLeftPadding littleTopMargin font almostBlackFont white noBorder topPadding littleBottomPadding littleBottomMargin roundedCorners"
                                    name="start_date"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => { setStartDate(e.target.value) }}
                                />
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

                            {selectedRepeats?.value === 'Weekly' &&
                                <div className="displayFlex">
                                    <span id='day-box' value="Sunday" className={checkRepeatOnDays("Sunday")} onClick={(e) => handleDayClick(e)}>Su</span>
                                    <span id='day-box' value="Monday" className={checkRepeatOnDays("Monday")} onClick={(e) => handleDayClick(e)}>Mo</span>
                                    <span id='day-box' value="Tuesday" className={checkRepeatOnDays("Tuesday")} onClick={(e) => handleDayClick(e)}>Tu</span>
                                    <span id='day-box' value="Wednesday" className={checkRepeatOnDays("Wednesday")} onClick={(e) => handleDayClick(e)}>We</span>
                                    <span id='day-box' value="Thursday" className={checkRepeatOnDays("Thursday")} onClick={(e) => handleDayClick(e)}>Th</span>
                                    <span id='day-box' value="Friday" className={checkRepeatOnDays("Friday")} onClick={(e) => handleDayClick(e)}>Fr</span>
                                    <span id='day-box' value="Saturday" className={checkRepeatOnDays("Saturday")} onClick={(e) => handleDayClick(e)}>Sa</span>
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
                </div>
            </form>
        </div>
    )
}

export default CreateTaskModal


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
    const options = tags.map(tag => ({ value: tag, label: tag }))

    //function to update selected tags state
    const handleSelect = (selectedOptions) => {
        setSelectedTags(selectedOptions)
    }
    const handleCreate = (newTag) => {
        setSelectedTags((prev) => [...prev, { value: newTag, label: newTag }])
    }
    //component
    return <CreatebleSelect
        isMulti
        options={options}
        value={selectedTags}
        disabled placeholder="Add tags..."
        onChange={handleSelect}
        onCreateOption={handleCreate}
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

function DifficultySelector({ difficulty, setDifficulty }) {
    const options = [
        { value: 'Trivial', label: 'Trivial' },
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
    ]
    //function to update selected Repeats state
    const handleSelect = (selectedOption) => {
        setDifficulty(selectedOption)
    }

    return <Select
        name="difficulty"
        options={options}
        value={difficulty}
        placeholder="Easy"
        onChange={handleSelect}
    />
}

function reactSelectParser(val) {
    if (typeof (val) == 'string') return { value: val, label: val }

    if (Array.isArray(val)) {
        let parsedArray = val.map(el => (el = { value: el, label: el }))
        return parsedArray
    }
    else return val
}
