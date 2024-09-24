import { useSelector,useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { getItems } from "../../redux/inventory";

function InventoryPage() {
  const dispatch = useDispatch()
  const user_items = useSelector(state => state.inventory)
  const itemsArray = Object.values(user_items)


  useEffect(() => {
    dispatch(getItems())
  },[dispatch])


  if(!itemsArray.length) return <h1>Loading...</h1>


  return(
    <>
      <h1>Inventory Page</h1>
    </>
  )
}

export default InventoryPage;
