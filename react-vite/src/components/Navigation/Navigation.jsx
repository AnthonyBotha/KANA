import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from '../OpenModalButton';
import logo from '../../static/KANA.png'
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user)

  const navLinks = sessionUser ?
    (
      <div>
        <div className="displayFlex largeLeftMargin">
          <p className="fontLight largeFont whiteFont">Tasks</p>
          <p className="fontLight largeFont whiteFont leftMargin">Inventory</p>
        </div>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      </div>
    )
    :
    (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </li>
    )

  return (
    <ul className="dropShadow purple noMargin removeDecorations displayFlex spaceBetween alignCenter">
      <li className="displayFlex alignCenter">
        <NavLink to="/">
          <a href="">
            <img className="logo" src={logo} alt="logo"/>
          </a>
        </NavLink>
      </li>

      <li className="rightPageBorder">
        {navLinks}
      </li>
    </ul>
  );
}

export default Navigation;
