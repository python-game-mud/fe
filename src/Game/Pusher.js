import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Chat from "./Chat/Chat";

import { ReactComponent as CharacterBoyFaceLeft } from "../sprites/character_boy_faceLeft.svg";
import { ReactComponent as CharacterBoyFaceRight } from "../sprites/character_boy_faceRight.svg";

const SideBar = styled.div`
	width: 20vw;
	height: 100vh;
	background-color: red;
	position: absolute;
	right: 0;
`;
const ButtonHolder = styled.div`
	background: black;
	width: 80%;
	height: 30%;
	position: absolute;
	left: 10%;
	top: 10%;
`;

const Right = styled.div`
	position: relative;
	left: 56%;
	top: 8%;
	border-color: transparent purple;
	border-style: solid;
	border-width: 40px 0px 40px 80px;
	height: 0px;
	width: 0px;
`;

const Left = styled.div`
	position: relative;
	left: 5%;
	top: 28%;
	border-color: transparent purple;
	border-style: solid;
	border-width: 40px 80px 40px 0px;
	height: 0px;
	width: 0px;
`;
const Up = styled.div`
	position: relative;
	left: 32.5%;
	top: -35%;
	border-color: purple transparent;
	border-style: solid;
	border-width: 0px 40px 70px 40px;
	height: 0px;
	width: 0px;
`;

const Down = styled.div`
	position: relative;
	left: 32.5%;
	top: -5%;
	border-color: purple transparent;
	border-style: solid;
	border-width: 70px 40px 0px 40px;
	height: 0px;
	width: 0px;
`;

export default function Pusher(props) {
	const [left, setLeft] = useState(10);
	const [top, setTop] = useState(10);
	const [characterDirection, setCharacterDirection] = useState("right");

	const Character = styled.div`
		position: absolute;
		left: ${left}%;
		top: ${top}%;
	`;

	const moveLeft = () => {
		setCharacterDirection("left");
		setLeft(left - 10);
		// console.log("LEFT:", left);
	};

	const moveRight = () => {
		setCharacterDirection("right");
		setLeft(left + 10);
		// console.log("LEFT:", left);
	};

	const moveUp = () => {
		setTop(top - 10);
		// console.log("TOP:", top);
	};

	const moveDown = () => {
		setTop(top + 10);
		// console.log("TOP:", top);
	};

	// React.useEffect(function moveCharacter() {
	// 	const keyDownListener = document.addEventListener("keydown", e => {
	// 		switch (e.key.toLowerCase()) {
	// 			case "arrowup":
	// 				moveUp();
	// 				break;
	// 			case "arrowleft":
	// 				moveLeft();
	// 				break;
	// 			case "arrowright":
	// 				moveRight();
	// 				break;
	// 			case "arrowdown":
	// 				moveDown();
	// 			default:
	// 				// do nothing
	// 				break;
	// 		}
	// 	});

	// return () => document.removeEventListener("keydown", keyDownListener);
	// }, []);

	return (
		<>
			<SideBar>
				<div>
					<Link to="/logout">
						<button>logout</button>
					</Link>
				</div>
				<ButtonHolder>
					<Left onClick={moveLeft}></Left>
					<Right onClick={moveRight}> </Right>
					<Up onClick={moveUp}> </Up>
					<Down onClick={moveDown}></Down>
				</ButtonHolder>

				{/* <Chat /> */}
			</SideBar>
			<Character>
				{characterDirection.toLowerCase() === "left" ? (
					<CharacterBoyFaceLeft height="300px" width="300px" />
				) : (
					<CharacterBoyFaceRight height="300px" width="300px" />
				)}
			</Character>
		</>
	);
}
