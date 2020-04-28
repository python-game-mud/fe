import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { register } from "../serviceWorker";

export default function Register(props) {
	const history = useHistory();
	const [user, setUser] = useState({
		username: "",
		password: "",
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
					"http://themudgame.herokuapp.com/api/login/",
				user
			)
			.then(res => {
				console.log(res);
				localStorage.setItem("token", res.data.key);
				history.push("/game");
			})
			.catch(err => {
				console.error(err.response);
				err.response.data.non_field_errors &&
					setErrors(err.response.data.non_field_errors);
			});
	};
	const routeToRegistrationPage = e => {
		e.preventDefault();
		history.push("/register");
	};

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
					name="password"
					type="password"
					value={user.password}
					onChange={handleChange}
				></input>
				<button onClick={handleSubmit}> LETS GOOOOOOO </button>
			</form>
			<h1 onClick={routeToRegistrationPage}>Don't have an account???</h1>
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
