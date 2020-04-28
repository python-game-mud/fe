import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Register(props) {
	const history = useHistory();
	const [user, setUser] = useState({
		username: "",
		password1: "",
		password2: "",
	});
	const [errors, setErrors] = useState([]);

	const handleChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.post(
				"https://cors-anywhere.herokuapp.com/" +
					"http://themudgame.herokuapp.com/api/registration/",
				user
			)
			.then(res => {
				console.log(res);
				localStorage.setItem("the_mud_game_token", res.data.key);
				history.push("/game");
				setErrors([]);
			})
			.catch(err => {
				setErrors([]); // reset any errors from the last submission
				console.error(err.response);
				err.response.data.password1 && setErrors(err.response.data.password1);
				err.response.data.non_field_errors &&
					setErrors([...errors, ...err.response.data.non_field_errors]);
			});
	};

	const routeToLoginPage = e => (e.preventDefault(), history.push("/login"));

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1>Username:</h1>
				<input
					name="username"
					value={user.username}
					onChange={handleChange}
				></input>
				<h1>Password:</h1>
				<input
					name="password1"
					type="password"
					value={user.password1}
					onChange={handleChange}
				></input>
				<h1>Confirm Password:</h1>
				<input
					name="password2"
					type="password"
					value={user.password2}
					onChange={handleChange}
				></input>
				<button onClick={handleSubmit}> LETS GOOOOOOO </button>
			</form>
			<h1 onClick={routeToLoginPage}>Already have an account???</h1>
			{errors.length > 0 && (
				<div>
					{errors.map(e => (
						<span>{e} </span>
					))}
				</div>
			)}
		</div>
	);
}
