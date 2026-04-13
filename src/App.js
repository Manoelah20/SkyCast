import { useState, useEffect } from 'react';
import { getWeatherByCity, getWeatherByCoords, getWeatherForecast, getWeatherForecastByCoords } from './services/weatherService';
import WeatherCard from './components/WeatherCard';
import { WeatherForecast } from './components/WeatherForecast';
import SearchBar from './components/SearchBar';
import { FavoriteCities } from './components/FavoriteCities';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load last searched city from localStorage on mount
  useEffect(() => {
    const lastCity = localStorage.getItem('lastSearchedCity');
    if (lastCity) {
      handleSearch(lastCity);
    }
  }, []);

  // Função para buscar clima por cidade
  const handleSearch = async (city) => {
    setLoading(true);
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCity(city),
        getWeatherForecast(city)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
      localStorage.setItem('lastSearchedCity', city);
    } catch (error) {
      alert("Cidade não encontrada!");
    } finally {
      setLoading(false);
    }
  };

  // Efeito para geolocalização ao carregar o componente
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const [weatherData, forecastData] = await Promise.all([
          getWeatherByCoords(latitude, longitude),
          getWeatherForecastByCoords(latitude, longitude)
        ]);
        setWeather(weatherData);
        setForecast(forecastData);
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        // Busca clima de São Paulo se geolocalização falhar
        handleSearch('São Paulo');
      }
    );
  }, []);

  return (
    <div className="app">
      <h1>Skycast</h1>
      <p className="app-description">Aplicativo de previsão do tempo em tempo real com dados meteorológicos detalhados</p>
      <SearchBar onSearch={handleSearch} loading={loading} />
      <FavoriteCities onSelect={handleSearch} />
      {weather && <WeatherCard data={weather} />}
      {forecast && <WeatherForecast forecast={forecast} />}
      <footer className="footer">
        <p>Feito por Manoelah em 2025 - Todos os direitos reservados</p>
        <p className="api-source">Dados fornecidos por OpenWeatherMap</p>
      </footer>
    </div>
  );
}

export default App;
