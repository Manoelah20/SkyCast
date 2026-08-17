import { render, screen } from '@testing-library/react';
import WeatherForecast from './index';
import type { WeatherForecast as WeatherForecastData } from '../../types/weather';

const atMidday = (year: number, month: number, day: number): number =>
  Math.floor(new Date(year, month, day, 12, 0, 0).getTime() / 1000);

const buildForecast = (): WeatherForecastData => ({
  cod: '200',
  message: 0,
  cnt: 3,
  list: [
    { dt: atMidday(2025, 0, 1), main: { temp: 24, feels_like: 24, temp_min: 20, temp_max: 27, pressure: 1013, humidity: 60 }, weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01d' }], clouds: { all: 0 }, wind: { speed: 2, deg: 90 }, visibility: 10000, pop: 0, sys: { pod: 'd' }, dt_txt: '' },
    { dt: atMidday(2025, 0, 2), main: { temp: 22, feels_like: 22, temp_min: 18, temp_max: 25, pressure: 1013, humidity: 65 }, weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01d' }], clouds: { all: 0 }, wind: { speed: 2, deg: 90 }, visibility: 10000, pop: 0, sys: { pod: 'd' }, dt_txt: '' },
    { dt: atMidday(2025, 0, 3), main: { temp: 20, feels_like: 20, temp_min: 16, temp_max: 23, pressure: 1013, humidity: 70 }, weather: [{ id: 800, main: 'Clear', description: 'céu limpo', icon: '01d' }], clouds: { all: 0 }, wind: { speed: 2, deg: 90 }, visibility: 10000, pop: 0, sys: { pod: 'd' }, dt_txt: '' },
  ],
  city: { id: 1, name: 'Teste', coord: { lon: 0, lat: 0 }, country: 'BR', population: 1, timezone: 0, sunrise: 0, sunset: 0 },
});

describe('WeatherForecast', () => {
  it('renders the section title', () => {
    render(<WeatherForecast forecast={buildForecast()} />);
    expect(screen.getByText('Previsão para os próximos dias')).toBeInTheDocument();
  });

  it('renders one item per forecast day', () => {
    const { container } = render(<WeatherForecast forecast={buildForecast()} />);
    expect(container.querySelectorAll('.forecast-item')).toHaveLength(3);
  });

  it('renders the temperature for each day', () => {
    render(<WeatherForecast forecast={buildForecast()} />);
    expect(screen.getByText('24°C')).toBeInTheDocument();
    expect(screen.getByText('22°C')).toBeInTheDocument();
  });

  it('returns null when there is no list', () => {
    const { container } = render(
      <WeatherForecast forecast={{ ...buildForecast(), list: [] }} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});