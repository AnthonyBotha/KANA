import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";
import { getItems } from "../../redux/inventory";
import { BsCoin } from "react-icons/bs";
import "./EquippedItems.css"
import ManageEquippedModal from "./EquippedModal";

function EquipedItems(){
    const dispatch = useDispatch()
    const user_items = useSelector(state => state.inventory)
    const itemsArray = Object.values(user_items).filter(item => item.equipped == true)

    const {setModalContent} = useModal();

    useEffect(() => {
        dispatch(getItems())
    },[dispatch])

    return(
        <>
            <h2 className="font purpleFont">Equipped Items</h2>

            <div className="equipped-container">
                {itemsArray.length > 0 ? (
                    <div className="equipped-carousel">
                        {itemsArray.map(item => (
                            <div key={item.id} className="equipped-card">
                                <div onClick={() => setModalContent(<ManageEquippedModal itemId={item.id} itemName={item.name} itemImage={item.itemImg} itemDescription={item.description} itemValue={item.cost}/>)}>
                                    <img src={item.itemImg} alt={item.name} className="reward-image" />
                                    <h5 className="reward-name">{item.name}</h5>
                                    <div className="reward-name"><BsCoin className="yellowFont" />{item.cost}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ): (<p>No Items Equipped</p>)}
            </div>
        </>
    )
}


export default EquipedItems
