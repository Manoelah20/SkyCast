import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'weatherFavorites';

export interface UseFavoritesReturn {
  favorites: string[];
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
  isFavorite: (city: string) => boolean;
}

const loadFavorites = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
};

export const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<string[]>(loadFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore storage write failures
    }
  }, [favorites]);

  const addFavorite = useCallback((city: string) => {
    setFavorites((prev) =>
      prev.includes(city) ? prev : [...prev, city]
    );
  }, []);

  const removeFavorite = useCallback((city: string) => {
    setFavorites((prev) => prev.filter((fav) => fav !== city));
  }, []);

  const isFavorite = useCallback(
    (city: string) => favorites.includes(city),
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite };
};