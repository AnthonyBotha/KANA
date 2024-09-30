import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import './SignupForm.css';
import { useModal } from "../../context/Modal";
import AvatarModal from "../Avatar/AvatarModal";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setModalContent } = useModal();

  if (sessionUser) return <Navigate to="/home" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    if (!email.includes('@')){
      return setErrors({
        email:
          "Email is Invaild",
      })
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      setModalContent(<AvatarModal/>)
    }
  };

  return (
    <div className="frontPage displayFlex flexColumn alignCenter bottomPageBorder">
      <h1 className="font whiteFont">Sign Up</h1>
      <p className="font whiteFont smallFont textCenter">Username must be 1-20 characters, containing only letters a to z,
        numbers 0 to 9, hyphens, or underscores, and cannot include any
        inappropriate terms.
      </p>
      {errors.server && <p className="font whiteFont smallFont textCenter">{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="fullWidth darkPurple noBorder topPadding littleBottomPadding littleBottomMargin roundedCorners"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="font whiteFont smallFont textCenter">{errors.email}</p>}
        <label>
          <input
            className="fullWidth darkPurple noBorder topPadding littleBottomPadding littleBottomMargin littleTopMargin roundedCorners"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="font whiteFont smallFont textCenter">{errors.username}</p>}
        <label>
          <input
            className="fullWidth darkPurple noBorder topPadding littleBottomPadding littleBottomMargin littleTopMargin roundedCorners"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="font whiteFont smallFont textCenter">{errors.password}</p>}
        <label>
          <input
            className="fullWidth darkPurple noBorder topPadding littleBottomPadding littleBottomMargin littleTopMargin roundedCorners"
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="font whiteFont smallFont textCenter">{errors.confirmPassword}</p>}
        <button className="dropShadow" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
