import type { CurrentWeather, WeatherForecast } from '../types/weather';

export const mockCurrentWeather: CurrentWeather = {
  coord: { lon: -46.6333, lat: -23.5505 },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'céu limpo',
      icon: '01d',
    },
  ],
  base: 'stations',
  main: {
    temp: 24.5,
    feels_like: 24,
    temp_min: 22,
    temp_max: 27,
    pressure: 1013,
    humidity: 60,
  },
  visibility: 10000,
  wind: { speed: 3.1, deg: 120 },
  clouds: { all: 0 },
  dt: 1700000000,
  sys: {
    country: 'BR',
    sunrise: 1700000000,
    sunset: 1700040000,
  },
  timezone: -10800,
  id: 3448439,
  name: 'São Paulo',
  cod: 200,
};

export const mockForecast: WeatherForecast = {
  cod: '200',
  message: 0,
  cnt: 1,
  list: [
    {
      dt: 1700000000,
      main: {
        temp: 24.5,
        feels_like: 24,
        temp_min: 22,
        temp_max: 27,
        pressure: 1013,
        humidity: 60,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'céu limpo',
          icon: '01d',
        },
      ],
      clouds: { all: 0 },
      wind: { speed: 3.1, deg: 120 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2025-01-01 12:00:00',
    },
  ],
  city: {
    id: 3448439,
    name: 'São Paulo',
    coord: { lon: -46.6333, lat: -23.5505 },
    country: 'BR',
    population: 12300000,
    timezone: -10800,
    sunrise: 1700000000,
    sunset: 1700040000,
  },
};