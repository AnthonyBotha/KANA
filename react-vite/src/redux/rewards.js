import { csrfFetch } from "./.csrf";

const LOAD_REWARDS = "rewards/LOAD_REWARDS"
const BUY_REWARDS = "rewards/BUY_REWARDS"

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


export const buyReward = (reward) => async (dispatch) => {
    const res = await csrfFetch("/api/inventory/",{
        method:"POST",
        body: JSON.stringify(reward)
    })

    if(res.ok){
        // const data = await res.json()
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

export const deleteCustom = (rewardId) => async (dispatch) => {
    const res = await csrfFetch(`/api/rewards/${rewardId}`,{
        method:"DELETE"
    })

    if(res.ok){
        const message = res.json()
        await dispatch(removeReward(rewardId))
        return message
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
        default:
            return state
    }
}


export default rewardsReducer
