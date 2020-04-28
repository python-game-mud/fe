import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Register from "./Login/register";
import Login from "./Login/login";
import Map from "./Game/Map";

function App() {
	return (
		<>
			<Route exact path="/register" component={Register} />
			<Route path="/login" component={Login} />
			<Route path="/game" component={Map} />
		</>
	);
}

export default App;
