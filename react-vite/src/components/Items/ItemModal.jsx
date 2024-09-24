import { useState } from "react";
import { useDispatch } from "react-redux";
// import { deleteExisingBooking } from "../../store/booking";
import { useModal } from "../../context/Modal";
import "./ItemModal.css"

const ManageItemModal = ({ itemId, itemName, itemImage, itemDescription, itemValue }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [message, setMessage] = useState("");


    const handleSell = async () => {
        const result = true

        if (result) {
            setMessage(`${itemName} Sold Successfully.`);

            setTimeout(() => {
                closeModal();
            }, 2000);
        }
    };

    const handleEquip = async () => {
        const result = true

        if (result) {
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
                        <span><button className="small-button" onClick={handleEquip}>Mount</button></span>
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