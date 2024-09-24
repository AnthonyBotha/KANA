const LOAD_INVENTORY = "inventory/LOAD_INVENTORY"


const loadInventory = (items) => {
    return{
        type:LOAD_INVENTORY,
        payload:items
    }
}


export const getItems = () => async (dispatch) => {
    const response = await fetch("/api/inventory/current");

    if(response.ok){
        const items = await response.json();
        dispatch(loadInventory(items))
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
    default:
        return state
    }
}


export default inventoryReducer;
