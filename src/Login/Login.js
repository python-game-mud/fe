import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";

const Centerer = styled.div`
	background-image: url('https://images.unsplash.com/photo-1565138146061-e29b079736c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60');
	background-repeat:no-repeat;
	background-size: cover;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
`;
const LoginArea = styled.div`
	background-color: rgb(34, 139, 34, 0.5);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 3%;
	border-radius: 10px;
`;

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
		password: "",
	});
	const [errors, setErrors] = useState([]);
	const monkey = new Audio("http://soundbible.com/grab.php?id=1188&type=mp3")
	const handleChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const handleSubmit = e => {
		monkey.play()
		e.preventDefault();
		axios
			.post(
				"https://cors-anywhere.herokuapp.com/" +
				"http://themudgame.herokuapp.com/api/login/",
				user
			)
			.then(res => {
				console.log(res);
				localStorage.setItem("the_mud_game_token", res.data.key);
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
		<Centerer>
			<LoginArea>
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
							name="password"
							type="password"
							value={user.password}
							onChange={handleChange}
						></Input>
					</Level>
					
				</form>
				<Button onClick={handleSubmit}> LETS GOOOO </Button>
				<h1 onClick={routeToRegistrationPage}>Don't have an account???</h1>
			</LoginArea>
			{errors.length > 0 && (
				<div>
					{errors.map(e => (
						<span>{e} </span>
					))}
				</div>
			)}
		</Centerer>
	);
}
