import { WiRaindrop, WiFire, WiSnow, WiStrongWind } from 'react-icons/wi';
import type { WeatherAlert as WeatherAlertType } from '../types/weather';
import './WeatherAlert.css';

interface WeatherAlertProps {
  alerts: WeatherAlertType[];
}

const getIcon = (tags?: string[]) => {
  const joined = (tags ?? []).join(' ').toLowerCase();
  if (joined.includes('snow')) return <WiSnow size={24} aria-hidden="true" />;
  if (joined.includes('fire') || joined.includes('heat'))
    return <WiFire size={24} aria-hidden="true" />;
  if (joined.includes('wind')) return <WiStrongWind size={24} aria-hidden="true" />;
  return <WiRaindrop size={24} aria-hidden="true" />;
};

const formatAlertDate = (timestamp: number): string =>
  new Date(timestamp * 1000).toLocaleString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const WeatherAlert = ({ alerts }: WeatherAlertProps) => (
  <section className="weather-alerts" aria-label="Alertas meteorológicos">
    {alerts.map((alert) => (
      <div key={alert.start} className="weather-alert" role="alert">
        {getIcon(alert.tags)}
        <div className="weather-alert__body">
          <strong>{alert.event}</strong>
          {alert.description && <p>{alert.description}</p>}
          <small>
            {formatAlertDate(alert.start)} – {formatAlertDate(alert.end)}
          </small>
        </div>
      </div>
    ))}
  </section>
);

export default WeatherAlert;