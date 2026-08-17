import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the message', () => {
    render(<ErrorMessage message="Cidade não encontrada." />);
    expect(screen.getByText('Cidade não encontrada.')).toBeInTheDocument();
  });

  it('renders a retry button when onRetry is provided', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(<ErrorMessage message="Erro." onRetry={onRetry} />);

    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('does not render a retry button when onRetry is absent', () => {
    render(<ErrorMessage message="Erro." />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('has an alert role', () => {
    render(<ErrorMessage message="Erro." />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});