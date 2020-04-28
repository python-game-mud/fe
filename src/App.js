import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Register from "./Login/Register";
import Login from "./Login/Login";
import Map from "./Game/Map";

import { ReactComponent as CharacterBoyFaceLeft } from "./sprites/character_boy_faceLeft.svg";

function App() {
	return (
		<>
			<div className="App-header">
				<CharacterBoyFaceLeft width="300px" height="300px" />
			</div>
			<Route exact path="/register" component={Register} />
			<Route path="/login" component={Login} />
			<Route path="/game" component={Map} />
		</>
	);
}

export default App;
