import { useSelector } from "react-redux";
import SmallWhiteLogo from '../../static/SmallLogoWhite.png';

import ToDoList from "../ToDoList/ToDoList";

function UserHomePage() {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
      <div className="fullScreen black">

        {/* user dashboard */}
        <div className="displayFlex leftPageBorder rightPageBorder">
          {/* Avatar */}
          <div className="darkGrey">
            AVATAR PLACEHOLDER
          </div>

          {/* User info and stats */}
          <div>
            <p className="font purpleFont xx-largeFont">{sessionUser.username}!</p>
            <p className="font purpleFont mediumFont">Level: {sessionUser.level}</p>
            <p className="white">experience: {sessionUser.experience}</p>
            <p className="white">health: {sessionUser.health}</p>
          </div>

          {/* Items and equipment dashboard */}
          <div className="almostBlack itemDashboard">
            <p className="whiteFont">IMPORT ITEMS & EQUIPMENT COMPONENT</p>
          </div>
        </div>

        {/* Add task button */}
        <div>
          <button>Add Task</button>
        </div>

        {/* Checklists and Rewards Tables */}
        <div className="displayFlex spaceBetween">

          {/* Habits Table */}
          <div className="almostBlack">
            <p className="whiteFont">IMPORT HABITS COMPONENT</p>
          </div>

          {/* Dailies Table */}
          <div className="almostBlack">
            <p className="whiteFont">IMPORT DAILIES COMPONENT</p>
          </div>

          {/* To-Dos Table */}
          <div className="almostBlack">
            <ToDoList userId={sessionUser.id} />
          </div>

          {/* Rewards Table */}
          <div className="almostBlack">
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