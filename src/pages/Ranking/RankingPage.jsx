import { useEffect, useState } from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import Loader from '../../components/Loader/Loader';
import RankingTable from '../../components/RankingTable/RankingTable';
import Button from '../../components/Button/Button';
import { getRanking } from '../../services/soletrandoService';
import './RankingPage.css';

function RankingPage() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadRanking = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getRanking();
      setRanking(response);
    } catch (requestError) {
      setError(requestError.message || 'Não foi possível carregar o ranking.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRanking();
  }, []);

  return (
    <PageContainer>
      <h1 className="page-title">Ranking</h1>
      <p className="page-intro">Confira os melhores resultados separados por nível e quantidade de questões.</p>

      <div className="ranking-actions">
        <Button variant="secondary" onClick={loadRanking} disabled={loading}>
          Atualizar
        </Button>
      </div>

      {loading ? <Loader text="Carregando ranking..." /> : null}
      {error ? <p className="ranking-error">{error}</p> : null}
      {!loading && !error ? <RankingTable data={ranking} /> : null}
    </PageContainer>
  );
}

export default RankingPage;
