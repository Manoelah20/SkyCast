import axios from 'axios';
import {
  getWeatherByCity,
  getWeatherByCoords,
  getWeatherForecast,
  WeatherError,
} from './weatherApi';
import { mockCurrentWeather, mockForecast } from '../test/fixtures';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('weatherApi', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getWeatherByCity', () => {
    it('fetches current weather for the given city', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockCurrentWeather });

      const result = await getWeatherByCity('São Paulo');

      expect(mockedAxios.get).toHaveBeenCalled();
      expect(result.name).toBe('São Paulo');
    });

    it('throws WeatherError on 404', async () => {
      mockedAxios.isAxiosError.mockReturnValue(true);
      mockedAxios.get.mockRejectedValueOnce({
        response: { status: 404 },
      });

      await expect(getWeatherByCity('CidadeInexistente')).rejects.toThrow(
        WeatherError
      );
    });
  });

  describe('getWeatherByCoords', () => {
    it('fetches current weather by coordinates', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockCurrentWeather });

      const result = await getWeatherByCoords(-23.55, -46.63);

      expect(result.name).toBe('São Paulo');
    });
  });

  describe('getWeatherForecast', () => {
    it('fetches the forecast', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockForecast });

      const result = await getWeatherForecast(-23.55, -46.63);

      expect(result.list).toHaveLength(1);
    });
  });
});