const LOAD_TAGS = 'tags/loadTags'

const loadUserTags = (tags) => ({
    type: LOAD_TAGS,
    payload: tags
})

////////////////////////////////////////////////////////////////
//THUNKS

export const thunkTags = () => async dispatch => {
    const response = await fetch('/api/tags/current')
    if(response.ok) {
        const data = await response.json();
        if(data.errors){
            return;
        }
        dispatch(loadUserTags(data))
    }
}

//////////////////////////////////////////////////////////////
//REDUCERS

const initialState = {}

function tagsReducer(state=initialState, action) {
    switch(action.type){
        case LOAD_TAGS:
            return {...state, tagsArray: action.payload}
        default:
            return state
    }
}

export default tagsReducer
