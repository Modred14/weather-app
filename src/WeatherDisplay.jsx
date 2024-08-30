import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const WeatherDisplay = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [hourlyForecast, setHourlyForecast] = useState([]);

  const API_KEY = "60a0eb6d6bcff84b269a27a170c591eb";

  const getWeather = async () => {
    try {
      setError(false); // Clear previous errors
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeather(response.data);
      const { lat, lon } = response.data.coord;
      getHourlyForecast(lat, lon);
    } catch (error) {
      console.error("Error fetching the weather data", error);
      setError(true);
    }
  };

  const getHourlyForecast = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      setHourlyForecast(response.data.list.slice(0, 12));
    } catch (error) {
      console.error("Error fetching the hourly forecast", error);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toGMTString().slice(-12, -4);
  };

  return (
    <div class="body" >
      <div class="cloud">
        <div class="cloud-animation">
        <div class="cloud3">
          <span>☁️</span>
          <span>🌤️</span>
          <span>🌥️</span>
          <span>🌦️</span>
          <span>🌧️</span>
          <span>🌨️</span>
          <span>☁️</span></div>
        </div>
        <div class="cloud2">
            <span>🌤️</span>
            <span>🌥️</span>
            <span>🌦️</span>
            <span>🌧️</span>
            <span>🌨️</span>
            <span>☁️</span>
            <span>🌤️</span>
          </div>
          <div class="cloud4">
          <span>🌦️</span>
            <span>🌧️</span>
            <span>🌨️</span>
            <span>☁️</span>
            <span>🌤️</span>
            <span>🌥️</span>
            <span>🌤️</span>
          </div>
          <div class="cloud5">
          <span>🌦️</span>
            
            <span>☁️</span>
            <span>🌧️</span>
            <span>🌨️</span><span>🌤️</span>
            <span>🌥️</span>
            <span>🌤️</span>
          </div>
          <div class="cloud6">
          <span>🌦️</span>
            <span>🌧️</span>
            <span>🌨️</span>
            <span>☁️</span>
            <span>🌤️</span>
            <span>🌥️</span>
            <span>🌤️</span>
          </div>
      </div>

      <div class="weather-box"  style={{background: "black"}}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={getWeather}>Get Weather</button>
        {error ? (
          <p>Sorry</p>
        ) : (
          weather && (
            <div>
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <p>
                {weather.weather[0].main}: {weather.weather[0].description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
              <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
              <p>Pressure: {weather.main.pressure} hPa</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
              <p>Wind Direction: {weather.wind.deg}°</p>
              <p>Visibility: {weather.visibility / 1000} km</p>
              <p>Sunrise: {formatTime(weather.sys.sunrise)}</p>
              <p>Sunset: {formatTime(weather.sys.sunset)}</p>
              <p>Longitude: {weather.coord.lon}</p>
              <p>Latitude: {weather.coord.lat}</p>
              <p>Timezone: GMT+{weather.timezone / 3600}</p>
            </div>
          )
        )}
        {!error && hourlyForecast.length > 0 && (
          <div>
            <h2>Hourly Forecast</h2>
            <div style={{ display: "flex", overflowX: "scroll" }}>
              {hourlyForecast.map((forecast) => (
                <div
                  key={forecast.dt}
                  style={{
                    margin: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                  }}
                >
                  <p>{formatTime(forecast.dt)}</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                    alt="Weather icon"
                  />
                  <p>{forecast.weather[0].description}</p>
                  <p>Temp: {Math.round(forecast.main.temp - 273.15)}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDisplay;
