import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";

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
`;
const Centerer = styled.div`
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

export default function Login(props) {
	// const [loading, setLoading] = useState(true);
		e.preventDefault();
		history.push("/register");
	};

	return (
		<Centerer>
			<LoginArea>
				<form onSubmit={handleSubmit}>
					<h1>Username:</h1>
					<input
						name="username"
						type="text"
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
			{errors.length > 0 && (
				<div>
					{errors.map(e => (
						<span>{e} </span>
					))}
				</div>
			)}
			<div>
				<p>Don't have an account yet?</p>
				<p>
					Click <Link to="/register">here</Link> to register.
				</p>
			</div>
		</Centerer>
	);
}
