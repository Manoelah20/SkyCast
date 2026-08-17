import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteCities from './index';

const mockFavorites = ['São Paulo', 'Rio de Janeiro'];

describe('FavoriteCities', () => {
  beforeEach(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(mockFavorites));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders the favorite cities', () => {
    render(<FavoriteCities onSelect={vi.fn()} />);
    expect(screen.getByText('São Paulo')).toBeInTheDocument();
    expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
  });

  it('calls onSelect with the city when clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<FavoriteCities onSelect={onSelect} />);

    await user.click(screen.getByRole('button', { name: 'Ver clima de São Paulo' }));
    expect(onSelect).toHaveBeenCalledWith('São Paulo');
  });

  it('removes a favorite when the remove button is clicked', async () => {
    const user = userEvent.setup();
    render(<FavoriteCities onSelect={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Remover São Paulo dos favoritos' }));

    expect(screen.queryByText('São Paulo')).not.toBeInTheDocument();
    expect(localStorage.getItem('weatherFavorites')).not.toContain('São Paulo');
  });

  it('shows an empty state when there are no favorites', () => {
    localStorage.setItem('weatherFavorites', '[]');
    render(<FavoriteCities onSelect={vi.fn()} />);
    expect(screen.getByText('Nenhuma cidade favoritada ainda.')).toBeInTheDocument();
  });
});