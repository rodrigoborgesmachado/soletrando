import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HomePage from '../pages/Home/HomePage';
import InstrucoesPage from '../pages/Instrucoes/InstrucoesPage';
import SelecaoNivelPage from '../pages/SelecaoNivel/SelecaoNivelPage';
import JogoPage from '../pages/Jogo/JogoPage';
import FinalPage from '../pages/Final/FinalPage';
import RankingPage from '../pages/Ranking/RankingPage';
import DesempenhoPage from '../pages/Desempenho/DesempenhoPage';
import SobrePage from '../pages/Sobre/SobrePage';
import ContatoPage from '../pages/Contato/ContatoPage';
import PoliticaPrivacidadePage from '../pages/PoliticaPrivacidade/PoliticaPrivacidadePage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

function AppRoutes() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/instrucoes" element={<InstrucoesPage />} />
          <Route path="/selecao-nivel" element={<SelecaoNivelPage />} />
          <Route path="/jogo" element={<JogoPage />} />
          <Route path="/final" element={<FinalPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/desempenho" element={<DesempenhoPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidadePage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default AppRoutes;
