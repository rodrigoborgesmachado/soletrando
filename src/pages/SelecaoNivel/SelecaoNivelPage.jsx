import { useNavigate } from 'react-router-dom';
import LevelSelector from '../../components/LevelSelector/LevelSelector';
import PageContainer from '../../components/PageContainer/PageContainer';
import { levelOptions, questionCountOptions } from '../../utils/mockData';
import { useGameContext } from '../../context/GameContext';
import './SelecaoNivelPage.css';

function SelecaoNivelPage() {
  const navigate = useNavigate();
  const {
    selectedLevel,
    setSelectedLevel,
    selectedQuestionCount,
    setSelectedQuestionCount,
    resetSession,
    clearPracticeSession,
  } = useGameContext();

  const handleStart = () => {
    if (!selectedLevel || !selectedQuestionCount) {
      return;
    }

    resetSession();
    clearPracticeSession();
    navigate('/jogo');
  };

  return (
    <PageContainer>
      <h1 className="page-title">Selecione o nivel</h1>
      <p className="page-intro">Escolha o nivel e a quantidade de questoes para iniciar o desafio.</p>
      <LevelSelector
        options={levelOptions}
        selected={selectedLevel}
        onSelect={setSelectedLevel}
        onStart={handleStart}
        questionCountOptions={questionCountOptions}
        selectedQuestionCount={selectedQuestionCount}
        onSelectQuestionCount={setSelectedQuestionCount}
      />
    </PageContainer>
  );
}

export default SelecaoNivelPage;
