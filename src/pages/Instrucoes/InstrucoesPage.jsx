import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import './InstrucoesPage.css';

function InstrucoesPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <h1 className="page-title">Como jogar</h1>
      <p className="page-intro">
        O objetivo e ouvir a palavra em portugues, soletrar corretamente e conquistar a melhor pontuacao.
      </p>

      <div className="page-grid instrucoes-grid">
        <Card title="Passo a passo">
          <ol className="instruction-list">
            <li>Escolha o nivel e a quantidade de questoes.</li>
            <li>Escute a palavra e repita o audio quantas vezes quiser.</li>
            <li>Digite a resposta e confirme.</li>
            <li>Veja o feedback da rodada e avance para a proxima.</li>
            <li>No final, informe seu nome para salvar no ranking.</li>
          </ol>
        </Card>

        <Card title="Dicas rapidas">
          <ul className="tips-list">
            <li>Use a opcao de fala lenta em palavras mais longas.</li>
            <li>Preste atencao nos encontros consonantais.</li>
            <li>Quanto mais acertos, melhor sua posicao no ranking.</li>
          </ul>
        </Card>
      </div>

      <div className="instrucoes-actions">
        <Button variant="primary" onClick={() => navigate('/selecao-nivel')}>
          Ir para selecao de nivel
        </Button>
      </div>
    </PageContainer>
  );
}

export default InstrucoesPage;
