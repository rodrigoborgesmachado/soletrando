import { Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import './HomePage.css';

const letterRows = [
  ['S', 'O', 'L'],
  ['E', 'T', 'R'],
  ['A', 'R'],
];

function HomePage() {
  return (
    <PageContainer>
      <section className="home-hero">
        <p className="home-badge">Jogo educativo</p>

        <div className="home-letter-grid" aria-hidden="true">
          {letterRows.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="home-letter-row">
              {row.map((letter, letterIndex) => {
                const colorIndex = ((rowIndex * 3 + letterIndex) % 5) + 1;
                return (
                  <span key={`${rowIndex}-${letterIndex}`} className={`home-letter-box color-${colorIndex}`}>
                    {letter}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        <h1 className="page-title">Soletrando</h1>
        <p className="page-intro">
          Treine leitura, memoria e ortografia ouvindo palavras em portugues. Escolha nivel e quantidade de questoes
          para disputar o ranking.
        </p>
        <p className="home-company">Um projeto da SunSale System.</p>

        <div className="home-actions">
          <Link to="/selecao-nivel" className="home-link-btn home-link-primary">
            Comecar agora
          </Link>
          <Link to="/instrucoes" className="home-link-btn home-link-secondary">
            Ver instrucoes
          </Link>
          <Link to="/ranking" className="home-link-btn home-link-ghost">
            Ranking
          </Link>
          <Link to="/desempenho" className="home-link-btn home-link-ghost">
            Desempenho
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}

export default HomePage;
