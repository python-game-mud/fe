import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

export default function Logout() {
	useEffect(() => {
		localStorage.removeItem("the_mud_game_token");
	}, []);
	return <Redirect to="/" />;
}
