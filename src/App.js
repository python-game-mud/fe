import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Register from "./Login/Register";
import Login from "./Login/Login";
import Map from "./Game/Map";

function App() {
	return (
		<>
			<Route exact path="/" component={Login} />
			<Route exact path="/register" component={Register} />
			<Route path="/game" component={Map} />
		</>
	);
}

export default App;
