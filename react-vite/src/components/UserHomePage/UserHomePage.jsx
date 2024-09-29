import { useSelector, useDispatch } from "react-redux";
import SmallWhiteLogo from '../../static/SmallLogoWhite.png';
import Habits from "../Habits";
import ToDoList from "../ToDoList/ToDoList";
import Dailies from "../Dailies";
import { useEffect, useState } from "react";
import { thunkTags } from "../../redux/tags";
import UserDashboard from "../UserDashboard/UserDashboard";
import UserRewards from "../Rewards";
import AddTask from "./AddTask";
import { useNavigate } from "react-router-dom";

function UserHomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [isLoading,setLoading] = useState(true)


  useEffect(()=> {

    const checkSession = () => {
      if(!sessionUser)navigate('/')
      else setLoading(false)
    }
    dispatch(thunkTags()).then(() => checkSession())

  },[dispatch, sessionUser,navigate])


  if(isLoading) return <h1>Loading...</h1>


  return (
    <>
      <div className="fullScreenPercent black">

        <UserDashboard />

        {/* Add task button */}
        <div className="rightPageBorder textRight littleBottomMargin littleTopMargin">
          <AddTask />
        </div>

        {/* Checklists and Rewards Tables */}
        <div className="displayFlex spaceBetween rightPageBorder leftPageBorder">

          {/* Habits Table */}
          <div className="almostBlack quarterScreen roundedCorners littleRightMargin">
            <Habits userId={sessionUser.id}/>
          </div>

          {/* Dailies Table */}
          <div className="almostBlack quarterScreen roundedCorners littleRightMargin">
           <Dailies userId={sessionUser.id}/>
          </div>

          {/* To-Dos Table */}
          <div className="almostBlack quarterScreen roundedCorners littleRightMargin">
            <ToDoList userId={sessionUser.id} />
          </div>

          {/* Rewards Table */}
          <div className="almostBlack quarterScreen roundedCorners">
            <p className="whiteFont"><UserRewards sessionUser={sessionUser}/></p>
          </div>
        </div>

      </div>

      {/* footer */}
      <div className="black displayFlex alignBottom spaceBetween littleBottomPadding">
        <p className='leftPageBorder font whiteFont smallFont noMargin'>© 2024 KANA. All rights reserved.</p>
        <img className="smallLogo" src={SmallWhiteLogo} />
        <a className="rightPageBorder fontLight whiteFont smallFont" href='https://github.com/AnthonyBotha/KANA/wiki'>GitHub</a>
      </div>
    </>
  )
}

export default UserHomePage;
