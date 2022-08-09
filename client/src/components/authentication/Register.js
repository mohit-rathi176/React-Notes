import { useState } from "react";

import classes from "./Register.module.css";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axios from "../axios/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Register = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

	const usernameChangeHandler = (event) => {
		setUsername(event.target.value);
	};

	const emailChangeHandler = (event) => {
		setEmail(event.target.value);
	};

	const passwordChangeHandler = (event) => {
		setPassword(event.target.value);
	};

	const registerUser = async () => {
		const user = {
			username: username,
			email: email,
			password: password
		};

		try {
			const response = await axios.post("/auth/register", user);
			toast.dismiss();
			toast.success(response.data.success, {
				"position": toast.POSITION.BOTTOM_RIGHT
			});
      navigate("/login");
		}
		catch (error) {
			toast.dismiss();
			toast.error(error.response.data.error, {
				"position": toast.POSITION.BOTTOM_RIGHT
			});
		}

		setUsername("");
		setEmail("");
		setPassword("");
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
          />
        </div>
        <div className={classes["input-group"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
          />
        </div>
        <div className={classes["input-group"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
};

export default Register;
