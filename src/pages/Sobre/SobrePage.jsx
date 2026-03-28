import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import './SobrePage.css';

function SobrePage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <h1 className="page-title">Sobre</h1>
      <p className="page-intro">
        O Soletrando é um projeto educacional da SunSale para fortalecer ortografia de forma divertida, com áudio em
        português, níveis e ranking.
      </p>

      <div className="page-grid sobre-grid">
        <Card title="Nossa proposta">
          <p>
            Queremos transformar o treino de escrita em uma experiência leve e envolvente para crianças, jovens e
            adultos. O foco é praticar palavras reais, revisar erros e acompanhar evolução.
          </p>
        </Card>

        <Card title="SunSale System">
          <p>
            Este jogo faz parte do ecossistema educacional da <strong>SunSale System</strong>, que desenvolve produtos
            digitais para apoiar aprendizado e desempenho.
          </p>
          <p>
            Site oficial:{' '}
            <a href="https://sunsalesystem.com.br" target="_blank" rel="noreferrer">
              sunsalesystem.com.br
            </a>
          </p>
        </Card>

        <Card title="Como o jogo ajuda">
          <ul className="sobre-list">
            <li>Treino auditivo com pronúncia em português.</li>
            <li>Feedback imediato para consolidar a escrita correta.</li>
            <li>Histórico local com palavras mais erradas para prática direcionada.</li>
          </ul>
        </Card>
      </div>

      <div className="sobre-actions">
        <Button variant="primary" onClick={() => navigate('/selecao-nivel')}>
          Começar a jogar
        </Button>
        <Button variant="ghost" onClick={() => navigate('/contato')}>
          Entrar em contato
        </Button>
      </div>
    </PageContainer>
  );
}

export default SobrePage;
