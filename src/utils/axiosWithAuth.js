import axios from "axios";

const axiosWithAuth = () => {
	const token = localStorage.getItem("the_mud_game_token");
	return axios.create({
		baseURL: "http://themudgame.herokuapp.com/",
		headers: {
			Authorization: token,
		},
	});
};

export default axiosWithAuth;
