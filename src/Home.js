import React from "react";
import { Link } from "react-router-dom";
import { getToken } from "./utils/axiosWithAuth";
import styled from "styled-components";

const BigRed = styled.div`
	background: "red";
	color: "white";
	font-size: 5rem;
`;

export default function Home() {
	let signedIn = getToken();
	return (
		<>
			<h2>
				Welcom to the <strong>"BEST"</strong> MUD game
			</h2>
			<BigRed>
				{signedIn ? (
					<Link to="/game">
						<button>PLAY NOW</button>
					</Link>
				) : (
					<Link to="/login">
						<button>PLAY NOW</button>
					</Link>
				)}
			</BigRed>
		</>
	);
}
