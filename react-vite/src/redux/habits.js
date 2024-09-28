
import { csrfFetch } from "./.csrf";


const LOAD_HABITS = 'habits/LOAD_HABITS'
const UPDATE_HABIT = 'habits/UPDATE_HABIT'
const DELETE_HABIT ='habits/DELETE_HABIT'
const CREATE_HABIT='habits/CREATE_HABIT'

const loadHabits = (habits) => {
    return {
        type:LOAD_HABITS,
        payload: habits
    }
}

const upgradeHabit = (habit) => {
    return {
        type:UPDATE_HABIT,
        payload:habit
    }
}
const deletingHabit = (habitId) => {
    return {
        type:DELETE_HABIT,
        payload:habitId
    }
}

const createHabit = (habit) => {
    return{
        type:CREATE_HABIT,
        payload:habit
    }
}


export const getHabits = () => async(dispatch) => {
    const res = await fetch("/api/habits/current");

    if(res.ok){
        const habits = await res.json()
        dispatch(loadHabits(habits))
        return habits
    }else return { server: "Error getting habits. Please try again." }
}

export const updateHabit = (habitId, habit) => async dispatch => {
    const res = await csrfFetch(`/api/habits/${habitId}`, {
        method:'PUT',
        body: JSON.stringify(habit)
    })


    if(res.ok){

        const data = res.json()
        dispatch(upgradeHabit(data))
        return data
    }
}

export const deleteHabit = (habitId) => async dispatch => {
    const res = await csrfFetch(`/api/habits/${habitId}`, {
        method:"DELETE",
    })
    if(res.ok){
        dispatch(deletingHabit(habitId))
    }
}

export const thunkCreateHabit = (newHabit) => async dispatch => {
    const res = await csrfFetch("/api/habits/", {
        method:"POST",
        body:JSON.stringify(newHabit)
    })
    if(res.ok){
        const data = await res.json();
        if (data.errors) {
            console.log('Errors: ', data.errors)
            return;
        }
        dispatch(createHabit(data))
    }
}



const initialState ={}
const habitsReducer = (state=initialState, action) => {
    switch(action.type){
        case LOAD_HABITS:{
            let arrHabits = action.payload.habits
            let objHabits = {}

            arrHabits.forEach((habit) => objHabits[habit.id] = habit)

            return {arrHabits,objHabits};
        }
        case UPDATE_HABIT:{
            let updateHabit = action.payload
            let newState = {...state}
            let newHabitsArr = newState.arrHabits.map(habit => {
                if (habit.id === updateHabit.id) return updateHabit
                return habit
              })

              delete newState.arrHabits
              delete newState.objHabits
              newState.arrHabits = newHabitsArr
              let objHabits = {}
              newHabitsArr.forEach(el => (
                objHabits[el.id] = el
              ))
              newState.objHabits = objHabits
              return newState

            }
        case DELETE_HABIT:{
            let deletedHabitId = action.payload
            let newState = {...state}
            let newHabitsArr = newState.arrHabits.filter(habit => {
                return Number(habit.id) !== Number(deletedHabitId)
            })
            delete newState.arrHabits
            delete newState.objHabits
            newState.arrHabits = newHabitsArr
            let objHabits = {};
            newHabitsArr.forEach((el) => {
                objHabits[el.id] = el
            })

            newState.objHabits = objHabits
            return newState
        }
        case CREATE_HABIT:{
            let newHabit = action.payload.habit
            let newState = {...state}
            newState.arrHabits.push(newHabit)
            newState.objHabits[newHabit.id] = newHabit
            return newState
        }

        default:
            return state
    }
}


export default habitsReducer
