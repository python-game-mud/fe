import axios from "axios";

const axiosWithAuth = () => {
	const token = localStorage.getItem("token");
	return axios.create({
		baseURL: "http://themudgame.herokuapp.com/",
		headers: {
			Authorization: { token: token },
		},
	});
};

export default axiosWithAuth;
