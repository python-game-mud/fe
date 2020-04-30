import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

const Background = styled.div`
display:flex;
height: 100vh;
width: 100vw;
background-image: url('https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
align-items: center;
justify-content: center;
flex-direction: column;
background-repeat:no-repeat;
background-size: cover;
`
const LoginBox = styled.div`
background-color: rgba(255, 255, 255, 0.8);
padding:3%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Level = styled.div`
display: flex;
width: 100%;
align-items: center;
`

const Input = styled.input`
width: 75%;
height: 50px;
`

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
		<Background>
			<LoginBox >
			<form onSubmit={handleSubmit}>
				<Level>
				<h1>Username:</h1>
				<Input
					name="username"
					value={user.username}
					onChange={handleChange}
				></Input>
				</Level>
				<Level>
				<h1>Password:</h1>
				<Input
					name="password1"
					type="password"
					value={user.password1}
					onChange={handleChange}
				></Input>
				</Level>
				<Level>
				<h1>Confirm Password:</h1>
				<Input
					name="password2"
					type="password"
					value={user.password2}
					onChange={handleChange}
				></Input>
				</Level>
				<button onClick={handleSubmit}> LETS GOOOOOOO </button>
			</form>
			<h1 onClick={routeToLoginPage}>Already have an account???</h1>
			{errors.length > 0 && (
				<Level>
					{errors.map(e => (
						<span>{e} </span>
					))}
				</Level>
			)}
			</LoginBox>
		</Background>
	);
}
