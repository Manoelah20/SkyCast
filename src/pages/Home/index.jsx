import { useState, useEffect } from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import { Loading } from '../../components/Loading';
import { SearchBar } from '../../components/SearchBar';
import { WeatherCard } from '../../components/WeatherCard';
import { WeatherForecast } from '../../components/WeatherForecast';
import { FavoriteCities } from '../../components/FavoriteCities';
import { WeatherAlert } from '../../components/WeatherAlert';
import { 
  getWeatherByCity, 
  getWeatherByCoords, 
  getWeatherForecast,
  getWeatherAlerts
} from '../../services/weatherAPI';
import { getCurrentPosition } from '../../services/geolocation';
import './styles.css';

export const Home = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const { addFavorite } = useFavorites();

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const [current, forecast] = await Promise.all([
        getWeatherByCity(city),
        getWeatherForecastByCity(city) // Corrigir ou substituir por função existente
      ]);
      setWeather(current);
      setForecast(forecast);
    } catch (err) {
      setError('Cidade não encontrada');
    } finally {
      setLoading(false);
    }
  };

  // Função alternativa se getWeatherForecastByCity não existir:
  const getWeatherForecastByCity = async (city) => {
    const response = await getWeatherByCity(city);
    return getWeatherForecast(response.coord.lat, response.coord.lon);
  };

  const handleAddFavorite = () => {
    if (weather) {
      addFavorite(weather.name);
    }
  };

  useEffect(() => {
    const fetchInitialWeather = async () => {
      try {
        const coords = await getCurrentPosition();
        const [current, forecast, alertData] = await Promise.all([
          getWeatherByCoords(coords.latitude, coords.longitude),
          getWeatherForecast(coords.latitude, coords.longitude),
          getWeatherAlerts(coords.latitude, coords.longitude)
        ]);
        setWeather(current);
        setForecast(forecast);
        setAlerts(alertData || []);
      } catch (err) {
        console.error(err);
        handleSearch('São Paulo');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialWeather();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="home-container">
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      
      <div className="main-content">
        <div className="weather-section">
          {weather && (
            <>
              <WeatherCard data={weather} />
              <button 
                onClick={handleAddFavorite}
                className="favorite-btn"
              >
                ⭐ Favoritar
              </button>
            </>
          )}
          {alerts.length > 0 && <WeatherAlert alerts={alerts} />}
          {forecast && <WeatherForecast forecast={forecast} />}
        </div>
        
        <div className="sidebar">
          <FavoriteCities onSelect={handleSearch} />
        </div>
      </div>
    </div>
  );
};