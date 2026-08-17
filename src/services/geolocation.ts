import type { CoordinatesResult } from '../types/weather';

export type GeolocationErrorCode = 'PERMISSION_DENIED' | 'UNAVAILABLE' | 'TIMEOUT' | 'UNSUPPORTED';

export class GeolocationError extends Error {
  code: GeolocationErrorCode;

  constructor(code: GeolocationErrorCode, message: string) {
    super(message);
    this.name = 'GeolocationError';
    this.code = code;
  }
}

const errorMessages: Record<GeolocationErrorCode, string> = {
  PERMISSION_DENIED:
    'Permissão de localização negada. Você pode buscá-la manualmente.',
  UNAVAILABLE: 'Não foi possível obter a localização. Busque a cidade manualmente.',
  TIMEOUT: 'Tempo esgotado ao buscar a localização. Busque a cidade manualmente.',
  UNSUPPORTED: 'Seu navegador não suporta geolocalização. Busque a cidade manualmente.',
};

export const getCurrentPosition = (): Promise<CoordinatesResult> => {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new GeolocationError('UNSUPPORTED', errorMessages.UNSUPPORTED));
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
        const code: GeolocationErrorCode =
          error.code === error.PERMISSION_DENIED
            ? 'PERMISSION_DENIED'
            : error.code === error.POSITION_UNAVAILABLE
              ? 'UNAVAILABLE'
              : 'TIMEOUT';
        reject(new GeolocationError(code, errorMessages[code]));
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  });
};