import PageContainer from '../../components/PageContainer/PageContainer';
import Card from '../../components/Card/Card';
import './ContatoPage.css';

function ContatoPage() {
  return (
    <PageContainer>
      <h1 className="page-title">Contato</h1>
      <p className="page-intro">
        Se você encontrou algum problema, tem sugestões de melhoria ou quer falar com a equipe, use os canais abaixo.
      </p>

      <div className="page-grid contato-grid">
        <Card title="Suporte SunSale">
          <p>
            Email:{' '}
            <a href="mailto:rodrigomachado@sunsalesystem.com">rodrigomachado@sunsalesystem.com</a>
          </p>
          <p>
            Site:{' '}
            <a href="https://sunsalesystem.com.br" target="_blank" rel="noreferrer">
              sunsalesystem.com.br
            </a>
          </p>
        </Card>

        <Card title="Repositório e projetos">
          <p>
            GitHub:{' '}
            <a href="https://github.com/rodrigoborgesmachado" target="_blank" rel="noreferrer">
              github.com/rodrigoborgesmachado
            </a>
          </p>
          <p>Atendemos feedback sobre jogo, ranking, áudio e experiência de uso.</p>
        </Card>
      </div>
    </PageContainer>
  );
}

export default ContatoPage;
