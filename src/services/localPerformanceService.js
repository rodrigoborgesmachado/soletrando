import { normalizeWord } from '../utils/stringUtils';

const STORAGE_KEY = 'soletrando:history:v1';
const MAX_HISTORY_ITEMS = 150;

function parseStoredHistory(rawValue) {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readHistory() {
  if (typeof window === 'undefined') {
    return [];
  }

  return parseStoredHistory(window.localStorage.getItem(STORAGE_KEY));
}

function writeHistory(items) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage limits and private mode errors.
  }
}

function sanitizeAttempt(attempt) {
  const parsedLevel = Number(attempt?.level || 0);

  return {
    round: Number(attempt?.round || 0),
    word: String(attempt?.word || ''),
    typedAnswer: String(attempt?.typedAnswer || ''),
    correct: Boolean(attempt?.correct),
    level: parsedLevel > 0 ? parsedLevel : null,
    timestamp: attempt?.timestamp || new Date().toISOString(),
  };
}

function sortByDateDesc(items) {
  return [...items].sort((a, b) => new Date(b.finishedAt || 0).getTime() - new Date(a.finishedAt || 0).getTime());
}

export function getMatchHistory() {
  return sortByDateDesc(readHistory());
}

export function appendMatchHistory(matchResult) {
  if (!matchResult || typeof matchResult !== 'object') {
    return null;
  }

  const current = readHistory();
  const entry = {
    id: matchResult.id || `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    level: Number(matchResult.level || 0),
    questionCount: Number(matchResult.questionCount || matchResult.totalRounds || 0),
    hits: Number(matchResult.hits || 0),
    misses: Number(matchResult.misses || 0),
    totalRounds: Number(matchResult.totalRounds || matchResult.questionCount || 0),
    finishedAt: matchResult.finishedAt || new Date().toISOString(),
    attempts: Array.isArray(matchResult.attempts) ? matchResult.attempts.map(sanitizeAttempt) : [],
  };

  const updated = [entry, ...current].slice(0, MAX_HISTORY_ITEMS);
  writeHistory(updated);
  return entry;
}

export function clearMatchHistory() {
  writeHistory([]);
}

export function getPerformanceSnapshot() {
  const history = getMatchHistory();
  const recentResults = history.slice(0, 12);

  let totalHits = 0;
  let totalMisses = 0;
  let totalQuestions = 0;
  const mistakeMap = new Map();

  history.forEach((match) => {
    const totalRounds = Number(match.totalRounds || match.questionCount || 0);
    const hits = Number(match.hits || 0);
    const misses = Number(match.misses || 0);

    totalHits += hits;
    totalMisses += misses;
    totalQuestions += totalRounds > 0 ? totalRounds : hits + misses;

    if (!Array.isArray(match.attempts)) {
      return;
    }

    match.attempts.forEach((attempt) => {
      if (attempt?.correct) {
        return;
      }

      const normalizedWord = normalizeWord(attempt?.word);
      if (!normalizedWord) {
        return;
      }

      if (!mistakeMap.has(normalizedWord)) {
        mistakeMap.set(normalizedWord, {
          palavra: attempt.word,
          erros: 0,
          ultimaOcorrencia: attempt.timestamp || match.finishedAt || new Date().toISOString(),
          respostas: new Set(),
          niveis: new Set(),
        });
      }

      const item = mistakeMap.get(normalizedWord);
      item.erros += 1;
      item.ultimaOcorrencia = attempt.timestamp || item.ultimaOcorrencia;

      const typed = (attempt.typedAnswer || '').trim();
      if (typed) {
        item.respostas.add(typed);
      }

      const level = Number(attempt?.level || match?.level || 0);
      if (level > 0) {
        item.niveis.add(level);
      }
    });
  });

  const mostMissedWords = Array.from(mistakeMap.values())
    .map((item) => ({
      palavra: item.palavra,
      erros: item.erros,
      ultimaOcorrencia: item.ultimaOcorrencia,
      respostas: Array.from(item.respostas).slice(0, 3),
      niveis: Array.from(item.niveis).sort((a, b) => a - b),
    }))
    .sort((a, b) => {
      if (b.erros !== a.erros) {
        return b.erros - a.erros;
      }
      return new Date(b.ultimaOcorrencia || 0).getTime() - new Date(a.ultimaOcorrencia || 0).getTime();
    })
    .slice(0, 12);

  const accuracyRate = totalQuestions > 0 ? (totalHits / totalQuestions) * 100 : 0;

  return {
    history,
    recentResults,
    totalMatches: history.length,
    totalHits,
    totalMisses,
    totalQuestions,
    accuracyRate: Math.round(accuracyRate * 10) / 10,
    mostMissedWords,
  };
}
