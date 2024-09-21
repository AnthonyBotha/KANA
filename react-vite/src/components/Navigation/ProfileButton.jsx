import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import AvatarModal from "../Avatar/AvatarModal";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const { setModalContent } = useModal();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout())
      .then(() => navigate('/'))
    closeMenu();
  };

  return (
    <>
      <div className="mouseOver rightPageBorder xx-largeFont noPadding whiteFont noBackground noBorder" onClick={toggleMenu}>
        <FaUser />
      </div>
      {showMenu && (
        <ul className="profile-dropdown lightGrey removeDecorations dropShadow largeRightPadding littleTopPadding littleBottomPadding" ref={ulRef}>
          {user ? (
            <>
              <li className="font whiteFont littleBottomMargin littleTopMargin">{user.username}</li>
              <li className="font whiteFont littleBottomMargin">{user.email}</li>
              <li className="fontLight whiteFont largeBottomMargin" onClick={() => setModalContent(<AvatarModal/>) }>Customize Avatar</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
