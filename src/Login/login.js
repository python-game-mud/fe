import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import { ReactComponent as CharacterBoyFaceLeft } from "../sprites/character_boy_faceLeft.svg";

export default function Register(props) {
	const [loading, setLoading] = useState(true)
	const history = useHistory();
	const [user, setUser] = useState({
		username: "",
		password: "",
	});
	const [errors, setErrors] = useState([]);


	const Page = styled.video`
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -1;
	transform: translateX(-50%) translateY(-50%);
	`
	const Centerer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	`
	const LoginArea = styled.div`
	background-color: rgb(34,139,34, .5);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 3%;
	border-radius: 10px
	`

	const Loading = styled.h1`
	color: red;
	margin: 0;
	text-align: center;
	font-size: 4rem;
	`

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
		<Centerer>
				<Page src={require('./jungle.mp4')} autoPlay onEnded={() => {setLoading(false) }} /> 
				{loading == true ? 
				<div>
				<CharacterBoyFaceLeft width={'500px'} height={`500px`} />
				<Loading> LOADING...</Loading>
				</div>
				:

				<LoginArea>
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
				</form>
				<button onClick={handleSubmit}> LETS GOOOOOOO </button>
				<h1 onClick={routeToRegistrationPage}>Don't have an account???</h1>
				</LoginArea>
				
				}
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
