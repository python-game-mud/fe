import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";
import img from "./man.png";
import Pusher from "./Pusher";

import { ReactComponent as CharacterBoyFaceLeft } from "../sprites/character_boy_faceLeft.svg";
import { ReactComponent as CharacterBoyFaceRight } from "../sprites/character_boy_faceRight.svg";

export default function Map() {
	const [left, setLeft] = useState(10);
	const [top, setTop] = useState(10);
	const [rooms, setRooms] = useState([]);
	const [players, setPlayers] = useState([]);
	const [characterDirection, setCharacterDirection] = useState("right");

	const Maps = styled.div`
		background: #282c34;
		min-height: 100vh;
		width: 80vw;
	`;
	const Character = styled.div`
		position: absolute;
		left: ${left}%;
		top: ${top}%;
	`;

	const faceRight = () => setCharacterDirection("right");
	const faceLeft = () => setCharacterDirection("left");

	useEffect(function fetchData() {
		axiosWithAuth()
			.get("api/adv/init/")
			.then(res => {
				console.log(res);
			})
			.catch(console.error);

		axiosWithAuth()
			.get("api/adv/rooms/")
			.then(res => {
				console.log("Rooms:", res);
				Array.isArray(res.data) &&
					setRooms(
						res.data.map(
							({ uuid, title, description, n_to, s_to, e_to, w_to }) => ({
								uuid,
								title,
								description,
								n_to,
								s_to,
								e_to,
								w_to,
							})
						)
					);
				Array.isArray(res.data) &&
					setPlayers(res.data.map(({ players }) => ({ players })));
			})
			.catch(console.error);
	}, []);

	return (
		<Maps>
			<Pusher
				left={left}
				top={top}
				setLeft={setLeft}
				setTop={setTop}
				characterDirection={characterDirection}
				setCharacterDirection={setCharacterDirection}
			/>
			<Character>
				{characterDirection.toLowerCase() === "left" ? (
					<CharacterBoyFaceLeft height="300px" width="300px" />
				) : (
					<CharacterBoyFaceRight height="300px" width="300px" />
				)}
			</Character>
		</Maps>
	);
}

/**
 *  ============= HELPERS =============
 *  */

/**
 *  A graph link for the "react-d3-graph" library.
 * @typedef {Object} Edge
 * @property {string} source - the source node
 * @property {string} target - the target node
 */

/**
 * Create an array of objects to be used as links for the "react-d3-graph" library.
 * @param {string} source
 * @param {string[]} targets
 * @returns {Edge[]}
 */
function createEdges(source, targets) {
	return targets.reduce(
		(acc, t) => acc.append({ source: source, target: t }),
		[]
	);
}

//
/**
 * Returns an array of arrays, with each subarray containing multiple edges.
 * @param {Object[]} rooms
 * @returns {Edge[][]}
 */
function mapRoomsToEdges(rooms) {
	return rooms.map(room => {
		const nonEmptyRooms = [room.n_to, room.s_to, room.e_to, room.w_to].filter(
			direction => parseInt(direction) !== 0
		);
		return createEdges(room.title, nonEmptyRooms);
	});
}

/**
 *
 * @param {Edge[][]} edges
 * @returns {Edge[]}
 */
function flattenGraphLinks(edges) {
	return edges.flat();
}

/**
 * A node for the the "react-d3-graph" library.
 * @typedef {Object} Node
 * @property {string} id - the identifier of the node
 */

/**
 * Transform an array of rooms to an array of nodes.
 * @param {Object[]} rooms
 * @returns {Node[]}
 */
function mapRoomsToNodes(rooms) {
	return rooms.map(room => ({ id: room.title }));
}
