import { FaStar, FaRegStar, FaSyncAlt } from 'react-icons/fa';
import { useWeather } from './hooks/useWeather';
import { useFavorites } from './hooks/useFavorites';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherForecast from './components/WeatherForecast';
import FavoriteCities from './components/FavoriteCities';
import Loading from './components/Loading';
import WeatherAlert from './components/WeatherAlert';
import ErrorMessage from './components/ErrorMessage';
import { formatTime } from './utils/format';
import './App.css';

const App = () => {
  const {
    weather,
    forecast,
    alerts,
    status,
    error,
    lastUpdated,
    searchByCity,
    refresh,
  } = useWeather();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const cityName = weather?.name ?? '';
  const isCurrentFavorite = cityName ? isFavorite(cityName) : false;

  const handleToggleFavorite = () => {
    if (!cityName) return;
    if (isCurrentFavorite) {
      removeFavorite(cityName);
    } else {
      addFavorite(cityName);
    }
  };

  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">Skycast</h1>
        <p className="app__description">
          Dashboard responsivo de previsão do tempo com dados em tempo real
        </p>
      </header>

      <SearchBar onSearch={searchByCity} loading={status === 'loading'} />

      {status === 'loading' && !weather && <Loading />}

      {status === 'error' && !weather && (
        <ErrorMessage message={error ?? 'Erro inesperado.'} onRetry={refresh} />
      )}

      {weather && (
        <div className="app__layout">
          <section className="app__main">
            <div className="app__toolbar">
              <button
                className="app__favorite"
                onClick={handleToggleFavorite}
                aria-pressed={isCurrentFavorite}
                aria-label={
                  isCurrentFavorite
                    ? `Remover ${cityName} dos favoritos`
                    : `Adicionar ${cityName} aos favoritos`
                }
              >
                {isCurrentFavorite ? <FaStar /> : <FaRegStar />}
                {isCurrentFavorite ? 'Favoritada' : 'Favoritar'}
              </button>

              <div className="app__meta">
                <button
                  className="app__refresh"
                  onClick={refresh}
                  disabled={status === 'loading'}
                  aria-label="Atualizar dados do clima"
                  title="Atualizar"
                >
                  <FaSyncAlt className={status === 'loading' ? 'spinning' : ''} />
                </button>
                {lastUpdated && (
                  <span className="app__updated">
                    Atualizado às {formatTime(lastUpdated)}
                  </span>
                )}
              </div>
            </div>

            {status === 'error' && weather && (
              <ErrorMessage message={error ?? 'Erro ao atualizar.'} />
            )}

            <WeatherCard data={weather} />
            {alerts.length > 0 && <WeatherAlert alerts={alerts} />}
            {forecast && <WeatherForecast forecast={forecast} />}
          </section>

          <aside className="app__sidebar">
            <FavoriteCities onSelect={searchByCity} />
          </aside>
        </div>
      )}

      <footer className="app__footer">
        <p>Feito por Manoelah em 2025 - Todos os direitos reservados</p>
        <p className="app__source">Dados fornecidos por OpenWeatherMap</p>
      </footer>
    </main>
  );
};

export default App;