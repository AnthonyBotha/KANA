import { csrfFetch } from "./.csrf";

const LOAD_REWARDS = "rewards/LOAD_REWARDS"

const loadRewards = (rewards) => {
    return{
        type:LOAD_REWARDS,
        payload:rewards
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
        default:
            return state
    }
}


export default rewardsReducer
