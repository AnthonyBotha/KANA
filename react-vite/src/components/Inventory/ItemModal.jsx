import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteExisingBooking } from "../../store/booking";
import { useModal } from "../../context/Modal";
import { deleteItem,equipItem } from "../../redux/inventory";
import "./ItemModal.css"

const ManageItemModal = ({ itemId, itemName, itemImage, itemDescription, itemValue,equipped,equipment }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [message, setMessage] = useState("");

    const user_items = useSelector(state => state.inventory)
    const itemsArray = Object.values(user_items).filter(item => item.equipment == false && item.equipped == true)
    const equipementArray = Object.values(user_items).filter(item => item.equipment == true && item.equipped == true)

    const handleSell = async () => {
        const result = true

        if (result) {
            dispatch(deleteItem(itemId,itemImage))
            setMessage(`${itemName} Sold Successfully.`);

            setTimeout(() => {
                closeModal();
            }, 2000);
        }
    };

    const handleEquipItems = async () => {
        let result = true

        if(itemsArray.length >= 8 && (equipped != true)){
            result=false
            setMessage(`${itemName} Couldn't be equipped. Too many items equipped!`);

            setTimeout(() => {
                closeModal();
            }, 2000);
        }

        if (result) {
            dispatch(equipItem(itemId))
            setMessage(`${itemName} Equiped Sucessfully.`);

            setTimeout(() => {
                closeModal();
            }, 2000);
        }
    };

    const handleEquipEquipment = async () => {
        let result = true

        if(equipementArray.length >= 8 && (equipped != true)){
            result=false
            setMessage(`${itemName} Couldn't be equipped. Only 8 pieces of equipment at a time!`);

            setTimeout(() => {
                closeModal();
            }, 2000);
        }

        if (result) {
            dispatch(equipItem(itemId))
            setMessage(`${itemName} Equiped Sucessfully.`);

            setTimeout(() => {
                closeModal();
            }, 2000);
        }
    };



    return (
        <div className="modal-container">
            {!message ? (
                <>
                    <div className="inventory-card-content" >
                        <img src={itemImage} alt={itemName} className="inventory-image-modal" />
                        <h3 className="font whiteFont inventory-name-modal">{itemName}</h3>
                        <p className="font whiteFont description">{itemDescription}</p>
                        <p className="font whiteFont value">Value:{itemValue}</p>
                    </div>
                    <div className="item-action-buttons">
                        {(equipped == true && !equipment) && (<span><button className="small-button" onClick={handleEquipItems}>Unmount</button></span>)}
                        {(equipped == false && !equipment) && (<span><button className="small-button" onClick={handleEquipItems}>Mount</button></span>)}
                        {(equipped == true && equipment) && (<span><button className="small-button" onClick={handleEquipEquipment}>Unmount</button></span>)}
                        {(equipped == false && equipment) && (<span><button className="small-button" onClick={handleEquipEquipment}>Mount</button></span>)}
                        <span><button className="small-button" onClick={handleSell}>Sell</button></span>
                    </div>

                </>
            ) : (
                <h3 className="inventory-action-confirmation">{message}</h3>
            )
            }
        </div >
    );
}

export default ManageItemModal;
