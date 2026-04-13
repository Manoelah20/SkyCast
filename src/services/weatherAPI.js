import axios from 'axios';

export const getWeatherAlerts = async (lat, lon) => {
  const response = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
    params: {
      lat: lat,
      lon: lon,
      exclude: 'minutely,hourly',
      appid: process.env.REACT_APP_WEATHER_API_KEY,
      units: 'metric',
      lang: 'pt'
    },
  });
  return response.data.alerts || [];
};