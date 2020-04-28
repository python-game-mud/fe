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
			})
			.catch(err => {
				console.log(err);
			});
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
			<h1 onClick={() => history.push("/login")}>Already have an account???</h1>
		</div>
	);
}
