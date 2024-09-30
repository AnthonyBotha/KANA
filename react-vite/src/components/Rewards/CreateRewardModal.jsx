import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { BsCoin } from "react-icons/bs";
import { createCustomReward } from "../../redux/rewards";
import "./CreateRewardModal.css"

function CreateRewardModal() {
    const { closeModal } = useModal();
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [cost, setCost] = useState(10);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const rewardData = { title, notes, cost };
        console.log("Reward data submitted:", rewardData);
        // Handle reward creation logic here
        dispatch(createCustomReward(rewardData));
        closeModal();
    };

    return (
        <div id="modal" className="reward">
            <form id="modal-content" className="reward" onSubmit={handleSubmit}>
                {/* Modal Header */}
                <div className="displayFlex alignCeter spaceBetween">
                    <p className="font whiteFont largeFont">Create Reward</p>
                    <div>
                        <button className="littleRightMargin" onClick={closeModal}>Cancel</button>
                        <button type="submit">Create</button>
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


            </form>

        </div>
    )

}

export default CreateRewardModal;