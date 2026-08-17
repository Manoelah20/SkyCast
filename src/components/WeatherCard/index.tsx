import type { CurrentWeather } from '../../types/weather';
import { formatTemperature, getIconUrl } from '../../utils/format';
import './styles.css';

interface WeatherCardProps {
  data: CurrentWeather;
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  const { name, main, weather, wind, visibility, sys } = data;
  const condition = weather[0];

  return (
    <section className="weather-card" aria-label={`Clima em ${name}`}>
      <div className="weather-card__header">
        <h2 className="weather-card__city">{name}</h2>
        <p className="weather-card__country">{sys.country}</p>
      </div>

      <div className="weather-main">
        <img
          src={getIconUrl(condition.icon)}
          alt={condition.description}
          className="weather-icon"
          width={80}
          height={80}
        />
        <div className="temperature">
          <span className="temp-value">{formatTemperature(main.temp)}</span>
          <span className="temp-description">{condition.description}</span>
        </div>
      </div>

      <dl className="weather-details">
        <div className="detail">
          <dt>Sensação</dt>
          <dd>{formatTemperature(main.feels_like)}</dd>
        </div>
        <div className="detail">
          <dt>Umidade</dt>
          <dd>{main.humidity}%</dd>
        </div>
        <div className="detail">
          <dt>Vento</dt>
          <dd>{wind.speed} m/s</dd>
        </div>
        <div className="detail">
          <dt>Pressão</dt>
          <dd>{main.pressure} hPa</dd>
        </div>
        <div className="detail">
          <dt>Visibilidade</dt>
          <dd>{(visibility / 1000).toFixed(1)} km</dd>
        </div>
        <div className="detail">
          <dt>Máx/Mín</dt>
          <dd>
            {formatTemperature(main.temp_max)}/{formatTemperature(main.temp_min)}
          </dd>
        </div>
      </dl>
    </section>
  );
};

export default WeatherCard;