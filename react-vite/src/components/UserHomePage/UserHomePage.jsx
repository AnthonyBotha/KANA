import { useSelector, useDispatch } from "react-redux";
import SmallWhiteLogo from '../../static/SmallLogoWhite.png';

import ToDoList from "../ToDoList/ToDoList";
import Dailies from "../Dailies";
import { useEffect } from "react";
import { thunkTags } from "../../redux/tags";
import UserDashboard from "../UserDashboard/UserDashboard";

function UserHomePage() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)


  useEffect(()=> {
    dispatch(thunkTags())
  },[sessionUser])


  return (
    <>
      <div className="fullScreen black">

        <UserDashboard />

        {/* Add task button */}
        <div className="rightPageBorder textRight littleBottomMargin littleTopMargin">
          <button>Add Task</button>
        </div>

        {/* Checklists and Rewards Tables */}
        <div className="displayFlex spaceBetween rightPageBorder leftPageBorder">

          {/* Habits Table */}
          <div className="almostBlack quarterScreen roundedCorners littleRightMargin">
            <p className="whiteFont">IMPORT HABITS COMPONENT</p>
          </div>

          {/* Dailies Table */}
          <div className="almostBlack quarterScreen roundedCorners littleRightMargin">
            <p className="whiteFont"><Dailies userId={sessionUser.id}/></p>
          </div>

          {/* To-Dos Table */}
          <div className="almostBlack quarterScreen roundedCorners littleRightMargin">
            <ToDoList userId={sessionUser.id} />
          </div>

          {/* Rewards Table */}
          <div className="almostBlack quarterScreen roundedCorners">
            <p className="whiteFont">IMPORT REWARDS COMPONENT</p>
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
