// src/hooks/useFavorites.js
import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('weatherFavorites');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const addFavorite = (city) => {
    const updated = [...new Set([...favorites, city])];
    setFavorites(updated);
    localStorage.setItem('weatherFavorites', JSON.stringify(updated));
  };

  const removeFavorite = (city) => {
    const updated = favorites.filter(fav => fav !== city);
    setFavorites(updated);
    localStorage.setItem('weatherFavorites', JSON.stringify(updated));
  };

  return { favorites, addFavorite, removeFavorite };
};