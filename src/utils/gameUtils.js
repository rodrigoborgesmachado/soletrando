import { normalizeWord } from './stringUtils';

export function isAnswerCorrect(answer, targetWord) {
  return normalizeWord(answer) === normalizeWord(targetWord);
}

export function pickWordFromPool(pool, usedWords) {
  if (!Array.isArray(pool) || pool.length === 0) {
    return null;
  }

  const normalizedUsed = new Set((usedWords || []).map((item) => normalizeWord(item)));
  const availableWords = pool.filter((item) => !normalizedUsed.has(normalizeWord(item.palavra)));

  if (availableWords.length === 0) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  }

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
}
