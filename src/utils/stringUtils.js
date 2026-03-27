export function normalizeWord(value) {
  return (value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function maskWord(word) {
  if (!word) {
    return '';
  }
  return word
    .split('')
    .map((char) => (char === ' ' ? ' ' : '_'))
    .join(' ');
}
