# Soletrando Front-end

Front-end do jogo **Soletrando** construído com **React + Vite**, com áudio em português, níveis, ranking e painel de desempenho local.

## Tecnologias

- React
- React Router DOM
- Vite
- CSS por componente/página

## Como rodar

1. Instale dependências:

```bash
npm install
```

2. Configure a URL da API:

```bash
cp .env.example .env
```

3. Rode em desenvolvimento:

```bash
npm run dev
```

4. Build de produção:

```bash
npm run build
```

## Variável de ambiente

```env
VITE_API_BASE_URL=https://apisunsale.azurewebsites.net/api
```

## Rotas principais

- `/` Home
- `/instrucoes`
- `/selecao-nivel`
- `/jogo`
- `/final`
- `/ranking`
- `/desempenho`
- `/sobre`
- `/contato`
- `/politica-privacidade`

## Deploy no Netlify

Arquivos já preparados:

- `public/_redirects` (SPA fallback para React Router)
- `public/sitemap.xml`
- `public/robots.txt`

Se o domínio final for diferente de `https://soletrando.sunsalesystem.com.br`, atualize:

- `index.html` (`canonical`, `og:url`, `og:image`, `twitter:image`)
- `public/sitemap.xml`
- `public/robots.txt`

## Estrutura

```txt
src/
  assets/
  components/
  config/
  context/
  pages/
  routes/
  services/
  styles/
  utils/
```
