import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Register from "./Login/Register";
import Login from "./Login/Login";
import Map from "./Game/Map";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import Logout from "./Login/Logout";

function App() {
	const [currentRoom, setCurrentRoom] = React.useState("1");

	return (
		<>
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
			<Route path="/logout" component={Logout} />
			<Route path="/game" component={ProtectedRoute(Map)} />
		</>
	);
}

export default App;
