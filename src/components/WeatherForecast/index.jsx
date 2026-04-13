// src/components/WeatherForecast/index.jsx
import './styles.css';

export const WeatherForecast = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // Filter to show one forecast per day (around 12:00)
  const dailyForecast = forecast.list.filter((item, index) => {
    const date = new Date(item.dt * 1000);
    const hour = date.getHours();
    // Show forecasts around noon (11:00-13:00)
    return hour >= 11 && hour <= 13;
  }).slice(0, 5); // Limit to 5 days

  return (
    <div className="forecast-container">
      <h3>Previsão para os próximos dias</h3>
      <div className="forecast-list">
        {dailyForecast.map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(item.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
            />
            <p>{Math.round(item.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};