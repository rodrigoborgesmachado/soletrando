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
        O objetivo é ouvir a palavra em português, soletrar corretamente e conquistar a melhor pontuação.
      </p>

      <div className="page-grid instrucoes-grid">
        <Card title="Passo a passo">
          <ol className="instruction-list">
            <li>Escolha o nível e a quantidade de questões.</li>
            <li>Escute a palavra e repita o áudio quantas vezes quiser.</li>
            <li>Digite a resposta e confirme.</li>
            <li>Veja o feedback da rodada e avance para a próxima.</li>
            <li>No final, informe seu nome para salvar no ranking.</li>
          </ol>
        </Card>

        <Card title="Dicas rápidas">
          <ul className="tips-list">
            <li>Use a opção de fala lenta em palavras mais longas.</li>
            <li>Preste atenção nos encontros consonantais.</li>
            <li>Quanto mais acertos, melhor sua posição no ranking.</li>
          </ul>
        </Card>
      </div>

      <div className="instrucoes-actions">
        <Button variant="primary" onClick={() => navigate('/selecao-nivel')}>
          Ir para seleção de nível
        </Button>
      </div>
    </PageContainer>
  );
}

export default InstrucoesPage;
