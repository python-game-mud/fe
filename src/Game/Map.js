import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
import styled from "styled-components";
import img from "./man.png";
import Pusher from "./Pusher";

export default function Map() {
	const [left, setLeft] = useState(10);
	const [top, setTop] = useState(10);
	const [rooms, setRooms] = useState([]);
	const [players, setPlayers] = useState([]);

	const Maps = styled.div`
		background: green;
		min-height: 100vh;
		width: 80vw;
	`;
	const Person = styled.div`
		background-image: url(${img});
		height: 9vh;
		width: 5vw;
		position: absolute;
		left: ${left}%;
		top: ${top}%;
	`;

	axiosWithAuth()
		.get("api/adv/init")
		.then(res => {
			console.log(res);
		})
		.catch(console.error);

	axiosWithAuth()
		.get("api/adv/rooms")
		.then(res => {
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
	return (
		<Maps>
			<Pusher left={left} top={top} setLeft={setLeft} setTop={setTop} />
			<Person />
		</Maps>
	);
}

/**
 *  ============= HELPERS =============
 *  */

/**
 *  A graph link for the "react-d3-graph" library
 * @typedef {Object} GraphLink
 * @property {string} source - the source node
 * @property {string} target - the target node
 */

/**
 * Create an array of objects to be used as links for the "react-d3-graph" library.
 * @param {string} source
 * @param {string[]} targets
 * @returns {GraphLink[]>}
 */
function createGraphLinks(source, targets) {
	return targets.reduce(
		(acc, t) => acc.append({ source: source, target: t }),
		[]
	);
}

//
/**
 * Returns an array of arrays, with each subarray containing multiple GraphLinks
 * @param {Object[]} rooms
 * @returns {GraphLink[][]}
 */
function mapRoomsToGraphLinks(rooms) {
	return rooms.map(room => {
		const nonEmptyRooms = [room.n_to, room.s_to, room.e_to, room.w_to].filter(
			direction => parseInt(direction) !== 0
		);
		return createGraphLinks(room.title, nonEmptyRooms);
	});
}

/**
 *
 * @param {GraphLink[][]} graphLinks
 * @returns {GraphLink[]}
 */
function flattenGraphLinks(graphLinks) {
	return graphLinks.flat();
}

/**
 * A node for the the "react-d3-graph" library
 * @typedef {Object} Node
 * @property {string} id - the identifier of the node
 */

/**
 * Transform an array of rooms to an array of nodes
 * @param {Object[]} rooms
 * @returns {Node[]}
 */
function mapRoomsToNodes(rooms) {
	return rooms.map(room => ({ id: room.title }));
}
