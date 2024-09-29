import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getRewards } from "../../redux/rewards";
import { useModal } from "../../context/Modal";
import ManageRewardModal from "./rewardsModal";
import UserCustomRewards from "./ViewCustomRewards";
import { BsCoin } from "react-icons/bs";
import "./rewards.css"


function UserRewards({ sessionUser }) {
    const dispatch = useDispatch();
    const rewards = useSelector(state => state.rewards)
    const rewardArr = Object.values(rewards).filter(reward => reward.custom == false)
    const { setModalContent } = useModal();
    const [showCustom, setShowCustom] = useState(false);

    let newRewardsArr = []

    if (rewardArr.length >= 8) {
        newRewardsArr.push(rewardArr[0], rewardArr[1], rewardArr[2],
            rewardArr[3], rewardArr[4], rewardArr[5], rewardArr[6], rewardArr[7],
            rewardArr[8], rewardArr[9]
        )
    }
    else {
        rewardArr.forEach((reward) => newRewardsArr.push(reward))
    }


    useEffect(() => {
        dispatch(getRewards())
    }, [dispatch, sessionUser.id])

    return (
        <>
            <div className="displayFlex alignBottom spaceBetween">
                <h2 className="font purpleFont">Rewards</h2>

                <div className="displayFlex littlePadding">
                    <p className={`fontLight whiteFont smallFont littlePadding ${!showCustom ? "active-tab" : ""}`}
                        onClick={() => setShowCustom(false)}
                    >
                        Default
                    </p>
                    <p className={`fontLight whiteFont smallFont littlePadding ${!showCustom ? "active-tab" : ""}`}
                        onClick={() => setShowCustom(true)}
                    >
                        Custom
                    </p>
                </div>

            </div>

            <div className="rewards-container">
                {showCustom ? (
                    <UserCustomRewards />
                ) : (
                    newRewardsArr.length > 0 ? (
                        <div className="rewards-carousel">
                            {newRewardsArr.map(reward => (
                                <div key={reward.id} className="rewards-card">
                                    <div onClick={() => setModalContent(<ManageRewardModal reward={reward} />)}>
                                        <img src={reward.rewardImg} alt={reward.name} className="reward-image" />
                                        <h5 className="reward-name">{reward.title}</h5>
                                        <div className="reward-name"><BsCoin className="coin" />{reward.cost}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (<p>All Rewards Purchased</p>)
                )}


            </div>
        </>
    )
}



export default UserRewards
