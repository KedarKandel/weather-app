import "./styles.css";
import { useState } from "react";
const apiKey = process.env.REACT_APP_API_KEY;

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();

  const getData = (e) => {
    if (e.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
     
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Enter a city name..."
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        onKeyPress={getData}
      />

      { typeof weatherData==="undefined" ? (
        <div className="welcome">
          <p className="welcome-text">Welcome! Write the name of the city and press enter.</p>
        </div>
      ) : (
        <div className="result-container">
          <p className="city">City: {weatherData.name}</p>
          <p className="temp">Current Temp: {Math.round(weatherData.main.temp)}°C</p>
          <p className="weather"> Weather: {weatherData.weather[0].main}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
