import Button from '../Button/Button';
import './WordDisplay.css';

function WordDisplay({
  hasWord,
  onSpeak,
  onSpeakExample,
  isSpeaking,
  speechSupported,
  hasPortugueseVoice,
  speechMode,
  onChangeSpeechMode,
}) {
  if (!hasWord) {
    return <p className="word-empty">Sem palavra disponível para este nível.</p>;
  }

  const audioReady = speechSupported && hasPortugueseVoice;

  return (
    <section className="word-display">
      <p className="word-status">Escute a palavra e depois escreva no campo abaixo.</p>

      <div className="word-audio-actions">
        <Button variant="secondary" onClick={onSpeak} disabled={!audioReady || isSpeaking}>
          {isSpeaking ? 'Falando...' : 'Ouvir palavra'}
        </Button>
        <Button variant="ghost" onClick={onSpeakExample} disabled={!audioReady || isSpeaking}>
          Ouvir exemplo em frase
        </Button>
        <small>Repita o áudio quantas vezes precisar.</small>
      </div>

      <div className="word-speed">
        <span>Velocidade da fala:</span>
        <div className="word-speed-buttons" role="group" aria-label="Velocidade da voz">
          <button
            type="button"
            className={speechMode === 'normal' ? 'speed-btn active' : 'speed-btn'}
            onClick={() => onChangeSpeechMode('normal')}
            disabled={!audioReady}
          >
            Normal
          </button>
          <button
            type="button"
            className={speechMode === 'slow' ? 'speed-btn active' : 'speed-btn'}
            onClick={() => onChangeSpeechMode('slow')}
            disabled={!audioReady}
          >
            Lenta
          </button>
        </div>
      </div>

      {!speechSupported ? (
        <p className="word-warning">Seu navegador não suporta leitura de voz. Use um navegador moderno.</p>
      ) : null}

      {speechSupported && !hasPortugueseVoice ? (
        <p className="word-warning">Não encontramos voz em português no navegador. Ative uma voz PT para jogar.</p>
      ) : null}
    </section>
  );
}

export default WordDisplay;
