import React from "react";
import { getToken } from "./utils/axiosWithAuth";
import { Redirect } from "react-router-dom";

export default function ProtectedRoute(Component) {
	return function renderComponentOrRedirect() {
		const hasToken = getToken();
		return hasToken ? <Component /> : <Redirect to="/login" />;
	};
}
