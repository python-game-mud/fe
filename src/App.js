import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import Register from "./Login/register";
import Login from "./Login/login";
import Map from "./Game/Map";

import { ReactComponent as CharacterBoyFaceLeft } from "./sprites/character_boy_faceLeft.svg";

function App() {
	return (
		<>
			<CharacterBoyFaceLeft />
			<svg></svg>
			<Route exact path="/register" component={Register} />
			<Route path="/login" component={Login} />
			<Route path="/game" component={Map} />
		</>
	);
}

export default App;
