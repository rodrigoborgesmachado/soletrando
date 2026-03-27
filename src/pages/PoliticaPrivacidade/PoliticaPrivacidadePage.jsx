import PageContainer from '../../components/PageContainer/PageContainer';
import Card from '../../components/Card/Card';
import './PoliticaPrivacidadePage.css';

function PoliticaPrivacidadePage() {
  return (
    <PageContainer>
      <h1 className="page-title">Politica de Privacidade</h1>
      <p className="page-intro">
        O Soletrando, projeto da SunSale System, respeita sua privacidade e trata dados com transparencia.
      </p>

      <div className="page-grid politica-grid">
        <Card title="Dados armazenados localmente">
          <p>O jogo salva no navegador dados de desempenho para montar o painel de evolucao:</p>
          <ul className="politica-list">
            <li>historico de partidas;</li>
            <li>acertos e erros por rodada;</li>
            <li>palavras mais erradas para pratica.</li>
          </ul>
          <p>Esses dados ficam no seu dispositivo e podem ser apagados na pagina de Desempenho.</p>
        </Card>

        <Card title="Dados enviados para API">
          <p>Somente quando voce escolhe salvar no ranking, os seguintes dados sao enviados para a API SunSale:</p>
          <ul className="politica-list">
            <li>nome informado pelo jogador;</li>
            <li>numero de acertos;</li>
            <li>nivel;</li>
            <li>quantidade de questoes.</li>
          </ul>
        </Card>

        <Card title="Contato sobre privacidade">
          <p>
            Em caso de duvidas sobre esta politica, escreva para{' '}
            <a href="mailto:rodrigomachado@sunsalesystem.com">rodrigomachado@sunsalesystem.com</a>.
          </p>
          <p>Esta politica pode ser atualizada para refletir evolucoes do produto.</p>
        </Card>
      </div>
    </PageContainer>
  );
}

export default PoliticaPrivacidadePage;
