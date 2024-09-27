import { csrfFetch } from "./.csrf";

const LOAD_REWARDS = "rewards/LOAD_REWARDS"
const BUY_REWARDS = "rewards/BUY_REWARDS"
const CREATE_REWARDS = "rewards/CREATE_REWARDS"
const DELETE_CUSTOM_REWARDS = "rewards/DELETE_CUSTOM_REWARDS"
const UPDATE_REWARDS = "rewards/UPDATE_REWARDS"

const loadRewards = (rewards) => {
    return{
        type:LOAD_REWARDS,
        payload:rewards
    }
}

const removeReward = (rewardId) => {
    return {
        type:BUY_REWARDS,
        payload:rewardId
    }
}

const deleteReward = (rewardId) => {
    return{
        type: DELETE_CUSTOM_REWARDS,
        payload: rewardId
    }
}

const createReward = (newReward) => {
    return {
        type:CREATE_REWARDS,
        payload:newReward
    }
}

const updateReward = (reward) => {
    return {
        type: UPDATE_REWARDS,
        payload: reward
    }
}


export const buyReward = (reward) => async (dispatch) => {
    console.log(reward)
    const res = await csrfFetch("/api/inventory/",{
        method:"POST",
        body: JSON.stringify(reward)
    })

    if(res.ok){
        const data = await res.json()
        const deletedReward = await csrfFetch(`/api/rewards/${reward.id}`,{
            method:"DELETE"
        })

        if(deletedReward.ok){
            const message = deletedReward.json()
            await dispatch(removeReward(reward.id))
            return message
        }
    }
}


export const getRewards = () => async (dispatch) => {
    const res = await csrfFetch("/api/rewards/current");

    if(res.ok){
        const rewards = await res.json();
        dispatch(loadRewards(rewards));
        return rewards
    }
}

export const deleteCustomReward = (rewardId) => async (dispatch) => {
    const res = await csrfFetch(`/api/rewards/${rewardId}`,{
        method:"DELETE"
    })

    if(res.ok){
        const message = res.json()
        await dispatch(deleteReward(rewardId))
        return message
    }
}

export const createCustomReward = (reward) => async (dispatch) => {
    const response = await csrfFetch("/api/rewards/", {
        method: "POST",
        body: JSON.stringify(reward)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createReward(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const updateCustomReward = (rewardId, rewardBody) => async (dispatch) => {
    const response = await csrfFetch(`/api/rewards/${rewardId}`, {
        method: "PUT",
        body: JSON.stringify(rewardBody)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(updateReward(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}


const initialState = {}

const rewardsReducer = (state=initialState,action) => {
    switch(action.type){
        case LOAD_REWARDS:{
            const newState ={...state};
            const rewards = action.payload.rewards
            rewards.forEach((reward) => newState[reward.id] = reward)
            return newState;
        }
        case BUY_REWARDS:{
            const newState = {...state};
            delete newState[action.payload];
            return newState
        }
        case CREATE_REWARDS: {
            const newState = { ...state };
            const reward = action.payload.reward;
            newState[reward.id] = reward;
            return newState;
        }
        case DELETE_CUSTOM_REWARDS: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        case UPDATE_REWARDS: {
            const newState = {...state};
            const reward = action.payload.reward
            const updatedReward = {
                ...newState[reward.id],
                id: reward.id,
                title: reward.title,
                notes: reward.notes,
                cost: reward.cost,
                createdAt: reward.createdAt,
                updatedAt: reward.updatedAt
            }
        
            newState[reward.id] = updatedReward;
            return newState;
        }
        default:
            return state
    }
}


export default rewardsReducer
