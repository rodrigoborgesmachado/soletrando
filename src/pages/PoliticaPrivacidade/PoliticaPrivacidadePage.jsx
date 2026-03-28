import PageContainer from '../../components/PageContainer/PageContainer';
import Card from '../../components/Card/Card';
import './PoliticaPrivacidadePage.css';

function PoliticaPrivacidadePage() {
  return (
    <PageContainer>
      <h1 className="page-title">Política de Privacidade</h1>
      <p className="page-intro">
        O Soletrando, projeto da SunSale System, respeita sua privacidade e trata dados com transparência.
      </p>

      <div className="page-grid politica-grid">
        <Card title="Dados armazenados localmente">
          <p>O jogo salva no navegador dados de desempenho para montar o painel de evolução:</p>
          <ul className="politica-list">
            <li>histórico de partidas;</li>
            <li>acertos e erros por rodada;</li>
            <li>palavras mais erradas para prática.</li>
          </ul>
          <p>Esses dados ficam no seu dispositivo e podem ser apagados na página de Desempenho.</p>
        </Card>

        <Card title="Dados enviados para API">
          <p>Somente quando você escolhe salvar no ranking, os seguintes dados são enviados para a API SunSale:</p>
          <ul className="politica-list">
            <li>nome informado pelo jogador;</li>
            <li>número de acertos;</li>
            <li>nível;</li>
            <li>quantidade de questões.</li>
          </ul>
        </Card>

        <Card title="Contato sobre privacidade">
          <p>
            Em caso de dúvidas sobre esta política, escreva para{' '}
            <a href="mailto:rodrigomachado@sunsalesystem.com">rodrigomachado@sunsalesystem.com</a>.
          </p>
          <p>Esta política pode ser atualizada para refletir evoluções do produto.</p>
        </Card>
      </div>
    </PageContainer>
  );
}

export default PoliticaPrivacidadePage;
