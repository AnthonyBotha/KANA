import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { BsCoin } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { updateCustomReward } from "../../redux/rewards";
import { deleteCustomReward } from "../../redux/rewards";
import "./CreateRewardModal.css"

function UpdateRewardModal({ rewardId }) {
    const { closeModal } = useModal();
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [cost, setCost] = useState(10);

    const dispatch = useDispatch();

    const rewards = useSelector(state => state.rewards)
    const reward = rewards[rewardId];

    useEffect(() => {
        if (reward) {
            setTitle(reward.title || "");
            setNotes(reward.notes || "");
            setCost(reward.cost || 10);
        }
    }, [reward]);



    const handleSubmit = (e) => {
        e.preventDefault();
        const rewardData = { title, notes, cost };
      
        dispatch(updateCustomReward(rewardId, rewardData));
        closeModal();
    };

    const handleDelete = () => {
        const confirmation = window.confirm("Are you sure you want to delete this reward?");
        if (confirmation) {
            dispatch(deleteCustomReward(rewardId));
            closeModal();
        }
    }

    return (
        <div id="modal" className="reward">
            <form id="modal-content" className="reward" onSubmit={handleSubmit}>
                {/* Modal Header */}
                <div className="displayFlex alignCeter spaceBetween">
                    <p className="font whiteFont largeFont">Update Reward</p>
                    <div>
                        <button className="littleRightMargin" onClick={closeModal}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </div>

                {/* Title Input */}
                <div className="reward-form-group displayFlex flexColumn noPadding">
                    <p className="font whiteFont mediumFont noMargin">Title*</p>
                    <input
                        className="littleLeftPadding littleTopMargin font almostBlackFont white noBorder topPadding littleBottomPadding littleBottomMargins roundedCorners"
                        type="text"
                        placeholder="Add a title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                {/* Notes Input */}
                <div className="reward-form-group displayFlex flexColumn noPadding">
                    <p className="font whiteFont mediumFont noMargin">Notes</p>
                    <textarea
                        className="littleLeftPadding littleTopMargin font almostBlackFont white noBorder topPadding littleBottomPadding littleBottomMargins roundedCorners"
                        placeholder="Add notes"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                    />
                </div>

                {/* Cost Input */}
                <div className="displayFlex flexColumn noPadding">
                    <p className="font whiteFont mediumFont noMargin">Cost</p>
                    <div className="coin-input-wrapper">
                        <span className="displayFlex alignCenter">
                            <BsCoin alt="Coin" className="coinIcon" />
                        </span>
                        <input
                            className="reward-input littleLeftPadding littleTopMargin font almostBlackFont white noBorder topPadding littleBottomPadding littleBottomMargins roundedCorners"
                            type="number"
                            min="1"
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                            required
                        />

                    </div>
                </div>

                {/* Delete Reward */}
                <div id="delete-reward-button" className="redFont font textCenter">
                    <p onClick={handleDelete}><FaRegTrashAlt />Delete this Reward</p>
                </div>
            </form>

        </div>
    )

}

export default UpdateRewardModal;