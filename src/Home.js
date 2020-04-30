import React from "react";
import { Link } from "react-router-dom";
import { getToken } from "./utils/axiosWithAuth";
import styled from "styled-components";

const Centered = styled.div`
	background-color: #282c34;
	width: 100%;
	height: 100vh;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const BigRed = styled.div`
	width: 400px;
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: red;
	color: white;
	border: 4px solid black;

	button {
		display: inline block;
		width: 200px;
		height: 50px;
		border: 2px solid black;
		background-color: #fff;
		font-weight: bold;
		font-size: 2rem;
	}
`;

export default function Home() {
	let signedIn = getToken();
	return (
		<Centered>
			<h2 style={{ color: "#ffdf00" }}>
				Welcome to the <strong>"BEST"</strong> MUD game
			</h2>
			<BigRed>
				{!signedIn ? (
					<Link to="/login">
						<button>PLAY NOW</button>
					</Link>
				) : (
					<Link to="/game">
						<button>PLAY NOW</button>
					</Link>
				)}
			</BigRed>
		</Centered>
	);
}
