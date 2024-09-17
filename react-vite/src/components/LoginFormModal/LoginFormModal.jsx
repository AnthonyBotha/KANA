import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import SmallLogo from '../../static/SmallLogoWhite.png';


function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };




  const demoLogin = async (e) => {
    e.preventDefault();

    const res = await dispatch(thunkLogin({
      email: "demo@aa.io",
      password: "password"
    }))

    if (res) {
      setErrors(res);
    } else {
      closeModal();
    }
  }

  return (
    <div className="displayFlex flexColumn alignCenter">
      <img className="logo bottomMargin" src={SmallLogo} />
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="fullWidth darkGrey noBorder topPadding littleBottomPadding littleBottomMargin roundedCorners"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          <input
            className="fullWidth darkGrey noBorder topPadding littleBottomPadding littleBottomMargin roundedCorners"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <div className='displayFlex flexColumn'>
          <button type="submit">Log In</button>
          <button type="submit"
                  className="purpleFont black"
                  onClick={() => demoLogin()}>Demo Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
