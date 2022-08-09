import { useState } from "react";

import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axios from "../axios/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Login = (props) => {

	let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

	const emailChangeHandler = (event) => {
		setEmail(event.target.value);
	};

	const passwordChangeHandler = (event) => {
		setPassword(event.target.value);
	};

	const loginUser = async () => {
		const user = {
			email: email,
			password: password
		};

		try {
			const response = await axios.post("/auth/login", user, { withCredentials: true });
			toast.dismiss();
			toast.success(response.data.success, {
				position: toast.POSITION.BOTTOM_RIGHT
			});
			setEmail("");
			setPassword("");
			return true;
		}
		catch (error) {
			toast.dismiss();
			toast.error(error.response.data.error, {
				position: toast.POSITION.BOTTOM_RIGHT
			});
			return false;
		}
	};

	const loginHandler = async (event) => {
		event.preventDefault();
		const isLegit = await loginUser();
		if (isLegit)
		{
			props.login();
			navigate("/home", { replace: true });
		}
  };

  return (
    <section className={classes.login}>
      <form onSubmit={loginHandler}>
        <div className={classes["input-group"]}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={emailChangeHandler} />
        </div>
        <div className={classes["input-group"]}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={passwordChangeHandler} />
        </div>
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
