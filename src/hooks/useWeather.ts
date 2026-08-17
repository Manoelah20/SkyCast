import { useCallback, useEffect, useState } from 'react';
import {
  getWeatherAlerts,
  getWeatherByCity,
  getWeatherByCoords,
  getWeatherForecast,
  WeatherError,
} from '../services/weatherApi';
import { getCurrentPosition, GeolocationError } from '../services/geolocation';
import type {
  CurrentWeather,
  WeatherAlert,
  WeatherForecast,
} from '../types/weather';

export type WeatherStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseWeatherReturn {
  weather: CurrentWeather | null;
  forecast: WeatherForecast | null;
  alerts: WeatherAlert[];
  status: WeatherStatus;
  error: string | null;
  geoNotice: string | null;
  lastUpdated: Date | null;
  searchByCity: (city: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const FALLBACK_CITY = 'São Paulo';

export const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [status, setStatus] = useState<WeatherStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [geoNotice, setGeoNotice] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [lastCoords, setLastCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const loadByCoords = useCallback(
    async (lat: number, lon: number) => {
      setStatus('loading');
      setError(null);
      try {
        const [current, forecastData, alertData] = await Promise.all([
          getWeatherByCoords(lat, lon),
          getWeatherForecast(lat, lon),
          getWeatherAlerts(lat, lon),
        ]);
        setWeather(current);
        setForecast(forecastData);
        setAlerts(alertData);
        setLastCoords({ lat, lon });
        setLastUpdated(new Date());
        setStatus('success');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro inesperado.');
        setStatus('error');
      }
    },
    []
  );

  const searchByCity = useCallback(
    async (city: string) => {
      setStatus('loading');
      setError(null);
      try {
        const current = await getWeatherByCity(city);
        setWeather(current);
        setLastUpdated(new Date());
        await loadByCoords(current.coord.lat, current.coord.lon);
      } catch (err) {
        setError(
          err instanceof WeatherError ? err.message : 'Cidade não encontrada.'
        );
        setStatus('error');
      }
    },
    [loadByCoords]
  );

  const refresh = useCallback(async () => {
    if (lastCoords) {
      await loadByCoords(lastCoords.lat, lastCoords.lon);
    }
  }, [lastCoords, loadByCoords]);

  useEffect(() => {
    const fetchInitial = async () => {
      setStatus('loading');
      try {
        const coords = await getCurrentPosition();
        setGeoNotice(null);
        await loadByCoords(coords.latitude, coords.longitude);
      } catch (err) {
        if (err instanceof GeolocationError) {
          setGeoNotice(err.message);
        }
        await searchByCity(FALLBACK_CITY);
      }
    };
    fetchInitial();
  }, [loadByCoords, searchByCity]);

  return {
    weather,
    forecast,
    alerts,
    status,
    error,
    geoNotice,
    lastUpdated,
    searchByCity,
    refresh,
  };
};