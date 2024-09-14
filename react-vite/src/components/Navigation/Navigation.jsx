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
      <div className="displayFlex alignCenter spaceBetween">
        <div className="displayFlex largeLeftMargin">
          <p className="fontLight largeFont whiteFont">Tasks</p>
          <p className="fontLight largeFont whiteFont leftMargin">Inventory</p>
        </div>
        <div>
          <li>
            <ProfileButton user={sessionUser} />
          </li>
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
        <NavLink to="/">
          <a href="">
            <img className="logo" src={logo} alt="logo"/>
          </a>
        </NavLink>
      </li>

      <li className="rightPageBorder fullWidth">
        {navLinks}
      </li>
    </ul>
  );
}

export default Navigation;
