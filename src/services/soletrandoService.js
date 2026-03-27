import { apiClient } from './apiClient';
import { mockWords } from '../utils/mockData';

const PATHS = {
  words: '/Soletrando/palavras',
  randomWord: '/Soletrando/palavra-aleatoria',
  ranking: '/Soletrando/ranking',
  result: '/Soletrando/resultado',
};

function unwrapResponse(payload) {
  if (payload && typeof payload === 'object' && 'object' in payload) {
    return payload.object;
  }

  return payload;
}

function toWordModel(value) {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return {
    id: value.id ?? value.Id ?? null,
    nivel: value.nivel ?? value.Nivel ?? null,
    palavra: value.palavra ?? value.Palavra ?? '',
  };
}

function toRankingModel(value) {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return {
    nome: value.nome ?? value.Nome ?? '',
    numeroAcertos: value.numeroAcertos ?? value.NumeroAcertos ?? 0,
    nivel: value.nivel ?? value.Nivel ?? 0,
    quantidadeQuestoes:
      value.quantidadeQuestoes ?? value.QuantidadeQuestoes ?? value.quantidade ?? value.Quantidade ?? 0,
  };
}

export async function getWords(level) {
  try {
    const payload = await apiClient.get(PATHS.words, { nivel: level });
    const words = unwrapResponse(payload);

    if (!Array.isArray(words)) {
      return [];
    }

    return words.map(toWordModel).filter(Boolean);
  } catch {
    return mockWords.filter((item) => !level || item.nivel === level);
  }
}

export async function getRandomWord(level) {
  try {
    const payload = await apiClient.get(PATHS.randomWord, { nivel: level });
    return toWordModel(unwrapResponse(payload));
  } catch {
    const words = mockWords.filter((item) => item.nivel === level);
    if (words.length === 0) {
      return null;
    }
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }
}

export async function getRanking() {
  try {
    const payload = await apiClient.get(PATHS.ranking);
    const ranking = unwrapResponse(payload);
    return Array.isArray(ranking) ? ranking.map(toRankingModel).filter(Boolean) : [];
  } catch {
    return [];
  }
}

export async function saveResult(data) {
  const payload = await apiClient.post(PATHS.result, data);
  return unwrapResponse(payload);
}
