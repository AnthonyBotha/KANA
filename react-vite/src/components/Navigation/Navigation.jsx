import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsCoin } from "react-icons/bs";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from '../OpenModalButton';
import logo from '../../static/KANA.png'
import InventorySelectionButton from "./InventorySelection";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user)

  const navLinks = sessionUser ?
    (
      <div className="displayFlex alignCenter spaceBetween">
        <div className="displayFlex largeLeftMargin">
          <NavLink to='/home' className="fontLight largeFont whiteFont">Tasks</NavLink>
          <InventorySelectionButton />
        </div>
        <div className="displayFlex alignCenter">
          <div className="displayFlex largeRightMargin">
            <div className="displayFlex alignCenter">
              <p className="x-largeFont noMargin noPadding textCenter littleRightMargin yellowFont">
                <BsCoin />
              </p>
              <p className="font whiteFont">{sessionUser.gold}</p>
            </div>
          </div>
          <div>
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          </div>
        </div>
      </div>
    )
    :
    (
      <li className="textRight">
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </li>
    )

  return (
    <ul className="dropShadow purple noMargin removeDecorations displayFlex spaceBetween alignCenter">
      <li className="displayFlex alignCenter">
        {sessionUser ?
          (
            <NavLink to="/home">
              <a href="">
                <img className="logo" src={logo} alt="logo"/>
              </a>
            </NavLink>
          )
          :
          <img className="logo" src={logo} alt="logo"/>
        }
      </li>

      <li className="rightPageBorder fullWidth">
        {navLinks}
      </li>
    </ul>
  );
}

export default Navigation;
