import { useFavorites } from '../../hooks/useFavorites';
import './styles.css';

interface FavoriteCitiesProps {
  onSelect: (city: string) => void;
}

const FavoriteCities = ({ onSelect }: FavoriteCitiesProps) => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <section className="favorites-container" aria-label="Cidades favoritas">
      <h4>Cidades Favoritas</h4>
      {favorites.length === 0 ? (
        <p className="favorites-empty">Nenhuma cidade favoritada ainda.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((city) => (
            <li key={city} className="favorites-item">
              <button
                className="favorites-select"
                onClick={() => onSelect(city)}
                aria-label={`Ver clima de ${city}`}
              >
                {city}
              </button>
              <button
                className="favorites-remove"
                onClick={() => removeFavorite(city)}
                aria-label={`Remover ${city} dos favoritos`}
                title="Remover"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FavoriteCities;