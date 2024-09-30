import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getHabits } from "../../redux/habits";
import TaskEditModal from "../TasksEditModal";
import { useModal } from "../../context/Modal";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import * as habitActions from '../../redux/habits'
import './habits.css'

function Habits(userId){
    const dispatch = useDispatch();
    const habits = useSelector(state => state.habits)

    const {setModalContent} = useModal()
    const [isLoaded,setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getHabits()).then(() => setIsLoaded(true))
    },[dispatch,userId,setIsLoaded])


    const openModal = (id) => {
        const task = habits.arrHabits.find(habit => habit.id === id);
        setModalContent(<TaskEditModal taskType={'Habit'} task={task}/>)
    }

    async function increase(id,score){
        let payload ={}
        payload.score = Number(score+1);
        const updateScore = {
            ...payload
        }
       await dispatch(habitActions.updateHabit(id,updateScore));
       await dispatch(habitActions.getHabits())
    }

    async function decrease(id,score){
        let payload ={}
        payload.score = Number(score-1);
        const updateScore = {
            ...payload
        }
        await dispatch(habitActions.updateHabit(id,updateScore));
        await dispatch(habitActions.getHabits())
    }

    if(isLoaded)return (
    <>
        <div className='displayFlex alignBottom spaceBetween'>
            <h2 className="font purpleFont">Habits</h2>
        </div>


        {/* indiviudal task */}
        <div className='displayFlex flexColumn littlePadding littleMargin'>
            {habits.arrHabits?.map(({id, title, difficulty, notes,score,isPositive}) => (
                     <div key={id}
                     onClick={() => openModal(id)}
                     className='displayFlex flexColumn darkGrey littleMargin roundedCorners'>
                     <div className='center'>
                        <p className='whiteFont font smallFont '>{title}</p>
                    </div>

                     <div className="displayFlex flexEnd">
                        <div className='whiteFont font smallFont score'>Score: {score}</div>
                        {isPositive == true && (<p className="whiteFont viewIsPostitve">
                            <CiCirclePlus onClick={(e)=>{
                            e.stopPropagation();
                             increase(id,score)}}
                             className="viewButton"/>
                             </p>)}
                        {isPositive == false && (<p className="whiteFont viewIsPostitve">
                            <CiCircleMinus onClick={(e)=>{
                            e.stopPropagation();
                             decrease(id,score)}}
                             className="viewButton"/>
                            </p>)}
                    </div>

                     <div className='displayFlex spaceBetween'>
                       <div className='lightGreyFont font smallFont paddHabit'>{difficulty}</div>
                       <div className='lightGreyFont font smallFont paddHabit notes'>{notes}</div>
                     </div>

                   </div>
            ))}
        </div>
    </>
    )
}


export default Habits
