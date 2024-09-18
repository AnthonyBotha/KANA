//Action Types
const LOAD_AVATAR = "avatars/LOAD_AVATAR";
const CREATE_AVATAR = "avatars/CREATE AVATAR";
const DELETE_AVATAR = "avatars/DELETE_AVATAR";
const UPDATE_AVATAR = "avatars/UPDATE_AVATAR";

//Action Creators
const loadAvatar = (avatar) => {
    return {
        type: LOAD_AVATAR,
        payload: avatar
    }
};

const createAvatar = () => {
    return {
        type: CREATE_AVATAR,
        payload: avatar
    }
};

const deleteAvatar = (avatarId) => {
    return {
        type: DELETE_AVATAR,
        payload: avatarId
    }
};

const updateAvatar = (avatar) => {
    return {
        type: UPDATE_AVATAR,
        payload: avatar
    }
}

//Thunks
export const getAvatar = () => async (dispatch) => {
    const response = await fetch("/api/avatars/current");

    if (response.ok) {
        const avatar = await response.json();
        dispatch(loadAvatar(avatar));
    }
};

export const createNewAvatar = (avatar) => async dispatch => {
    const response = await fetch("/api/avatars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(avatar)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createAvatar(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const deleteExistingAvatar = (avatarId) => async (dispatch) => {
    const response = await fetch(`/api/avatars/${avatarId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const deleteConfirmation = await response.json();
        if (deleteConfirmation.message === "Successfully deleted") {
            dispatch(deleteAvatar(avatarId));
            return deleteConfirmation;
        }
    }
}

export const updateExistingAvatar = (avatarId, avatarBody) => async (dispatch) => {
    const response = await fetch(`/api/avatars/${avatarId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(avatarBody)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(updateAvatar(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

//Reducer
const initialState = {};

const avatarReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_AVATAR: {
            const newState = { ...state };
            const avatar = action.payload.avatar;
            newState[avatar.id] = avatar;
            return newState;
        }
        case CREATE_AVATAR: {
            const newState = { ...state };
            avatar = action.payload.avatar;
            newState[avatar.id] = action.payload;
            return newState;
        }
        case DELETE_AVATAR: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        case UPDATE_AVATAR: {
            const newState = {...state};
            const avatar = action.payload.avatar
            const updatedAvatar = {
                ...newState[avatar.id],
                id: avatar.id,
                user_id: avatar.user_id,
                head_id: avatar.head_id,
                eye_id: avatar.eye_id,
                mouth_id: avatar.mouth_id,
                antenna_id: avatar.antenna_id,
                neck_id: avatar.neck_id,
                ear_id: avatar.ear_id,
                nose_id: avatar.nose_id,
                background_id: avatar.background_id,
                created_at: avatar.created_at,
                updated_at: avatar.updated_at
            }
        
            newState[avatar.id] = updatedAvatar;
            return newState;
        }
        default:
            return state;
    }
}

export default avatarReducer;