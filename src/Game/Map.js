import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";
import img from "./man.png";
import Pusher from "./Pusher";
import { Graph } from "react-d3-graph";

export default function Map() {
	const [rooms, setRooms] = useState([]);
	const [players, setPlayers] = useState([]);

	const Maps = styled.div`
		background: #282c34;
		min-height: 100vh;
		width: 80vw;
	`;

	const graphData = {
		nodes: mapRoomsToNodes(rooms),
		links: flattenGraphLinks(mapRoomsToEdges(rooms)),
	};

	const graphConfig = {
		nodeHighlightBehavior: true,
		staticGraph: true,
		node: {
			color: "lightgreen",
			size: 30,
			highlightStrokeColor: "blue",
			x: 200,
			fontSize: 0,
		},
		link: { highlightColor: "lightblue" },
	};

	const onClickGraph = () => {
		// TODO: expand/shrink the graph
		console.log("graph clicked");
	};

	useEffect(function fetchData() {

		axiosWithAuth()
			.get("api/adv/rooms/")
			.then(res => {
				console.log("Rooms:", res);
				Array.isArray(res.data) &&
					setRooms(
						res.data.map(
							({ id, title, description, n_to, s_to, e_to, w_to }) => ({
								id,
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
			<Pusher />
			{rooms.length > 0 && (
				<Graph
					id="map"
					data={graphData}
					config={graphConfig}
					onClickGraph={onClickGraph}
					width={"200px"}
					height={"200px"}
				/>
			)}
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
		(acc, t) => acc.concat({ source: source, target: t }),
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
		return createEdges(room.id, nonEmptyRooms);
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

	return rooms.map(room => ({ id: room.id, x: 10* (Math.round(room.id % 10)), y: 10 * (Math.round(room.id /10))}))
}
