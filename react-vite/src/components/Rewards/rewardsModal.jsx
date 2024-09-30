import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { buyReward } from "../../redux/rewards";
import deleteCustom from '../../redux/rewards'
import { BsCoin } from "react-icons/bs";


const ManageRewardModal = ({reward}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [message, setMessage] = useState("");


    const handleDelete = async () => {
        const result = true

        if (result) {
            dispatch(deleteCustom(reward.id))
            setMessage(`${reward.title} Deleted Successfully.`);

            setTimeout(() => {
                closeModal();
            }, 2000);
        }
    };

    const handleBuy = async () => {
        const result = true

        if (result) {
            dispatch(buyReward(reward))
            setMessage(`${reward.title} Bought Sucessfully.`);

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
                        <img src={reward.rewardImg} alt={reward.title} className="inventory-image-modal" />
                        <h3 className="font whiteFont inventory-name-modal">{reward.title}</h3>
                        <p className="font whiteFont description">{reward.notes}</p>
                        <p className="font whiteFont value"><BsCoin className="coin yellowFont rewardsModal" />{reward.cost}</p>
                    </div>
                    <div className="item-action-buttons">
                        <span><button className="small-button" onClick={handleBuy}>Buy</button></span>

                        {reward.custom == true && (<span><button className="small-button" onClick={handleDelete}>Delete</button></span>)}
                    </div>

                </>
            ) : (
                <h3 className="inventory-action-confirmation">{message}</h3>
            )
            }
        </div >
    );
}

export default ManageRewardModal;
