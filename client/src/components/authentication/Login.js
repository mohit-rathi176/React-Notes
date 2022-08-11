import useInput from "../../hooks/use-input";

import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axios from "../axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const isEmpty = (val) => val.trim() !== "";

const Login = (props) => {
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

  const formIsValid = emailIsValid && passwordIsValid;

  let navigate = useNavigate();

  const loginUser = async () => {
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("/auth/login", user, {
        withCredentials: true,
      });
      toast.dismiss();
      toast.success(response.data.success, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      resetEmail();
      resetPassword();
      return true;
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    }
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    const isLegit = await loginUser();
    if (isLegit) {
      props.login();
      navigate("/home", { replace: true });
    }
  };

  return (
    <section className={classes.login}>
      <form onSubmit={loginHandler}>
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
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
