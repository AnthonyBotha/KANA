import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import logo from '../../static/KANA.png'
import "./Navigation.css";

function Navigation() {
  return (
    <ul className="dropShadow purple noMargin removeDecorations displayFlex spaceBetween alignCenter">
      <li className="displayFlex alignCenter">
        <NavLink to="/">
          <a href="">
            <img className="logo" src={logo} alt="logo"/>
          </a>
        </NavLink>
        <div className="displayFlex largeLeftMargin">
          <p className="fontLight largeFont whiteFont">Tasks</p>
          <p className="fontLight largeFont whiteFont leftMargin">Inventory</p>
        </div>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
