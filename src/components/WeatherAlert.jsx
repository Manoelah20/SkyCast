import { WiRaindrop, WiFire, WiSnowflake } from 'react-icons/wi';

export const WeatherAlert = ({ alerts }) => {
  const getIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'rain': return <WiRaindrop size={24}/>;
      case 'fire': return <WiFire size={24}/>;
      case 'snow': return <WiSnowflake size={24}/>;
      default: return <WiRaindrop size={24}/>;
    }
  };

  return (
    <div className="weather-alerts">
      {alerts.map((alert, index) => (
        <div key={index} className={`alert ${alert.type}`}>
          {getIcon(alert.type)}
          <span>{alert.message}</span>
        </div>
      ))}
    </div>
  );
};