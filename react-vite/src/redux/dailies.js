const LOAD_USERS_DAILIES = 'dailies/loadUsersDailies'

const loadUsersDailies = (dailies) => ({
    type: LOAD_USERS_DAILIES,
    payload: dailies
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
        default:
            return state
    }
}

export default dailiesReducer
