import { useState } from 'react';
import Button from '../Button/Button';
import './GameForm.css';

function GameForm({ disabled = false, onSubmit }) {
  const [answer, setAnswer] = useState('');
  const typedChars = answer.split('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (disabled) {
      return;
    }
    onSubmit(answer);
  };

  return (
    <>
      {typedChars.length > 0 ? (
        <div className="game-typed-preview" aria-live="polite">
          <span className="sr-only">Resposta em digitação</span>
          <div className="game-typed-grid">
            {typedChars.map((char, index) =>
              char === ' ' ? (
                <span key={`space-${index}`} className="game-typed-space" aria-hidden="true" />
              ) : (
                <span key={`char-${index}`} className={`game-typed-letter color-${(index % 5) + 1}`}>
                  {char.toLocaleUpperCase('pt-BR')}
                </span>
              ),
            )}
          </div>
        </div>
      ) : null}

      <form className="game-form" onSubmit={handleSubmit}>
        <label htmlFor="answer" className="sr-only">
          Digite a palavra
        </label>
        <input
          id="answer"
          autoComplete="off"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Digite aqui"
          disabled={disabled}
        />
        <Button type="submit" variant="success" disabled={disabled || answer.trim().length === 0}>
          Confirmar
        </Button>
      </form>
    </>
  );
}

export default GameForm;
