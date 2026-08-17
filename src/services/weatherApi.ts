import axios, { AxiosError } from 'axios';
import type {
  CurrentWeather,
  WeatherAlert,
  WeatherForecast,
} from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const DEFAULT_PARAMS = {
  appid: API_KEY,
  units: 'metric',
  lang: 'pt_br',
};

export class WeatherError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherError';
  }
}

const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const status = (error as AxiosError).response?.status;
    if (status === 404) {
      throw new WeatherError('Cidade não encontrada. Verifique o nome e tente novamente.');
    }
    if (status === 401) {
      throw new WeatherError('Chave de API inválida. Verifique suas credenciais.');
    }
  }
  throw new WeatherError('Não foi possível obter os dados do clima. Tente novamente.');
};

export const getWeatherByCity = async (city: string): Promise<CurrentWeather> => {
  try {
    const { data } = await axios.get<CurrentWeather>(`${BASE_URL}/weather`, {
      params: { ...DEFAULT_PARAMS, q: city.trim() },
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<CurrentWeather> => {
  try {
    const { data } = await axios.get<CurrentWeather>(`${BASE_URL}/weather`, {
      params: { ...DEFAULT_PARAMS, lat, lon },
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getWeatherForecast = async (
  lat: number,
  lon: number
): Promise<WeatherForecast> => {
  try {
    const { data } = await axios.get<WeatherForecast>(`${BASE_URL}/forecast`, {
      params: { ...DEFAULT_PARAMS, lat, lon },
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getWeatherAlerts = async (
  lat: number,
  lon: number
): Promise<WeatherAlert[]> => {
  try {
    const { data } = await axios.get<{ alerts?: WeatherAlert[] }>(
      'https://api.openweathermap.org/data/3.0/onecall',
      {
        params: {
          ...DEFAULT_PARAMS,
          lat,
          lon,
          exclude: 'minutely,hourly,daily',
        },
      }
    );
    return data.alerts ?? [];
  } catch (error) {
    return [];
  }
};