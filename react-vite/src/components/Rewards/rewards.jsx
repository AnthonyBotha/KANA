import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import { getRewards } from "../../redux/rewards";
import "./rewards.css"
function UserRewards({sessionUser}){
    const dispatch = useDispatch();
    const rewards= useSelector(state => state.rewards)
    const rewardArr= Object.values(rewards).filter(reward => reward.custom == false)
    console.log(rewardArr)
    useEffect(() => {
        dispatch(getRewards())
    },[dispatch,sessionUser.id])

    return(
    <>
        <div className="displayFlex alignBottom spaceBetween">
            <h2 className="font purpleFont">Rewards</h2>

            <div className="displayFlex littlePadding">
                <p className="fontLight whiteFont smallFont littlePadding">All</p>
                <p className="fontLight whiteFont smallFont littlePadding">Custom</p>
            </div>

        </div>

        <div>
            {rewardArr.map(reward => (
                <div key={reward.id}>
                    <div>
                        <img src={reward.rewardImg} alt={reward.name} className="reward-image" />
                        <h5 className="reward-name">{reward.title}</h5>
                    </div>
                </div>
            ))}
        </div>
    </>
    )
}



export default UserRewards
