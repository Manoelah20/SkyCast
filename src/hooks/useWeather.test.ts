import { renderHook, waitFor } from '@testing-library/react';
import { useWeather } from './useWeather';
import * as weatherApi from '../services/weatherApi';
import * as geolocation from '../services/geolocation';
import { mockCurrentWeather, mockForecast } from '../test/fixtures';

vi.mock('../services/weatherApi');
vi.mock('../services/geolocation');

const mockedWeatherApi = vi.mocked(weatherApi);
const mockedGeolocation = vi.mocked(geolocation);

describe('useWeather', () => {
  beforeEach(() => {
    mockedWeatherApi.getWeatherByCoords.mockResolvedValue(mockCurrentWeather);
    mockedWeatherApi.getWeatherForecast.mockResolvedValue(mockForecast);
    mockedWeatherApi.getWeatherAlerts.mockResolvedValue([]);
  });

  it('starts in loading state', () => {
    mockedGeolocation.getCurrentPosition.mockReturnValue(
      new Promise(() => {})
    );
    const { result } = renderHook(() => useWeather());
    expect(result.current.status).toBe('loading');
  });

  it('loads weather via geolocation on mount', async () => {
    mockedGeolocation.getCurrentPosition.mockResolvedValue({
      latitude: -23.55,
      longitude: -46.63,
    });

    const { result } = renderHook(() => useWeather());

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    expect(result.current.weather?.name).toBe('São Paulo');
    expect(mockedWeatherApi.getWeatherByCoords).toHaveBeenCalledWith(
      -23.55,
      -46.63
    );
  });

  it('falls back to a default city when geolocation fails', async () => {
    mockedGeolocation.getCurrentPosition.mockRejectedValue(
      new Error('denied')
    );
    mockedWeatherApi.getWeatherByCity.mockResolvedValue(mockCurrentWeather);

    const { result } = renderHook(() => useWeather());

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    expect(mockedWeatherApi.getWeatherByCity).toHaveBeenCalledWith('São Paulo');
  });

  it('sets an error when the city is not found', async () => {
    mockedGeolocation.getCurrentPosition.mockResolvedValue({
      latitude: -23.55,
      longitude: -46.63,
    });
    mockedWeatherApi.getWeatherByCoords.mockRejectedValue(
      new Error('Cidade não encontrada.')
    );

    const { result } = renderHook(() => useWeather());

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });

    expect(result.current.error).toBe('Cidade não encontrada.');
  });
});