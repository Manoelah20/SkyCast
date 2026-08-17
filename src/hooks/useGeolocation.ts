import { useCallback, useEffect, useState } from 'react';
import type { CoordinatesResult } from '../types/weather';
import { getCurrentPosition } from '../services/geolocation';

export interface UseGeolocationReturn {
  coordinates: CoordinatesResult | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useGeolocation = (): UseGeolocationReturn => {
  const [coordinates, setCoordinates] = useState<CoordinatesResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const coords = await getCurrentPosition();
      setCoordinates(coords);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao obter localização.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { coordinates, loading, error, refresh };
};