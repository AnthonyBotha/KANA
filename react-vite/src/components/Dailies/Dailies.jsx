import { useEffect, useState } from "react";
import { thunkDailies } from "../../redux/dailies";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import TaskEditModal from "../TasksEditModal";


function Dailies(userId) {
    const dispatch = useDispatch()
    const dailies = useSelector(state => state.userDailies)
    const [isLoaded, setIsLoaded] = useState(false)
    const { setModalContent} = useModal()

    useEffect(() => {
        dispatch(thunkDailies()).then(()=> setIsLoaded(true))
    }, [dispatch, userId, setIsLoaded])

    const openModal = (id) => {
        const task = dailies.objDailies[id]
        setModalContent(<TaskEditModal taskType='Daily' task={task}/>)
    }

    const handleCheckboxChange = (e) => {
        console.log(e)
        console.log('clicked check button')
    }

    if (isLoaded) return (
            <>
                <div className='displayFlex alignBottom spaceBetween'>
                    <h2 className='font purpleFont'>Dailies</h2>


                    <div className='displayFlex littlePadding'>
                        {/* onclick filter the current task list */}
                        <p className='fontLight whiteFont smallFont littlePadding'>All</p>
                        <p className='fontLight whiteFont smallFont littlePadding'>Due</p>
                        <p className='fontLight whiteFont smallFont littlePadding'>Not Due</p>
                    </div>
                </div>

                {/* individual tasks */}
                <div className='displayFlex flexColumn littlePadding littleMargin'>
                    {dailies.arrDailies?.map(({ id, title, isDue, notes}) => (
                        <div key={id} onClick={()=>openModal(id)} className='displayFlex flexColumn darkGrey littleMargin roundedCorners'>
                                <div className='displayFlex spaceBetween alignCenter'>
                                    <label>
                                        <input
                                            type='checkbox' value={id} className=''
                                            checked={!isDue} //if completed = True then the checkbox is checked
                                            onChange={(e) => { handleCheckboxChange(e) }}
                                        />
                                    </label>

                                    <p className='whiteFont font smallFont'>{title}</p>

                                    <p className='whiteFont font smallFont'
                                    // onClick={(e) => handleDelete(e)}
                                    >
                                        DELETE
                                    </p>

                                </div>

                                <div className='displayFlex spaceBetween'>
                                    <p className='lightGreyFont font smallFont'>{notes}</p>
                                </div>
                            </div>
                    ))}
                </div>
            </>
        )
}

export default Dailies;
