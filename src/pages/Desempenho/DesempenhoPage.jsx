import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import { useGameContext } from '../../context/GameContext';
import { clearMatchHistory, getPerformanceSnapshot } from '../../services/localPerformanceService';
import './DesempenhoPage.css';

function formatDateTime(value) {
  if (!value) {
    return '-';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleString('pt-BR');
}

function DesempenhoPage() {
  const navigate = useNavigate();
  const [, setHistoryVersion] = useState(0);
  const [message, setMessage] = useState('');
  const { startPracticeSession } = useGameContext();

  const snapshot = getPerformanceSnapshot();

  const refreshData = () => {
    setMessage('');
    setHistoryVersion((value) => value + 1);
  };

  const handleClearHistory = () => {
    clearMatchHistory();
    setMessage('Histórico local limpo com sucesso.');
    setHistoryVersion((value) => value + 1);
  };

  const handlePracticeMostMissed = () => {
    const wordsToPractice = snapshot.mostMissedWords
      .map((item, index) => ({
        id: `practice-${index + 1}`,
        palavra: item.palavra,
        nivel: Array.isArray(item.niveis) && item.niveis.length > 0 ? item.niveis[0] : null,
      }))
      .filter((item) => Boolean(item.palavra));

    if (wordsToPractice.length === 0) {
      setMessage('Ainda não há palavras com erro para praticar.');
      return;
    }

    startPracticeSession(wordsToPractice);
    navigate('/jogo');
  };

  return (
    <PageContainer>
      <h1 className="page-title">Desempenho</h1>
      <p className="page-intro">
        Dados locais das suas partidas neste navegador. Use para acompanhar evolução e praticar palavras com mais
        erros.
      </p>

      <div className="desempenho-actions">
        <Button variant="secondary" onClick={refreshData}>
          Atualizar
        </Button>
        <Button variant="ghost" onClick={handleClearHistory} disabled={snapshot.totalMatches === 0}>
          Limpar histórico local
        </Button>
      </div>

      {message ? <p className="desempenho-message">{message}</p> : null}

      {snapshot.totalMatches === 0 ? (
        <Card title="Sem dados ainda">
          <p className="desempenho-empty">Finalize algumas partidas para gerar seu painel de desempenho.</p>
        </Card>
      ) : (
        <div className="page-grid desempenho-grid">
          <Card title="Resumo geral">
            <div className="desempenho-kpis">
              <div>
                <span>Partidas</span>
                <strong>{snapshot.totalMatches}</strong>
              </div>
              <div>
                <span>Questões</span>
                <strong>{snapshot.totalQuestions}</strong>
              </div>
              <div>
                <span>Acertos</span>
                <strong className="kpi-success">{snapshot.totalHits}</strong>
              </div>
              <div>
                <span>Erros</span>
                <strong className="kpi-danger">{snapshot.totalMisses}</strong>
              </div>
              <div>
                <span>Taxa de acerto</span>
                <strong>{snapshot.accuracyRate}%</strong>
              </div>
            </div>
          </Card>

          <Card title="Últimos resultados">
            <div className="desempenho-table-wrap">
              <table className="desempenho-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Nível</th>
                    <th>Questões</th>
                    <th>Acertos</th>
                    <th>Erros</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.recentResults.map((item) => (
                    <tr key={item.id}>
                      <td>{formatDateTime(item.finishedAt)}</td>
                      <td>{item.level || '-'}</td>
                      <td>{item.questionCount || item.totalRounds || '-'}</td>
                      <td>{item.hits}</td>
                      <td>{item.misses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Palavras para praticar">
            {snapshot.mostMissedWords.length === 0 ? (
              <p className="desempenho-empty">Nenhuma palavra errada registrada até agora.</p>
            ) : (
              <>
                <div className="desempenho-practice-action">
                  <Button variant="primary" onClick={handlePracticeMostMissed}>
                    Praticar palavras erradas
                  </Button>
                </div>

                <div className="desempenho-table-wrap">
                  <table className="desempenho-table">
                    <thead>
                      <tr>
                        <th>Palavra</th>
                        <th>Erros</th>
                        <th>Níveis</th>
                        <th>Último erro</th>
                        <th>Respostas digitadas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {snapshot.mostMissedWords.map((item) => (
                        <tr key={`${item.palavra}-${item.ultimaOcorrencia}`}>
                          <td>{item.palavra}</td>
                          <td>{item.erros}</td>
                          <td>{Array.isArray(item.niveis) && item.niveis.length > 0 ? item.niveis.join(', ') : '-'}</td>
                          <td>{formatDateTime(item.ultimaOcorrencia)}</td>
                          <td>{item.respostas.length > 0 ? item.respostas.join(', ') : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </PageContainer>
  );
}

export default DesempenhoPage;
