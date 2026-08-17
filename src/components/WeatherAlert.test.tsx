import { render, screen } from '@testing-library/react';
import WeatherAlert from './WeatherAlert';
import type { WeatherAlert as WeatherAlertData } from '../types/weather';

const mockAlert: WeatherAlertData = {
  event: 'Tempestade',
  sender_name: 'Meteo',
  start: 1700000000,
  end: 1700100000,
  description: 'Chuva forte e ventos.',
  tags: ['Rain', 'Thunderstorm'],
};

describe('WeatherAlert', () => {
  it('renders the alert event', () => {
    render(<WeatherAlert alerts={[mockAlert]} />);
    expect(screen.getByText('Tempestade')).toBeInTheDocument();
  });

  it('renders the alert description', () => {
    render(<WeatherAlert alerts={[mockAlert]} />);
    expect(screen.getByText('Chuva forte e ventos.')).toBeInTheDocument();
  });

  it('renders multiple alerts', () => {
    render(
      <WeatherAlert
        alerts={[
          mockAlert,
          { ...mockAlert, event: 'Calor extremo', start: 1700000001, tags: ['Heat'] },
        ]}
      />
    );
    expect(screen.getByText('Tempestade')).toBeInTheDocument();
    expect(screen.getByText('Calor extremo')).toBeInTheDocument();
  });
});