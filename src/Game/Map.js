import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";
import img from "./man.png";
import Pusher from "./Pusher";
import { Graph } from "react-d3-graph";

const Maps = styled.div`
	background: #282c34;
	min-height: 100vh;
	width: 80vw;
`;

const CenteredDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-left: 5%;
`;

export default function Map() {
	const [rooms, setRooms] = useState([]);
	const [players, setPlayers] = useState([]);
	const [currentRoom, setCurrentRoom] = useState("1");

	const graphData = {
		nodes: mapRoomsToNodes(rooms),
		links: flattenEdges(mapRoomsToEdges(rooms)),
	};

	const graphConfig = {
		nodeHighlightBehavior: true,
		staticGraph: true,
		node: {
			color: "orange",
			size: 250,
			highlightStrokeColor: "red",
			fontSize: 0,
			rendderLabel: false,
			symbolType: "diamond",
		},
		link: { highlightColor: "lightblue" },
	};

	const onClickGraph = () => {
		// TODO: expand/shrink the graph
		console.log("graph clicked");
	};

	useEffect(function fetchData() {
		axiosWithAuth()
			.get("api/adv/init/")
			.then(res => {
				console.log(res);
			})
			.catch(err => console.error(err.response));

		axiosWithAuth()
			.get("api/adv/rooms/")
			.then(res => {
				console.log("Rooms:", res.data);
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
			.catch(err => console.error(err.response));
	}, []);

	React.useLayoutEffect(
		function highlightCurrentRoom() {
			setTimeout(() => {
				const allNodes = Array.from(document.querySelectorAll(".node"));
				console.log("\n HERE", allNodes, "\n\n");

				allNodes.forEach(node => {
					// if (node.id === `${currentRoom}`) {
					if (node.id === "25") {
						node.viewportElement.style.fill = "red";
						node.innerHTML =
							"<path cursor='pointer' opacity='1' d='M0,-14.71415478191356L8.495221224235612,0L0,14.71415478191356L-8.495221224235612,0Z fill='blue' stroke='none' stroke-width='1.5'></path><text dx='4' dy='.35em' fill='black' font-size='0' font-weight='normal' opacity='1'>95</text>";
					}
				});
			}, 1000);
		},
		[currentRoom]
	);

	return (
		<Maps>
			<Pusher />
			<CenteredDiv>
				{rooms.length > 0 && (
					<Graph
						id="map"
						data={graphData}
						config={graphConfig}
						onClickGraph={onClickGraph}
						width={5000}
						height={5000}
					/>
				)}
			</CenteredDiv>
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
function flattenEdges(edges) {
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
	return rooms.map(room => ({
		id: room.id,
		x: 30 * Math.round(room.id % 15),
		y: 30 * Math.round(room.id / 15),
	}));
}
