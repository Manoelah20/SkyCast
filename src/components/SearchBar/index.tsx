import { useState } from 'react';
import './styles.css';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
  const [city, setCity] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = city.trim();
    if (trimmed) {
      onSearch(trimmed);
      setCity('');
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label htmlFor="city-input" className="visually-hidden">
        Digite o nome da cidade
      </label>
      <input
        id="city-input"
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Digite o nome da cidade..."
        disabled={loading}
        autoComplete="off"
        aria-label="Nome da cidade"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  );
};

export default SearchBar;