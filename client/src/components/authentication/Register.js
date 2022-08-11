import useInput from "../../hooks/use-input";

import classes from "./Register.module.css";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axios from "../axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const isEmpty = (val) => val.trim() !== "";

const Register = () => {
  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput(isEmpty);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmpty);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isEmpty);

  const formIsValid = usernameIsValid && emailIsValid && passwordIsValid;

  const navigate = useNavigate();

  const registerUser = async () => {
    const user = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("/auth/register", user);
      toast.dismiss();
      toast.success(response.data.success, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/login");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    resetUsername();
    resetEmail();
    resetPassword();
  };

  const registerHandler = (event) => {
    event.preventDefault();
    registerUser();
  };

  return (
    <section className={classes.register}>
      <form onSubmit={registerHandler}>
        <div className={classes["input-group"]}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
          />
          {usernameHasError && <p>Please enter a valid username</p>}
        </div>
        <div className={classes["input-group"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && <p>Please enter a valid email</p>}
        </div>
        <div className={classes["input-group"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && <p>Please enter a valid password</p>}
        </div>
        <div className={classes.actions}>
          <button type="submit" disabled={!formIsValid}>
            Register
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
