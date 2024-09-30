import { useEffect, useState } from "react";
import { thunkDailies, thunkUpdateDaily } from "../../redux/dailies";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import TaskEditModal from "../TasksEditModal";


function Dailies(userId) {
    const dispatch = useDispatch()
    const dailies = useSelector(state => state.userDailies)
    const [isLoaded, setIsLoaded] = useState(false)
    const { setModalContent } = useModal()
    const [isDue, setIsDue] = useState('')
    const [filterActive, setFilterActive] = useState(false)

    useEffect(() => {
        dispatch(thunkDailies()).then(() => setIsLoaded(true))
    }, [dispatch, userId, setIsLoaded])

    const openModal = (e, id) => {
        if (e.target.tagName !== 'INPUT' || e.target.type !== 'checkbox') {
            const task = dailies.objDailies[id]
            setModalContent(<TaskEditModal taskType='Daily' task={task} />)
        }
    }

    const handleCheckboxChange = (e) => {
        const taskId = e.target.value
        const checked = e.target.checked
        const updatedTask = {
            ...dailies.objDailies[taskId],
            isDue: !checked
        };
        dispatch(thunkUpdateDaily(taskId, updatedTask))
    }

    const filterDailies = (e) => {
        let due = e.target.firstChild.nodeValue
        setFilterActive(true)
        due === 'Due' ? setIsDue(true) : setIsDue(false)
    }

    //onclick

    if (isLoaded) return (
        <>
            <div className='displayFlex alignBottom spaceBetween'>
                <h2 className='font purpleFont'>Dailies</h2>


                <div className='displayFlex littlePadding'>
                    {/* onclick filter the current task list */}
                    <p onClick={()=> setFilterActive(false)}className={`fontLight whiteFont smallFont littlePadding ${!filterActive ? 'active' : ''}`}>All</p>
                    <p onClick={(e)=> filterDailies(e)} value='true' className={ `fontLight whiteFont smallFont littlePadding ${filterActive && isDue ? 'active' : ''}`}>Due</p>
                    <p onClick={(e)=> filterDailies(e)} value='false' className={`fontLight whiteFont smallFont littlePadding ${filterActive && !isDue ? 'active' : ''}`}>Not Due</p>
                </div>
            </div>

            {/* individual tasks */}
            <div className='displayFlex flexColumn littlePadding littleMargin'>
                {
                dailies.arrDailies?.filter(
                    daily => {
                    if (filterActive) {
                        return daily.isDue === isDue
                    } else {
                        return daily
                    }
                }).map(({ id, title, isDue, notes }) => (
                    <div key={id} onClick={(e) => openModal(e, id)} className='displayFlex flexColumn darkGrey littleMargin roundedCorners'>
                        <div className='displayFlex spaceBetween alignCenter'>
                            <label>
                                <input
                                    type='checkbox' className=''
                                    value={id}
                                    checked={!isDue} //if completed = True then the checkbox is checked
                                    onChange={(e) => { handleCheckboxChange(e) }}
                                />
                            </label>

                            <p className='whiteFont font smallFont'>{title}</p>
                        </div>

                        <div className='displayFlex spaceBetween'>
                            <p className='lightGreyFont font smallFont notes paddHabit'>{notes}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Dailies;
