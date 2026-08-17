import type { CoordinatesResult } from '../types/weather';

export const getCurrentPosition = (): Promise<CoordinatesResult> => {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocalização não suportada pelo navegador.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error(`Erro ao obter localização: ${error.message}`));
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  });
};