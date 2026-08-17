import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './index';

describe('SearchBar', () => {
  it('calls onSearch with the typed city on submit', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} loading={false} />);

    await user.type(screen.getByLabelText('Nome da cidade'), 'Rio de Janeiro');
    await user.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(onSearch).toHaveBeenCalledWith('Rio de Janeiro');
  });

  it('clears the input after submitting', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} loading={false} />);

    const input = screen.getByLabelText('Nome da cidade');
    await user.type(input, 'Lisboa');
    await user.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(input).toHaveValue('');
  });

  it('does not call onSearch for an empty input', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} loading={false} />);

    await user.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('disables controls while loading', () => {
    render(<SearchBar onSearch={vi.fn()} loading />);

    expect(screen.getByLabelText('Nome da cidade')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Buscando...' })).toBeDisabled();
  });
});