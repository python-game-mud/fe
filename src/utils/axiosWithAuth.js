import axios from "axios";

const axiosWithAuth = () => {
	const token = localStorage.getItem("the_mud_game_token");
	return axios.create({
		baseURL:
			// "https://cors-anywhere.herokuapp.com/" +
			"https://themudgame.herokuapp.com/",
		headers: {
			Authorization: token,
		},
	});
};

const getToken = () => localStorage.getItem("the_mud_game_token");

export { axiosWithAuth, getToken };
