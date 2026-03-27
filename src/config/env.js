export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL || 'https://apisunsale.azurewebsites.net/api').replace(/\/+$/, '');

export const GAME_DEFAULTS = {
  totalRounds: 8,
  revealMilliseconds: 2500,
};
