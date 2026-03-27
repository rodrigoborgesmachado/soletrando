import './ScoreBoard.css';

function ScoreBoard({ round, totalRounds, hits, misses, level, questionCount }) {
  return (
    <section className="score-board" aria-label="Placar do jogo">
      <div>
        <span>Rodada</span>
        <strong>
          {round} / {totalRounds}
        </strong>
      </div>
      <div>
        <span>Nivel</span>
        <strong>{level || '-'}</strong>
      </div>
      <div>
        <span>Questoes</span>
        <strong>{questionCount || totalRounds}</strong>
      </div>
      <div>
        <span>Acertos</span>
        <strong className="score-hit">{hits}</strong>
      </div>
      <div>
        <span>Erros</span>
        <strong className="score-miss">{misses}</strong>
      </div>
    </section>
  );
}

export default ScoreBoard;
