import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div className="error-message" role="alert">
    <p>{message}</p>
    {onRetry && (
      <button className="error-retry" onClick={onRetry} type="button">
        Tentar novamente
      </button>
    )}
  </div>
);

export default ErrorMessage;