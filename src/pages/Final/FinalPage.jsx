import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import { useGameContext } from '../../context/GameContext';
import { saveResult } from '../../services/soletrandoService';
import './FinalPage.css';

function FinalPage() {
  const navigate = useNavigate();
  const { lastResult, selectedLevel, selectedQuestionCount } = useGameContext();

  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!lastResult) {
    return (
      <PageContainer>
        <h1 className="page-title">Partida não encontrada</h1>
        <p className="page-intro">Você ainda não finalizou uma rodada nesta sessão.</p>
        <Button onClick={() => navigate('/selecao-nivel')} variant="primary">
          Iniciar jogo
        </Button>
      </PageContainer>
    );
  }

  const isPracticeMode = lastResult.mode === 'practice';
  const resultLevel = Number(lastResult.level || selectedLevel || 0);
  const resultQuestionCount = Number(lastResult.questionCount || selectedQuestionCount || lastResult.totalRounds || 0);

  const handleSave = async (event) => {
    event.preventDefault();
    if (saved || isPracticeMode) {
      return;
    }

    setError('');
    setMessage('');

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Informe seu nome para salvar a pontuação.');
      return;
    }

    if (resultLevel < 1 || resultQuestionCount < 1) {
      setError('Nível e quantidade de questões inválidos para salvar.');
      return;
    }

    try {
      setSaving(true);
      await saveResult({
        nome: trimmedName,
        numeroAcertos: Number(lastResult.hits || 0),
        nivel: resultLevel,
        quantidadeQuestoes: resultQuestionCount,
      });
      setMessage('Pontuação salva com sucesso!');
      setSaved(true);
    } catch (requestError) {
      setError(requestError.message || 'Não foi possível salvar a pontuação.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContainer>
      <h1 className="page-title">Resultado final</h1>
      <p className="page-intro">
        {isPracticeMode
          ? 'Sessão de prática concluída. Revise seu desempenho e repita quando quiser.'
          : 'Muito bem! Veja como foi seu desempenho nesta partida.'}
      </p>

      <div className="page-grid final-grid">
        <Card title={isPracticeMode ? 'Resumo da prática' : 'Resumo da partida'}>
          <ul className="final-summary">
            <li>
              <span>Modo</span>
              <strong>{isPracticeMode ? 'Prática' : 'Jogo normal'}</strong>
            </li>

            {!isPracticeMode ? (
              <li>
                <span>Nível</span>
                <strong>{resultLevel}</strong>
              </li>
            ) : null}

            <li>
              <span>Quantidade de questões</span>
              <strong>{resultQuestionCount}</strong>
            </li>
            <li>
              <span>Acertos</span>
              <strong className="text-success">{lastResult.hits}</strong>
            </li>
            <li>
              <span>Erros</span>
              <strong className="text-danger">{lastResult.misses}</strong>
            </li>
            <li>
              <span>Total de rodadas</span>
              <strong>{lastResult.totalRounds}</strong>
            </li>
          </ul>
        </Card>

        {isPracticeMode ? (
          <Card title="Ranking">
            <p className="final-message">No modo prática, este resultado fica apenas no histórico local.</p>
          </Card>
        ) : (
          <Card title="Salvar no ranking">
            <form className="final-form" onSubmit={handleSave}>
              <label htmlFor="player-name">Nome do jogador</label>
              <input
                id="player-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex.: Ana"
                maxLength={100}
                disabled={saving || saved}
              />

              {error ? <p className="final-error">{error}</p> : null}
              {message ? <p className="final-message">{message}</p> : null}

              <Button type="submit" variant="success" disabled={saving || saved}>
                {saving ? 'Salvando...' : saved ? 'Pontuação salva' : 'Salvar pontuação'}
              </Button>
            </form>
          </Card>
        )}
      </div>

      <div className="final-actions">
        <Button variant="primary" onClick={() => navigate('/selecao-nivel')}>
          Jogar novamente
        </Button>
        <Button variant="secondary" onClick={() => navigate('/desempenho')}>
          Meu desempenho
        </Button>
        {!isPracticeMode ? (
          <Button variant="ghost" onClick={() => navigate('/ranking')}>
            Ver ranking
          </Button>
        ) : null}
      </div>
    </PageContainer>
  );
}

export default FinalPage;
