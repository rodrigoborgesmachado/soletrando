import { API_BASE_URL } from '../config/env';

function buildUrl(path, params = {}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}${normalizedPath}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

async function request(path, options = {}, params = {}) {
  const url = buildUrl(path, params);

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error(
      typeof payload === 'string' ? payload : payload?.message || 'Não foi possível completar a requisição.',
    );
  }

  return payload;
}

export const apiClient = {
  get: (path, params) => request(path, { method: 'GET' }, params),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
};
