import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import Button from '../../components/Button/Button';
import './NotFoundPage.css';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <h1 className="page-title">Página não encontrada</h1>
      <p className="page-intro">O caminho que você tentou acessar não existe no Soletrando.</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Voltar para home
      </Button>
    </PageContainer>
  );
}

export default NotFoundPage;
