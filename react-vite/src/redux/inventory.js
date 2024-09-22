//Action Types
const LOAD_USER_INVENTORY = "inventory/LOAD_USER_INVENTORY";

//Action Creators
const loadUserInventory = (inventory) => {
    return {
        type: LOAD_USER_INVENTORY,
        payload: inventory
    }
};

//Thunks
export const getUserInventory = () => async (dispatch) => {
    const response = await fetch("/api/inventory/current");

    if (response.ok) {
        const inventory = await response.json();
        dispatch(loadUserInventory(inventory));
    }
};

//Reducer
const initialState = {};

const userInventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_INVENTORY: {
            const newState = { ...state};
            console.log("Action Payload:", action.payload)
            const InventoryArr = Object.values(action.payload);
            console.log("Reducer:",InventoryArr);
            // InventoryArr.forEach(inventory => newState[inventory.id] = inventory);
            return newState;
        }
        default:
            return state;
    }
}

export default userInventoryReducer;


