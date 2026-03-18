# CLAUDE.md - Erlenhof Resource Pool

## Idioma e Convencoes

- Responder sempre em **PT-PT** (portugues de Portugal)
- Comentarios no codigo em **EN** (ingles)
- Documentacao de referencia:
  - Astro: https://docs.astro.build
  - Firebase Auth: https://firebase.google.com/docs/auth
  - Firebase Firestore: https://firebase.google.com/docs/firestore
  - shadcn/ui: https://ui.shadcn.com
  - TypeScript: https://www.typescriptlang.org/docs

---

## Sobre o Projecto

Plataforma de gestao de recursos e atribuicao de trabalhos para o grupo Erlenhof (gestao imobiliaria, Suica). O sistema faz match entre oportunidades de trabalho e trabalhadores qualificados.

**Tipo:** MVP
**Roles:** `super_admin`, `property`, `user`

---

## Tech Stack

| Camada       | Tecnologia                                  |
|--------------|---------------------------------------------|
| Framework    | Astro 6 (SSR, `output: 'server'`)           |
| UI           | React 19 + shadcn/ui (New York style)       |
| Styling      | Tailwind CSS 4 (via Vite plugin)            |
| Linguagem    | TypeScript (strict)                         |
| Base de dados| Firebase Firestore                          |
| Autenticacao | Firebase Auth + session cookies             |
| Email        | SendGrid                                    |
| Hosting      | Netlify (serverless functions)              |
| Icons        | Lucide React                                |
| Forms        | React Hook Form + Zod                       |
| Toasts       | Sonner                                      |

---

## Estrutura do Projecto

```
src/
├── components/
│   ├── auth/          # Formularios de autenticacao (Login, Register, etc.)
│   ├── jobs/          # Componentes de gestao de jobs (apply, actions)
│   ├── ui/            # Componentes shadcn/ui (button, card, dialog, etc.)
│   ├── widgets/       # Widgets do dashboard (.astro)
│   └── *.tsx/astro    # Sidebar, nav, protected-component, etc.
├── cron/
│   └── promote-jobs.ts  # Logica de promocao de jobs (level_1 -> level_2)
├── emails/
│   ├── notifications/
│   │   ├── admin/     # Emails para super_admin
│   │   ├── property/  # Emails para properties
│   │   └── user/      # Emails para users
│   └── baseEmailLayout.ts
├── firebase/
│   ├── client.ts      # Firebase client-side (auth no browser)
│   └── server.ts      # Firebase Admin SDK (server-side)
├── hooks/
│   ├── get-data.ts    # Funcoes para buscar users, jobs, metadata
│   └── useJobActions.ts
├── layouts/
│   ├── Layout.astro   # Layout principal
│   └── ErrorLayout.astro
├── lib/
│   ├── auth/
│   │   ├── route-permissions.ts  # RBAC por role
│   │   └── match-route.ts
│   ├── schemas/
│   │   └── register.ts  # Zod validation schemas
│   ├── apiClient.ts   # Wrapper de API com toast notifications
│   ├── email.ts       # Servico SendGrid
│   ├── menu-config.ts # Navegacao por role
│   ├── types.ts       # Interfaces TypeScript
│   └── utils.ts
├── middleware.ts       # Auth middleware (session cookies, RBAC, redirects)
├── pages/
│   ├── api/
│   │   ├── auth/      # signin, signout, register
│   │   ├── cron/      # promote-jobs (endpoint)
│   │   ├── education/ # CRUD educacao
│   │   ├── jobs/      # CRUD jobs + assign + send-now
│   │   ├── skills/    # CRUD skills
│   │   └── users/     # CRUD users
│   ├── auth/          # Paginas de autenticacao (.astro)
│   ├── jobs/          # Paginas de jobs (all, open, archive, etc.)
│   ├── users/         # Paginas de users
│   ├── education/     # Paginas de educacao
│   ├── skills/        # Paginas de skills
│   └── dashboard.astro
└── styles/
    └── global.css     # Tailwind + CSS variables
```

---

## Path Aliases

Configurado no `tsconfig.json`:
```
@/* -> ./src/*
```

Exemplo: `import { auth } from "@/firebase/server"`

---

## Desenvolvimento Local

### Pre-requisitos

- Node.js 18+
- npm
- Ficheiro `.env` com as variaveis necessarias (ver abaixo)

### Comandos

```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desenvolvimento (http://localhost:4321)
npm run build        # Build de producao
npm run preview      # Preview do build
```

### Nota Windows

O Vite pode dar erros `EPERM` no Windows. Se acontecer:
1. Apagar `node_modules/.vite` e reiniciar
2. Adicionar a pasta `node_modules` as exclusoes do Windows Defender

### Variaveis de Ambiente (.env)

```
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_CERT_URL=
FIREBASE_CLIENT_CERT_URL=
SENDGRID_API_KEY=
CRON_SECRET=
PUBLIC_APP_URL_LOCAL=
PUBLIC_APP_URL_PROD=
```

---

## Deploy

### Hosting: Netlify

- O deploy e automatico via push para o branch `master`
- Adapter: `@astrojs/netlify`
- Output: SSR (serverless functions)

### Cron Job (Promocao de Jobs)

- GitHub Actions workflow em `.github/workflows/promote-jobs.yml`
- Corre a cada 5 minutos
- Chama `GET /api/cron/promote-jobs?secret=CRON_SECRET`
- Promove jobs de `level_1` para `level_2` apos 24 horas

### Passos para deploy manual

1. `npm run build`
2. Push para `master` (Netlify faz auto-deploy)
3. Verificar em https://app.netlify.com que o deploy foi bem sucedido

---

## Fluxo de Autenticacao

1. User faz login → Firebase Auth no client
2. Token enviado para `/api/auth/signin`
3. Server valida token e cria session cookie (`__session`, 5 dias)
4. Middleware verifica cookie em cada request
5. Middleware verifica: email verificado → conta ativa → role tem permissao para a rota

---

## Ciclo de Vida dos Jobs

1. Job criado como `open` no pool `level_1` (Festvertrag)
2. Apos 24h → promovido para `level_2` (Stundenvertrag) via cron
3. User aceita job → status `closed`, `assignedTo` preenchido
4. Jobs passados movem-se para arquivo

---

## Adicionar Componentes shadcn/ui

```bash
npx shadcn@latest add <component-name>
```

Configuracao em `components.json`. Estilo: New York. CSS variables: sim.
