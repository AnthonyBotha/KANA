import { csrfFetch } from "./.csrf";

const LOAD_INVENTORY = "inventory/LOAD_INVENTORY"
const DELETE_FROM_INVENTORY = "inventory/DELETE_FROM_INVENTORY"
const EQUIP_ITEM = 'inventory/EQUIP_ITEM'

const loadInventory = (items) => {
    return{
        type:LOAD_INVENTORY,
        payload:items
    }
}

const deleteFromInventory = (itemId) => {
    return{
        type:DELETE_FROM_INVENTORY,
        payload:itemId
    }
}

const updateItemInventory = (item) => {
    return {
        type:EQUIP_ITEM,
        payload:item
    }
}


export const getItems = () => async (dispatch) => {
    const response = await fetch("/api/inventory/current");

    if(response.ok){
        const items = await response.json();
        dispatch(loadInventory(items))
    }
}

export const equipItem = (itemId) => async(dispatch) => {
    const res = await csrfFetch(`/api/inventory/${itemId}`, {
        method:"PUT"
    })

    if(res.ok){
        const data = await res.json()
        dispatch(updateItemInventory(data))
        await dispatch(getItems());
        return data
    }else if (res.status < 500) {
        const errorMessages = await res.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
}
};

export const deleteItem = (itemId,ItemImage) => async (dispatch) => {
    const item ={
        itemImg:ItemImage
    }
    const backToRewards = await csrfFetch(`/api/rewards/user_rewards`,{
        method:'POST',
        body:JSON.stringify(item)
    })

    if(backToRewards.ok){
        // const data= backToRewards.json()
        const response = await csrfFetch(`/api/inventory/${itemId}`,{
            method:"DELETE"
        })

        if (response.ok){
            const conf = await response.json()
            if (conf.message ==  "Successfully deleted"){
                dispatch(deleteFromInventory(itemId));
                await dispatch(getItems());
                return conf;
            }
        }

    }


}

const initialState = {};

const inventoryReducer = (state=initialState,action) => {
    switch(action.type){
        case LOAD_INVENTORY:{
            const newState = {...state};
            const items = action.payload.items
            items.forEach((item) => {
                newState[item.id] = item
            })
            return newState
        }
        case DELETE_FROM_INVENTORY:{
            const newState ={...state};
            delete newState[action.payload];
            return newState
        }
        case EQUIP_ITEM:{
            const newState = {...state};
            delete newState[action.payload.id]
            newState[action.payload.id] = action.payload
            return newState;
        }
    default:
        return state
    }
}


export default inventoryReducer;
