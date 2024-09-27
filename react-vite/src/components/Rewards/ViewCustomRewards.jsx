import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getRewards } from "../../redux/rewards";
import { useModal } from "../../context/Modal";
import UpdateRewardModal from "./UpdateCustomReward";
import { BsCoin } from "react-icons/bs";
import "./ViewCustomRewards.css"

function UserCustomRewards() {
    const dispatch = useDispatch();
    const rewards = useSelector(state => state.rewards)
    const user = useSelector(state => state.session.user);
    
    const rewardArr = Object.values(rewards).filter(reward => reward.custom === true);
    console.log("Rewards Array:", rewardArr);
    const { setModalContent } = useModal();


    let newRewardsArr = rewardArr.slice(0, 10);


    useEffect(() => {
        dispatch(getRewards())
    }, [dispatch, user.id])

    return (
        <>

            <div className="rewards-container-custom">
                {newRewardsArr.length > 0 ? (
                    <div className="rewards-carousel-custom">
                        {newRewardsArr.map(reward => (
                            <div key={reward.id} className="rewards-card-custom darkGrey littleMargin roundedCorners">
                                <div className="reward-details-custom" onClick={() => setModalContent(<UpdateRewardModal rewardId={reward.id} />)}>
                                    <h5 className="reward-name-custom">{reward.title}</h5>
                                    <p className="reward-notes-custom">{reward.notes}</p>
                                </div>
                                <div className="reward-cost-container-custom">
                                    <div className="reward-cost-custom">
                                        <BsCoin className="yellowFont" />
                                        {reward.cost}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (<p>No Custom Rewards</p>)}

            </div>
        </>
    )
}



export default UserCustomRewards
