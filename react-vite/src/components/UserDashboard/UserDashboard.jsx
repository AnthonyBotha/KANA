import { useSelector } from "react-redux";

function UserDashboard() {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <div>
      {/* user dashboard */}
      <div className="displayFlex leftPageBorder rightPageBorder spaceBetween littleTopPadding">
          {/* Avatar */}
          <div className="darkGrey littleRightMargin">
            AVATAR PLACEHOLDER
          </div>

          {/* User info and stats */}
          <div className="littleRightMargin">
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
    </div>
  )
}

export default UserDashboard;