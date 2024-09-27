import { csrfFetch } from "./.csrf";

const LOAD_USERS_DAILIES = 'dailies/loadUsersDailies'
const CREATE_DAILY = 'dailies/createDaily'
const UPDATE_DAILY = 'dailies/updateDaily'
const DELETE_DAILY = 'dailies/deleteDaily'

const loadUsersDailies = (dailies) => ({
    type: LOAD_USERS_DAILIES,
    payload: dailies
})

const createDaily = (newDaily) => ({
    type: CREATE_DAILY,
    payload: newDaily
})

const updateDaily = (daily) => ({
    type: UPDATE_DAILY,
    payload: daily
})

const deleteDaily = (dailyId) => ({
    type: DELETE_DAILY,
    payload: dailyId
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

export const thunkCreateDaily = (newDaily) => async dispatch => {
    const response = await csrfFetch("/api/dailies/", {
        method: "POST",
        body: JSON.stringify(newDaily)
    })
    if (response.ok) {
        const data = await response.json();
        console.log('RESPONSE OK FROM DB. NEW DAILY: ', data)
        if (data.errors) {
            console.log('Errors: ',data.errors)
            return;
        }
        dispatch(createDaily(data))
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

export const thunkDeleteDaily = (dailyId) => async dispatch => {
    const response = await csrfFetch(`/api/dailies/${dailyId}`, {
        method: "DELETE",
    })
    if (response.ok) {
        dispatch(deleteDaily(dailyId))
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
        case CREATE_DAILY: {
            let newDaily = action.payload.newDaily
            let newState = {...state}
            newState.arrDailies.push(newDaily)
            newState.objDailies[newDaily.id] = newDaily
            return newState
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
        case DELETE_DAILY: {
            let deletedDailyId = action.payload.dailyId
            let newState = {...state}
            let newDailyArray = newState.arrDailies.filter(daily => {
                return Number(daily.id) !== Number(deletedDailyId)
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
