// src/components/Loading/index.jsx
import { RotatingLines } from 'react-loader-spinner';
import './styles.css';

export const Loading = () => (
  <div className="loading-overlay">
    <RotatingLines
      strokeColor="#4fa94d"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
    <p>Carregando dados meteorológicos...</p>
  </div>
);