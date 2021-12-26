import axios from "axios";

const API_KEY = "d0a2b2448220089e122044c691c35f98";

const FetchWeather = async (Query) => {
	const { data } = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?q=${Query}&appid=${API_KEY}`,
	);
	return data;
};

export default FetchWeather;
