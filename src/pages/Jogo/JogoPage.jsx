import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';
import WordDisplay from '../../components/WordDisplay/WordDisplay';
import GameForm from '../../components/GameForm/GameForm';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { useGameContext } from '../../context/GameContext';
import { getRandomWord, getWords } from '../../services/soletrandoService';
import { appendMatchHistory } from '../../services/localPerformanceService';
import { GAME_DEFAULTS } from '../../config/env';
import { isAnswerCorrect, pickWordFromPool } from '../../utils/gameUtils';
import { normalizeWord } from '../../utils/stringUtils';
import './JogoPage.css';

const EMPTY_WORDS = [];
const SENTENCE_TEMPLATES = [
  'Eu amo [verbo] todos os dias.',
  'Será que [verbo] seria uma boa ideia?',
  'Talvez você vá [verbo] amanhã.',
  'Hoje eu decidi [verbo] com calma.',
  'Não deixe de [verbo] quando tiver oportunidade.',
  'Vamos [verbo] antes do jantar.',
  'E se a gente [verbo] agora?',
  'Eu preciso [verbo] melhor nesta semana.',
  'Eles gostam de [verbo] em grupo.',
  'Pode ser bom [verbo] um pouco mais cedo.',
];

function buildExampleSentence(word) {
  const normalizedWord = (word || '').trim().toLowerCase();
  if (!normalizedWord) {
    return '';
  }

  const template = SENTENCE_TEMPLATES[Math.floor(Math.random() * SENTENCE_TEMPLATES.length)];
  return template.replace(/\[verbo\]/gi, normalizedWord);
}

function JogoPage() {
  const navigate = useNavigate();
  const { selectedLevel, selectedQuestionCount, setLastResult, practiceSession } = useGameContext();

  const [wordPool, setWordPool] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [usedWords, setUsedWords] = useState([]);
  const [round, setRound] = useState(1);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingRound, setLoadingRound] = useState(false);
  const [roundResolved, setRoundResolved] = useState(false);
  const [roundAttempts, setRoundAttempts] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasPortugueseVoice, setHasPortugueseVoice] = useState(true);
  const [speechMode, setSpeechMode] = useState('normal');

  const practiceWords = Array.isArray(practiceSession?.words) ? practiceSession.words : EMPTY_WORDS;
  const isPracticeMode = Boolean(practiceSession?.enabled && practiceWords.length > 0);

  const spokenWordKeyRef = useRef('');
  const hasFinalizedRef = useRef(false);
  const totalRounds = isPracticeMode ? practiceWords.length : selectedQuestionCount || GAME_DEFAULTS.totalRounds;

  const speechSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const canSpeakInPortuguese = speechSupported && hasPortugueseVoice;

  useEffect(() => {
    if (!speechSupported) {
      return;
    }

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const hasPt = voices.some((voice) => voice.lang?.toLowerCase().startsWith('pt'));

      if (voices.length === 0) {
        setHasPortugueseVoice(true);
        return;
      }

      setHasPortugueseVoice(hasPt);
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [speechSupported]);

  const speakText = useCallback(
    (text, mode = speechMode) => {
      if (!canSpeakInPortuguese || !text) {
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const ptBrVoice = voices.find((voice) => voice.lang?.toLowerCase() === 'pt-br');
      const ptVoice = ptBrVoice || voices.find((voice) => voice.lang?.toLowerCase().startsWith('pt'));

      if (ptVoice) {
        utterance.voice = ptVoice;
        utterance.lang = ptVoice.lang;
      } else {
        utterance.lang = 'pt-BR';
      }

      utterance.rate = mode === 'slow' ? 0.58 : 0.82;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [canSpeakInPortuguese, speechMode],
  );

  const speakWord = useCallback(
    (word, mode = speechMode) => {
      speakText(word, mode);
    },
    [speakText, speechMode],
  );

  const speakExampleSentence = useCallback(
    (word, mode = speechMode) => {
      const sentence = buildExampleSentence(word);
      if (!sentence) {
        return;
      }
      speakText(sentence, mode);
    },
    [speakText, speechMode],
  );

  useEffect(() => {
    return () => {
      if (speechSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechSupported]);

  const loadNextWord = useCallback(
    async (pool, used) => {
      setLoadingRound(true);
      setFeedback(null);
      setRoundResolved(false);

      const usedSet = new Set((used || []).map((word) => normalizeWord(word)));
      let nextWord = null;

      if (!isPracticeMode) {
        for (let attempt = 0; attempt < 4; attempt += 1) {
          const randomWord = await getRandomWord(selectedLevel);
          if (!randomWord?.palavra) {
            break;
          }

          if (!usedSet.has(normalizeWord(randomWord.palavra))) {
            nextWord = randomWord;
            break;
          }
        }
      }

      if (!nextWord?.palavra) {
        nextWord = pickWordFromPool(pool, used);
      }

      setCurrentWord(nextWord || null);
      spokenWordKeyRef.current = '';
      setLoadingRound(false);
    },
    [isPracticeMode, selectedLevel],
  );

  useEffect(() => {
    if (!canSpeakInPortuguese || !currentWord?.palavra || loadingRound) {
      return;
    }

    const wordKey = `${currentWord.id ?? 'word'}-${normalizeWord(currentWord.palavra)}`;
    if (spokenWordKeyRef.current === wordKey) {
      return;
    }

    spokenWordKeyRef.current = wordKey;
    const timer = setTimeout(() => {
      speakWord(currentWord.palavra);
    }, 180);

    return () => clearTimeout(timer);
  }, [canSpeakInPortuguese, currentWord, loadingRound, speakWord]);

  useEffect(() => {
    if (!isPracticeMode && (!selectedLevel || !selectedQuestionCount)) {
      navigate('/selecao-nivel', { replace: true });
      return;
    }

    let isMounted = true;

    const initGame = async () => {
      setLoadingInitial(true);
      setFeedback(null);
      setRound(1);
      setHits(0);
      setMisses(0);
      setUsedWords([]);
      setRoundResolved(false);
      setRoundAttempts([]);
      spokenWordKeyRef.current = '';
      hasFinalizedRef.current = false;

      if (isPracticeMode) {
        const normalizedPracticeWords = practiceWords.map((item, index) => ({
          id: item.id ?? `practice-${index + 1}`,
          nivel: Number(item.nivel || item.level || 0) || null,
          palavra: item.palavra,
        }));

        if (!isMounted) {
          return;
        }

        setWordPool(normalizedPracticeWords);
        await loadNextWord(normalizedPracticeWords, []);

        if (isMounted) {
          setLoadingInitial(false);
        }
        return;
      }

      const words = await getWords(selectedLevel);
      if (!isMounted) {
        return;
      }

      setWordPool(words);
      await loadNextWord(words, []);

      if (isMounted) {
        setLoadingInitial(false);
      }
    };

    initGame();
    return () => {
      isMounted = false;
    };
  }, [isPracticeMode, loadNextWord, navigate, practiceWords, selectedLevel, selectedQuestionCount]);

  const finalizeGame = (finalHits, finalMisses) => {
    if (hasFinalizedRef.current) {
      return;
    }
    hasFinalizedRef.current = true;

    const result = {
      mode: isPracticeMode ? 'practice' : 'standard',
      level: isPracticeMode ? null : selectedLevel,
      questionCount: totalRounds,
      hits: finalHits,
      misses: finalMisses,
      totalRounds,
      finishedAt: new Date().toISOString(),
      attempts: roundAttempts,
    };

    const persistedResult = appendMatchHistory(result) || result;
    setLastResult(persistedResult);
    navigate('/final');
  };

  const handleSubmit = (answer) => {
    if (!currentWord?.palavra || loadingRound || !canSpeakInPortuguese || roundResolved) {
      return;
    }

    const isCorrect = isAnswerCorrect(answer, currentWord.palavra);
    const nextHits = hits + (isCorrect ? 1 : 0);
    const nextMisses = misses + (isCorrect ? 0 : 1);
    const typedValue = (answer || '').trim();

    setRoundAttempts((current) => [
      ...current,
      {
        round,
        word: currentWord.palavra,
        typedAnswer: typedValue,
        correct: isCorrect,
        level: Number(currentWord?.nivel || selectedLevel || 0) || null,
        timestamp: new Date().toISOString(),
      },
    ]);

    setHits(nextHits);
    setMisses(nextMisses);

    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: 'Acertou! Clique em Próxima para continuar.',
      });
    } else {
      setFeedback({
        type: 'error',
        message: `Errou. Você digitou: "${typedValue || '(vazio)'}". A palavra certa era: "${currentWord.palavra}".`,
      });
    }

    setRoundResolved(true);
  };

  const handleNextRound = async () => {
    if (!roundResolved) {
      return;
    }

    if (round >= totalRounds) {
      finalizeGame(hits, misses);
      return;
    }

    const updatedUsedWords = currentWord?.palavra ? [...usedWords, currentWord.palavra] : [...usedWords];
    setUsedWords(updatedUsedWords);
    setRound((value) => value + 1);
    await loadNextWord(wordPool, updatedUsedWords);
  };

  if (loadingInitial) {
    return (
      <PageContainer>
        <Loader text="Preparando palavras..." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="page-title">{isPracticeMode ? 'Modo prática' : 'Partida em andamento'}</h1>
      <p className="page-intro">
        {isPracticeMode
          ? 'Treino focado nas palavras que você mais errou. Ouça, escreva e reforce sua ortografia.'
          : 'Ouça a palavra, memorize e escreva. Cada rodada conta para o seu ranking final.'}
      </p>

      <div className="page-grid jogo-grid">
        <ScoreBoard
          round={round}
          totalRounds={totalRounds}
          hits={hits}
          misses={misses}
          level={isPracticeMode ? 'Pratica' : selectedLevel}
          questionCount={totalRounds}
        />

        <Card title={isPracticeMode ? 'Rodada de prática' : 'Rodada atual'}>
          {loadingRound ? (
            <Loader text="Buscando próxima palavra..." />
          ) : (
            <WordDisplay
              hasWord={Boolean(currentWord?.palavra)}
              onSpeak={() => speakWord(currentWord?.palavra)}
              onSpeakExample={() => speakExampleSentence(currentWord?.palavra)}
              isSpeaking={isSpeaking}
              speechSupported={speechSupported}
              hasPortugueseVoice={hasPortugueseVoice}
              speechMode={speechMode}
              onChangeSpeechMode={setSpeechMode}
            />
          )}

          <div className="jogo-form-wrap">
            <GameForm
              key={round}
              disabled={loadingRound || !currentWord?.palavra || !canSpeakInPortuguese || roundResolved}
              onSubmit={handleSubmit}
            />
          </div>

          {feedback ? <p className={`jogo-feedback jogo-feedback-${feedback.type}`}>{feedback.message}</p> : null}

          {roundResolved ? (
            <div className="jogo-next-action">
              <Button variant="primary" onClick={handleNextRound}>
                {round >= totalRounds ? 'Finalizar partida' : 'Próxima'}
              </Button>
            </div>
          ) : null}
        </Card>

        <div className="jogo-bottom">
          <Button variant="ghost" onClick={() => navigate(isPracticeMode ? '/desempenho' : '/selecao-nivel')}>
            {isPracticeMode ? 'Voltar ao desempenho' : 'Trocar nível'}
          </Button>
          <Button variant="secondary" onClick={() => finalizeGame(hits, misses)}>
            Encerrar partida
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}

export default JogoPage;
