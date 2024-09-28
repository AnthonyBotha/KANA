import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getHabits } from "../../redux/habits";
import TaskEditModal from "../TasksEditModal";
import { useModal } from "../../context/Modal";


function Habits(userId){
    const dispatch = useDispatch();
    const habits = useSelector(state => state.habits)

    const {setModalContent} = useModal()
    const [isLoaded,setIsLoaded] = useState(false)

    console.log(habits.arrHabits)

    useEffect(() => {
        dispatch(getHabits()).then(() => setIsLoaded(true))
    },[dispatch,userId,setIsLoaded])


    const openModal = (id) => {
        const task = habits.arrHabits.find(habit => habit.id === id);
        setModalContent(<TaskEditModal taskType={'Habit'} task={task}/>)
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
                     <div className='displayFlex spaceBetween alignCenter'>


                       <p className='whiteFont font smallFont'>{title}</p>
                       <p className='whiteFont font smallFont'>DELETE</p>
                     </div>

                     <div className='displayFlex spaceBetween'>
                       <p className='lightGreyFont font smallFont'>{difficulty}</p>
                       <p className='lightGreyFont font smallFont'>{notes}</p>
                     </div>

                   </div>
            ))}
        </div>
    </>
    )
}


export default Habits
