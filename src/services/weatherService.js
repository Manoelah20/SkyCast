import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city) => {
  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    throw new Error('Nome da cidade inválido');
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city.trim(),
        appid: API_KEY,
        units: 'metric',
        lang: 'pt_br',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clima:', error);
    throw error;
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  if (typeof lat !== 'number' || typeof lon !== 'number' || 
      lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    throw new Error('Coordenadas inválidas');
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'pt_br',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clima por coordenadas:', error);
    throw error;
  }
};

export const getWeatherForecast = async (city) => {
  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    throw new Error('Nome da cidade inválido');
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city.trim(),
        appid: API_KEY,
        units: 'metric',
        lang: 'pt_br',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar previsão:', error);
    throw error;
  }
};

export const getWeatherForecastByCoords = async (lat, lon) => {
  if (typeof lat !== 'number' || typeof lon !== 'number' || 
      lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    throw new Error('Coordenadas inválidas');
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'pt_br',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar previsão por coordenadas:', error);
    throw error;
  }
};
