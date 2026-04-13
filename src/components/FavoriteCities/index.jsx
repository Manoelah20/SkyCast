// src/components/FavoriteCities/index.jsx
import { useFavorites } from '../../hooks/useFavorites';
import './styles.css';

export const FavoriteCities = ({ onSelect }) => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="favorites-container">
      <h4>Cidades Favoritas</h4>
      {favorites.length === 0 ? (
        <p>Nenhuma cidade favoritada ainda</p>
      ) : (
        <ul>
          {favorites.map((city) => (
            <li key={city}>
              <button onClick={() => onSelect(city)}>{city}</button>
              <button onClick={() => removeFavorite(city)}>×</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};