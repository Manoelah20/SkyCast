import { render, screen } from '@testing-library/react';
import WeatherCard from './index';
import { mockCurrentWeather } from '../../test/fixtures';

describe('WeatherCard', () => {
  it('renders the city name', () => {
    render(<WeatherCard data={mockCurrentWeather} />);
    expect(screen.getByText('São Paulo')).toBeInTheDocument();
  });

  it('renders the temperature in Celsius', () => {
    render(<WeatherCard data={mockCurrentWeather} />);
    expect(screen.getByText('25°C')).toBeInTheDocument();
  });

  it('renders the weather description', () => {
    render(<WeatherCard data={mockCurrentWeather} />);
    expect(screen.getByText('céu limpo')).toBeInTheDocument();
  });

  it('renders humidity value', () => {
    render(<WeatherCard data={mockCurrentWeather} />);
    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  it('provides an accessible label', () => {
    render(<WeatherCard data={mockCurrentWeather} />);
    expect(screen.getByLabelText('Clima em São Paulo')).toBeInTheDocument();
  });
});