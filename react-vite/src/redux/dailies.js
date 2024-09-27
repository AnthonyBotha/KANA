import { csrfFetch } from "./.csrf";

const LOAD_USERS_DAILIES = 'dailies/loadUsersDailies'
const UPDATE_DAILY = 'dailies/updateDaily'

const loadUsersDailies = (dailies) => ({
    type: LOAD_USERS_DAILIES,
    payload: dailies
})

const updateDaily = (daily) => ({
    type: UPDATE_DAILY,
    payload: daily
})

////////////////////////////////////////////////////////////////
//THUNKS


export const thunkDailies = () => async dispatch => {
    const response = await fetch("/api/dailies/current")
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(loadUsersDailies(data))
    }
}

export const thunkUpdateDaily = (dailyId, daily) => async dispatch => {
    const response = await csrfFetch(`/api/dailies/${dailyId}`, {
        method: "PUT",
        body: JSON.stringify(daily)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(updateDaily(data))
    }
}

//////////////////////////////////////////////////////////////
//REDUCERS

const initialState = {};

function dailiesReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USERS_DAILIES: {
            let arrDailies = action.payload.dailies
            let objDailies = {}
            arrDailies.forEach(el => (
                objDailies[el.id] = el
            ))
            return { arrDailies, objDailies }
        }
        case UPDATE_DAILY: {
            let updatedDaily = action.payload
            let newState = {...state}
            let newDailyArray = newState.arrDailies.map(daily => {
                if(daily.id === updatedDaily.id) return updatedDaily
                return daily
            })
            delete newState.arrDailies
            delete newState.objDailies
            newState.arrDailies = newDailyArray
            let objDailies = {}
            newDailyArray.forEach(el => (
                objDailies[el.id] = el
            ))
            newState.objDailies = objDailies
            return newState
        }
        default:
            return state
    }
}

export default dailiesReducer
