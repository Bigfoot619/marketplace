import { useState } from "react";
import axios from "axios";
import "./weatherBar.css";

const WeatherBar = () => {
  const weatherValues = {
    location: ` `,
    temperature: ` `,
    feelsLike: ` `,
    humidity: ` `,
    wind: ` `,
  };
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(weatherValues);
  const [message, setMessage] = useState("");

  const getWeather = async () => {
    const apiKey = "dd1ac19d3fe0fbf47a728e4e9a8c11ac";

    try {
      const response = await axios.post(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      let MT = Math.round(response.data.main.temp);
      let FL = Math.round(response.data.main.feels_like);
      let WS = Math.round(response.data.wind.speed);

      const weather = {
        location: `Weather in ${response.data.name}: `,
        temperature: `Temperature: ${MT} C, `,
        feelsLike: `Feels Like: ${FL} C, `,
        humidity: `Humidity: ${response.data.main.humidity} %, `,
        wind: `Wind: ${WS} km/h `,
      };
      setMessage("");
      setWeatherInfo(weather);
    } catch (error) {
      setWeatherInfo(weatherValues);
      setMessage("Not an existing place!");
    }
  };

  return (
    <div className="top-bar">
      <div className="weather-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather </button>
        {weatherInfo && (
          <div className="weather-info">
            <h3>{weatherInfo.location}</h3>
            <p className="temp">{weatherInfo.temperature}</p>
            <p className="feelsLike">{weatherInfo.feelsLike}</p>
            <p className="humidity">{weatherInfo.humidity}</p>
            <p className="wind">{weatherInfo.wind}</p>
            {message && <p className="responseMessage">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherBar;
