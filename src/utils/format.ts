export const formatTemperature = (value: number): string =>
  `${Math.round(value)}°C`;

export const formatDate = (timestamp: number): string =>
  new Date(timestamp * 1000).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
  });

export const formatTime = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getIconUrl = (icon: string, size: 'small' | 'large' = 'large'): string =>
  `https://openweathermap.org/img/wn/${icon}${size === 'large' ? '@2x' : ''}.png`;