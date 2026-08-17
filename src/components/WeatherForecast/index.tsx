import type { WeatherForecast as WeatherForecastData } from '../../types/weather';
import { formatDate, formatTemperature, getIconUrl } from '../../utils/format';
import './styles.css';

interface WeatherForecastProps {
  forecast: WeatherForecastData;
}

const groupByDay = (
  list: WeatherForecastData['list']
): WeatherForecastData['list'] => {
  const daily: WeatherForecastData['list'] = [];
  const seenDays = new Set<string>();

  for (const item of list) {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toDateString();
    const hour = date.getHours();

    if (!seenDays.has(dayKey) && hour >= 11 && hour <= 13) {
      seenDays.add(dayKey);
      daily.push(item);
    }
    if (daily.length === 5) break;
  }

  return daily;
};

const WeatherForecast = ({ forecast }: WeatherForecastProps) => {
  const dailyForecast = groupByDay(forecast.list);

  if (dailyForecast.length === 0) return null;

  return (
    <section className="forecast-container" aria-label="Previsão para os próximos dias">
      <h3>Previsão para os próximos dias</h3>
      <ul className="forecast-list">
        {dailyForecast.map((item) => (
          <li key={item.dt} className="forecast-item">
            <p>{formatDate(item.dt)}</p>
            <img
              src={getIconUrl(item.weather[0].icon, 'small')}
              alt={item.weather[0].description}
              width={50}
              height={50}
            />
            <p>{formatTemperature(item.main.temp)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WeatherForecast;