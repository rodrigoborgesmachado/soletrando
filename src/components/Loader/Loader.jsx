import './Loader.css';

function Loader({ text = 'Carregando...' }) {
  return (
    <div className="loader-wrap" role="status" aria-live="polite">
      <span className="loader-dot"></span>
      <span>{text}</span>
    </div>
  );
}

export default Loader;
