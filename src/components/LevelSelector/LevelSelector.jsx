import Button from '../Button/Button';
import Card from '../Card/Card';
import './LevelSelector.css';

function LevelSelector({
  options,
  selected,
  onSelect,
  onStart,
  questionCountOptions,
  selectedQuestionCount,
  onSelectQuestionCount,
}) {
  return (
    <div className="level-selector">
      <div className="level-grid">
        {options.map((option) => (
          <Card
            key={option.id}
            title={option.label}
            subtitle={option.description}
            className={`level-card ${selected === option.id ? 'active' : ''}`}
          >
            <Button variant={selected === option.id ? 'secondary' : 'ghost'} onClick={() => onSelect(option.id)}>
              {selected === option.id ? 'Selecionado' : 'Escolher'}
            </Button>
          </Card>
        ))}
      </div>

      <section className="question-count-selector" aria-label="Quantidade de questões">
        <p>Quantidade de questões:</p>
        <div className="question-count-grid">
          {questionCountOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={selectedQuestionCount === option ? 'question-btn active' : 'question-btn'}
              onClick={() => onSelectQuestionCount(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <Button variant="primary" onClick={onStart} disabled={!selected || !selectedQuestionCount}>
        Começar desafio
      </Button>
    </div>
  );
}

export default LevelSelector;
