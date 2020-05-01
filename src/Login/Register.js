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
width: 50%;
border-radius: 10px;
`

const Level = styled.div`
display: flex;
width: 100%;
align-items: center;
margin: 0;
justify-content: space-evenly;
`

const Input = styled.input`
width: 75%;
height: 50px;
font-size: 2rem;
`

const Label = styled.h1`
width: 500px;
`

const Button = styled.button`
width: 400px;
height: 100px;
background: gold;
border: 1px solid black;
font-size: 3rem;

&:hover{
	color: gold;
	border: 3px solid gold;
	background: black;
}
`

export default function Register(props) {
	const history = useHistory();
	const [user, setUser] = useState({
		username: "",
		password1: "",
		password2: "",
	});
	const [errors, setErrors] = useState([]);
	const monkey = new Audio('http://soundbible.com/grab.php?id=1149&type=mp3')
	const handleChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		monkey.play()
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
				<Label>Username:</Label>
				<Input
					name="username"
					value={user.username}
					onChange={handleChange}
				></Input>
				</Level>
				<Level>
				<Label>Password:</Label>
				<Input
					name="password1"
					type="password"
					value={user.password1}
					onChange={handleChange}
				></Input>
				</Level>
				<Level>
				<Label>Confirm Password:</Label>
				<Input
					name="password2"
					type="password"
					value={user.password2}
					onChange={handleChange}
				></Input>
				</Level>
			</form>
			<Button onClick={handleSubmit}> LETS GOOOO </Button>
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
