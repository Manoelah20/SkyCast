import { render, screen } from '@testing-library/react';
import App from './App';
import type { UseWeatherReturn } from './hooks/useWeather';
import { mockCurrentWeather, mockForecast } from './test/fixtures';

const mockWeatherState: UseWeatherReturn = {
  weather: mockCurrentWeather,
  forecast: mockForecast,
  alerts: [],
  status: 'success',
  error: null,
  geoNotice: null,
  lastUpdated: new Date(),
  searchByCity: vi.fn(),
  refresh: vi.fn(),
};

vi.mock('./hooks/useWeather', () => ({
  useWeather: () => mockWeatherState,
}));

vi.mock('./hooks/useFavorites', () => ({
  useFavorites: () => ({
    favorites: [],
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
    isFavorite: vi.fn(() => false),
  }),
}));

describe('App', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('Skycast')).toBeInTheDocument();
  });

  it('renders the current weather for the loaded city', () => {
    render(<App />);
    expect(screen.getByText('São Paulo')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
  });

  it('renders the search bar', () => {
    render(<App />);
    expect(screen.getByLabelText('Nome da cidade')).toBeInTheDocument();
  });

  it('renders a skip link for accessibility', () => {
    render(<App />);
    expect(screen.getByText('Pular para o conteúdo')).toBeInTheDocument();
  });

  it('shows the geolocation notice when present', () => {
    mockWeatherState.geoNotice = 'Permissão de localização negada.';
    render(<App />);
    expect(
      screen.getByText('Permissão de localização negada.')
    ).toBeInTheDocument();
  });
});