import { RotatingLines } from 'react-loader-spinner';
import './styles.css';

const Loading = () => (
  <div className="loading-overlay" role="status" aria-live="polite">
    <RotatingLines
      strokeColor="#4fa94d"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible
    />
    <p>Carregando dados meteorológicos...</p>
  </div>
);

export default Loading;