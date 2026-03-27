import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { GameProvider } from './context/GameContext';
import './styles/variables.css';
import './styles/global.css';
import './styles/layout.css';

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <AppRoutes />
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
