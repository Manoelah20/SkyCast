import React from 'react';
import './styles.css';

const WeatherCard = ({ data }) => {
  if (!data) return null;

  const { name, main, weather, wind, visibility } = data;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <div className="weather-main">
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
          className="weather-icon"
        />
        <div className="temperature">
          <span className="temp-value">{Math.round(main.temp)}°C</span>
          <span className="temp-description"> - {weather[0].description}</span>
        </div>
      </div>
      <div className="weather-details">
        <div className="detail">
          <span>Sensação:</span>
          <span>{Math.round(main.feels_like)}°C</span>
        </div>
        <div className="detail">
          <span>Umidade:</span>
          <span>{main.humidity}%</span>
        </div>
        <div className="detail">
          <span>Vento:</span>
          <span>{wind.speed} m/s</span>
        </div>
        <div className="detail">
          <span>Pressão:</span>
          <span>{main.pressure} hPa</span>
        </div>
        <div className="detail">
          <span>Visibilidade:</span>
          <span>{(visibility / 1000).toFixed(1)} km</span>
        </div>
        <div className="detail">
          <span>Máx/Mín:</span>
          <span>{Math.round(main.temp_max)}°/{Math.round(main.temp_min)}°</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;