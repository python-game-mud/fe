import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Chat from "./Chat/Chat";

import { ReactComponent as CharacterBoyFaceLeft } from "../sprites/character_boy_faceLeft.svg";
import { ReactComponent as CharacterBoyFaceRight } from "../sprites/character_boy_faceRight.svg";
import axiosWithAuth from "../utils/axiosWithAuth";
import { set } from "d3";
import { ReactComponent as Doors } from "../sprites/door.svg";
import { ReactComponent as Doors2 } from "../sprites/door2.svg";

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
	left: 64%;
	top: 8%;
	border-color: transparent purple;
	border-style: solid;
	border-width: 40px 0px 40px 80px;
	height: 0px;
	width: 0px;
`;

const Left = styled.div`
	position: relative;
	left: 12%;
	top: 37%;
	border-color: transparent purple;
	border-style: solid;
	border-width: 40px 80px 40px 0px;
	height: 0px;
	width: 0px;
`;
const Up = styled.div`
	position: relative;
	left: 38%;
	top: -45%;
	border-color: purple transparent;
	border-style: solid;
	border-width: 0px 40px 70px 40px;
	height: 0px;
	width: 0px;
`;

const Down = styled.div`
	position: relative;
	left: 38%;
	top: -16%;
	border-color: purple transparent;
	border-style: solid;
	border-width: 70px 40px 0px 40px;
	height: 0px;
	width: 0px;
`;

const Room = styled.div`
position: fixed;
width: 60%;
height: 60%;
background-color: green;
top: 20%;
left: 10%;
border: 30px solid brown;
`

export default function Pusher(props) {
	const [left, setLeft] = useState(10);
	const [top, setTop] = useState(10);
	const [doorTop, setDoorTop] = useState(false);
	const [doorLeft, setDoorLeft] = useState(10);
	const [info, setInfo] = useState("")
	const [characterDirection, setCharacterDirection] = useState("right");

	const Character = styled.div`
		position: absolute;
		left: ${left}%;
		top: ${top}%;
	`;

	const Door = styled.div`
		position: fixed;
		left: 60%;
		top: 30%;
	`	
	const EastDoor = styled.div`
	position: fixed;
	left: 0%;
	top: 30%;
	`
	const NorthDoor = styled.div`
	position: fixed;
	left: 30%;
	top: 0%;
	`
	useEffect(function fetchData() {


		if(info.title !== undefined){
			if(info.title.charAt(6) == 9 || info.title.charAt(7) == 9){
				setDoorTop(true)
			}
			else{
				setDoorTop(false)
			}
		}

		axiosWithAuth()
			.get("api/adv/init/")
			.then(res => {
				console.log(res);
				setInfo(res.data)
			})
			.catch(err => {console.log(err.response)});
		}, [left])

		useEffect(function fetchData() {
			axiosWithAuth()
				.get("api/adv/init/")
				.then(res => {
					console.log(res);
					setInfo(res.data)
				})
				.catch(err => {console.log(err.response)});
			}, [top])


	function handleEast(res){
		if(res.data.error_msg == ""){
		setLeft(10)
		setInfo(res)
		console.log("info", info)
		}
		else{
			setInfo(res)
			setLeft(60)
			console.log('error', info.error_msg)
		}
	}
	function handleWest(res) {
		if(res.data.error_msg == ""){
			setLeft(60)
			setInfo(res)
			console.log("info", info)
			}
			else{
				setInfo(res)
				setLeft(10)
				console.log('error', info.error_msg)
			}
	}
	function handleNorth(res) {
		if(res.data.error_msg == ""){
			setTop(60)
			setInfo(res)
			console.log("info", info)
			}
			else{
				setInfo(res)
				setTop(10)
				console.log('error', info.error_msg)
			}
	}
	function handleSouth(res) {
		if(res.data.error_msg == ""){
			setTop(10)
			setInfo(res)
			console.log("info", info)
			}
			else{
				setInfo(res)
				setTop(60)
				console.log('error', info.error_msg)
			}
	}
	if(left > 60){
		axiosWithAuth()
		.post('/api/adv/move', {"direction": "e"})
		.then(res => {handleEast(res)})
		.catch(err => {console.log(err)})
	}
	if(left < 10){
		axiosWithAuth()
		.post('/api/adv/move', {"direction": "w"})
		.then(res => {handleWest(res)})
		.catch(err => {console.log(err)})
	}
	if(top < 10){
		axiosWithAuth()
		.post('/api/adv/move', {"direction": "n"})
		.then(res => {handleNorth(res)})
		.catch(err => {console.log(err)})
	}
	if(top > 60){
		axiosWithAuth()
		.post('/api/adv/move', {"direction": "s"})
		.then(res => {handleSouth(res)})
		.catch(err => {console.log(err)})
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
				<ButtonHolder>
					<Left onClick={moveLeft}></Left>
					<Right onClick={moveRight}> </Right>
					<Up onClick={moveUp}> </Up>
					<Down onClick={moveDown}></Down>
				</ButtonHolder>

				{/* <Chat /> */}
				<div>
				<h1>{info.name}</h1>
				<h1>{info.title}</h1>
				</div>
			</SideBar>
			<Room/>
			{setDoorTop == false ?
			<NorthDoor >
				<Doors height="500px" width="500px" />
			</NorthDoor> :
			null}

			<Door >
				<Doors2 height="500px" width="500px" />
			</Door>
			<EastDoor >
				<Doors2 height="500px" width="500px" />
			</EastDoor>

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
