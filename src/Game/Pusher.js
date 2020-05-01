import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import InfoStream from './InfoStream'
import Chat from "./Chat/Chat";
import { CurrentRoomCtx } from "../App";

import { ReactComponent as CharacterBoyFaceLeft } from "../sprites/character_boy_faceLeft.svg";
import { ReactComponent as CharacterBoyFaceRight } from "../sprites/character_boy_faceRight.svg";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { ReactComponent as Doors } from "../sprites/door.svg";
import { ReactComponent as Doors2 } from "../sprites/door2.svg";
import Decorations from './decorations'

const SideBar = styled.div`
	width: 20vw;
	height: 100vh;
	background-color: red;
	position: absolute;
	right: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`;
// const ButtonHolder = styled.div`
// 	background: black;
// 	width: 80%;
// 	height: 30%;
// 	position: absolute;
// 	left: 10%;
// 	top: 10%;
// `;

// const Right = styled.div`
// 	position: relative;
// 	left: 56%;
// 	top: 8%;
// 	border-color: transparent purple;
// 	border-style: solid;
// 	border-width: 40px 0px 40px 80px;
// 	height: 0px;
// 	width: 0px;
// `;

// const Left = styled.div`
// 	position: relative;
// 	left: 5%;
// 	top: 28%;
// 	border-color: transparent purple;
// 	border-style: solid;
// 	border-width: 40px 80px 40px 0px;
// 	height: 0px;
// 	width: 0px;
// `;
// const Up = styled.div`
// 	position: relative;
// 	left: 32.5%;
// 	top: -35%;
// 	border-color: purple transparent;
// 	border-style: solid;
// 	border-width: 0px 40px 70px 40px;
// 	height: 0px;
// 	width: 0px;
// `;

// const Down = styled.div`
// 	position: relative;
// 	left: 32.5%;
// 	top: -5%;
// 	border-color: purple transparent;
// 	border-style: solid;
// 	border-width: 70px 40px 0px 40px;
// 	height: 0px;
// 	width: 0px;
// `;

const Room = styled.div`
	position: fixed;
	width: 60%;
	height: 60%;
	background-color: green;
	top: 20%;
	left: 10%;
	border: 30px solid brown;
`;

const ButtonHolder = styled.div`
background: black;
width: 80%;
height: 30%;
position: absolute;
left: 10%;
top: 10%;
`

const Right = styled.div`
position: relative;
left: 64%;
top: 8%;
border-color: transparent purple;
border-style: solid;
border-width:  40px 0px 40px 80px;
height: 0px;
width: 0px;
`

const Left = styled.div`
position: relative;
left: 12%;
top: 37%;
border-color: transparent purple;
border-style: solid;
border-width:  40px 80px 40px 0px;
height: 0px;
width: 0px;
`
const Up = styled.div`
position: relative;
left: 38%;
top: -45%;
border-color: purple transparent;
border-style: solid;
border-width: 0px 40px 70px 40px;
height: 0px;
width: 0px;
`

const Down = styled.div`
position: relative;
left: 38%;
top: -16%;
border-color: purple transparent;
border-style: solid;
border-width: 70px 40px 0px 40px;
height: 0px;
width: 0px;
`

const Door = styled.div`
	position: fixed;
	left: 60%;
	top: 30%;
`;
const EastDoor = styled.div`
	position: fixed;
	left: 0%;
	top: 30%;
`;
const NorthDoor = styled.div`
	position: fixed;
	left: 30%;
	top: 0%;
`;
const SouthDoor = styled.div`

	position: fixed;
	left: 30%;
	top: 60%;
`;
const Title = styled.h1`
font-size: 4rem;
margin: 0;
color: orange;
`
const RoomTitle = styled.div`
position: absolute;
bottom: 2%;
width: 80%;
display: flex;
justify-content: center;
margin: 0;
`

export default function Pusher() {
	const [left, setLeft] = useState(10);
	const [top, setTop] = useState(10);
	const [doorTop, setDoorTop] = useState(false);
	const [doorLeft, setDoorLeft] = useState(false);
	const [doorBot, setDoorBot] = useState(false);
	const [doorRight, setDoorRight] = useState(true)
	const [info, setInfo] = useState("");
	const [id, setId] = useState(0)
	const [characterDirection, setCharacterDirection] = useState("right");
	const [CurrentRoom, setCurrentRoom] = useState()
	// const { setCurrentRoom } = useContext(CurrentRoomCtx);

	const Character = styled.div`
		position: absolute;
		left: ${left}%;
		top: ${top}%;
	`;

	useEffect(
		function fetchData() {
			setDoorRight(false)
			setDoorBot(false)
			setDoorLeft(false)
			setDoorTop(false)
			if (info.title !== undefined) {
				setDoorLeft(true)
				setDoorRight(true)
				if (info.title.charAt(7) == 9) {
					setDoorTop(true);
					if(info.title.charAt(6) == 1 || info.title.charAt(6) == 3 || info.title.charAt(6) == 5 || info.title.charAt(6) == 7 ) {
						setDoorLeft(false)
						setDoorBot(false)
					}
					else{
						setDoorRight(false)
						setDoorBot(false)
					}
				}
				if (info.title.charAt(7) == 0){
					setDoorBot(true);
					if(info.title.charAt(6) == 1 || info.title.charAt(6) == 3 || info.title.charAt(6) == 5 || info.title.charAt(6) == 7 ) {
						setDoorRight(false)
						setDoorTop(false)
					}
					else{
						setDoorLeft(false)
					}
				}
			}
			axiosWithAuth()
				.get("api/adv/init/")
				.then(res => {
					
					setInfo(res.data);
					setCurrentRoom(res.data.title.split(" ")[1]);
				})
				.catch(err => {
					console.log(err.response);
				});
		},
		[left, top]
	);


	useEffect(() =>{
		if (info.title !== undefined) {
			setId(info.title.charAt(6) + info.title.charAt(7))
		}
	}, [left, top])
	
	function handleEast(res) {
		if (res.data.error_msg == "") {
			setLeft(10);
			setInfo(res);
			
		} else {
			setInfo(res);
			setLeft(60);
			console.log("error", info.error_msg);
		}
	}
	function handleWest(res) {
		if (res.data.error_msg == "") {
			setLeft(60);
			setInfo(res);
			
		} else {
			setInfo(res);
			setLeft(10);
			console.log("error", info.error_msg);
		}
	}
	function handleNorth(res) {
		if (res.data.error_msg == "") {
			setTop(60);
			setInfo(res);
		
		} else {
			setInfo(res);
			setTop(10);
			console.log("error", info.error_msg);
		}
	}
	function handleSouth(res) {
		if (res.data.error_msg == "") {
			setTop(10);
			setInfo(res);

		} else {
			setInfo(res);
			setTop(60);
			console.log("error", info.error_msg);
		}
	}
	if (left > 60) {
		axiosWithAuth()
			.post("/api/adv/move", { direction: "e" })
			.then(res => {
				handleEast(res);
			})
			.catch(err => {
				console.log(err);
			});
	}
	if (left < 10) {
		axiosWithAuth()
			.post("/api/adv/move", { direction: "w" })
			.then(res => {
				handleWest(res);
			})
			.catch(err => {
				console.log(err);
			});
	}
	if (top < 10) {
		axiosWithAuth()
			.post("/api/adv/move", { direction: "n" })
			.then(res => {
				handleNorth(res);
			})
			.catch(err => {
				console.log(err);
			});
	}
	if (top > 60) {
		axiosWithAuth()
			.post("/api/adv/move", { direction: "s" })
			.then(res => {
				handleSouth(res);
			})
			.catch(err => {
				console.log(err);
			});
	}
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


	return (
		<>
			<SideBar>
				{/* <div>
					<Link to="/logout">
						<button>logout</button>
					</Link>
				</div> */}
				<InfoStream info={info} id={id}/>
				<ButtonHolder>
					<Left onClick={moveLeft}></Left>
					<Right onClick={moveRight}> </Right>
					<Up onClick={moveUp}> </Up>
					<Down onClick={moveDown}></Down>
				</ButtonHolder>

				{/* <Chat /> */}
			</SideBar>
			<Decorations id={id}/>
			<Room />
			{doorTop  ? (
				<NorthDoor>
					<Doors height="500px" width="500px" />
				</NorthDoor>
			) : null}
			{doorRight ?
			<Door>
				<Doors2 height="500px" width="500px" />
			</Door> : null}
			{doorLeft? 
			<EastDoor>
				<Doors2 height="500px" width="500px" />
			</EastDoor> : null}

			{doorBot? 
			<SouthDoor>
				<Doors height="500px" width="500px" />
			</SouthDoor> : null}
			<RoomTitle>
				<Title>
					Room {id}
				</Title>
			</RoomTitle>
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
