import { useDispatch, useSelector } from "react-redux";



function EquipedItems({sessionUser}){
    const dispatch = useDispatch()
    const user_items = useSelector(state => state.inventory)
}
