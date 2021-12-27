import React from "react";
import "./App.css";
import FetchWeather from "./Api/FetchWeather";

function App() {
	const [Query, setQuery] = React.useState("");
	const [Weather, setWeather] = React.useState("");

	const search = async (e) => {
		if (e.key === "Enter") {
			const data = await FetchWeather(Query);
			setWeather(data);
			setQuery("");
		}
	};

	return (
		<div className="App">
			<input
				type="text"
				className="search"
				placeholder="search..."
				value={Query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyPress={search}
			/>
			<div className="container">
				{Weather.main ? (
					<>
						<h1>
							{Weather.name} <sup>{Weather.sys.country}</sup>
						</h1>
						<div>
							{Math.round(Weather.main.temp)}
							<sup>&deg;C</sup>
						</div>
						<div>
							<img
								src={`https://openweathermap.org/img/wn/${Weather.weather[0].icon}@2x.png`}
								alt={Weather.weather[0].description}
							/>
							<p>{Weather.weather[0].description}</p>
						</div>
					</>
				) : <p>please enter country in search bar</p>}
			</div>
		</div>
	);
}

export default App;
