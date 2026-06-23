# Security & Code Quality TODO

Auditoria realizada a 2026-03-18. Este documento serve como referencia para resolver as falhas identificadas no MVP.

---

## CRITICO - Resolver imediatamente

### 1. Credenciais possivelmente expostas no historico git
- **Ficheiro:** `.env`
- **Problema:** O `.env` contem Firebase private key, SendGrid API key e CRON_SECRET. Se alguma vez foi commitado, todas as chaves estao comprometidas.
- **Acao:** Verificar com `git log --all -- .env`. Se foi commitado, rodar todas as keys/secrets imediatamente.
- [ ] Verificar historico git
- [ ] Rodar Firebase service account key
- [ ] Rodar SendGrid API key
- [ ] Rodar CRON_SECRET

### 2. Endpoint `/api/jobs/send-now` sem autenticacao
- **Ficheiro:** `src/pages/api/jobs/send-now.ts`
- **Problema:** Qualquer pessoa pode chamar este endpoint sem estar autenticada. Permite disparar emails em massa e promover jobs.
- **Acao:** Adicionar verificacao de `locals.userData` e role check (apenas `super_admin` e `property`).
- **Resolvido (v0.1.1):** Guard de auth + role no topo do handler (401 sem sessao, 403 se nao for `super_admin`/`property`).
- [x] Adicionar auth check
- [x] Adicionar role check

### 3. Race condition na atribuicao de jobs
- **Ficheiro:** `src/pages/api/jobs/assign/index.ts`
- **Problema:** Dois utilizadores podem aceitar o mesmo job ao mesmo tempo. O codigo le o job, verifica `assignedTo`, e atualiza sem usar Firestore transactions. O mesmo acontece com o array `currentJobs` do user.
- **Acao:** Usar `firestore.runTransaction()` para garantir atomicidade.
- [ ] Envolver leitura + escrita do job em transaction
- [ ] Envolver update do array `currentJobs` na mesma transaction

---

## CRITICO - Fluxo de Autenticacao

### 4. Ordem errada das verificacoes no middleware (BUG)
- **Ficheiro:** `src/middleware.ts` (linhas 76-91)
- **Problema:** O role check acontece ANTES da verificacao de email e conta ativa. Um user com email nao verificado recebe 403 em vez de ser redirecionado para `/auth/not-verified`.
- **Ordem actual:** role check → email verified → isActive
- **Ordem correcta:** email verified → isActive → role check
- [ ] Mover verificacao de `emailVerified` para antes do role check
- [ ] Mover verificacao de `isActive` para antes do role check

### 5. Signin e signout usam GET em vez de POST
- **Ficheiros:**
  - `src/pages/api/auth/signin.ts` (linha 4) - `export const GET`
  - `src/pages/api/auth/signout.ts` (linha 3) - `export const GET`
- **Problema (signin):** O token de autenticacao e enviado via GET. Tokens em GET requests ficam em logs de servidor, historico do browser e proxies.
- **Problema (signout):** Qualquer `<img src="/api/auth/signout">` numa pagina faz logout do utilizador (CSRF via GET).
- **Acao:** Mudar ambos para `POST`. Atualizar o LoginForm.tsx e os links de logout.
- [ ] Mudar signin para POST
- [ ] Mudar signout para POST
- [ ] Atualizar LoginForm.tsx para usar POST
- [ ] Atualizar links/botoes de logout

### 6. Rotas de API nao protegidas no roleRoutes
- **Ficheiro:** `src/lib/auth/route-permissions.ts`
- **Problema:** Varias rotas de API nao estao listadas em nenhum role:
  - `/api/jobs/send-now` - nao esta em nenhum role
  - `/api/users` e `/api/users/:id` - faltam para roles que editam users
  - `/api/education/*` e `/api/skills/*` - nao estao listados
- **Risco:** Estas rotas passam a auth do middleware (cookie valido), mas o role check pode nao funcionar correctamente.
- **Acao:** Adicionar todas as rotas de API ao roleRoutes ou criar uma lista separada para APIs.
- [ ] Mapear todas as rotas de API existentes
- [ ] Adicionar ao roleRoutes por role
- [ ] Verificar que nenhuma rota fica sem proteccao

### 7. User enumeration no login
- **Ficheiro:** `src/components/auth/LoginForm.tsx` (linhas 99-103)
- **Problema:** Mensagens diferentes para "email nao encontrado" vs "password errada" permitem a um atacante descobrir quais emails estao registados.
- **Acao:** Usar mensagem generica tipo "Credenciais invalidas" para ambos os casos.
- **Nota:** Para MVP e aceitavel, corrigir antes de producao.
- [ ] Unificar mensagens de erro no login

---

## ALTO - Resolver antes de ir para producao

### 8. Cron autenticado via query parameter
- **Ficheiro:** `src/pages/api/cron/promote-jobs.ts`
- **Problema:** O secret e passado como `?secret=...` no URL. Query params ficam em logs de servidor, browser history e analytics.
- **Acao:** Mover para `Authorization` header. Alterar o cron caller (Netlify/externo) para enviar o header.
- **Resolvido (v0.1.0):** Endpoint passou a `POST` com `Authorization: Bearer`. O caller passou a ser a Netlify Scheduled Function (`netlify/functions/promote-jobs-scheduled.mts`), que envia o header.
- [x] Usar Authorization header em vez de query param
- [x] Atualizar o caller do cron

### 9. Mensagens de erro expoe detalhes internos
- **Ficheiros:**
  - `src/pages/api/auth/register.ts` (linha ~139)
  - `src/pages/api/users/[id].ts` (linha ~154)
  - `src/pages/api/cron/promote-jobs.ts` (linha ~16)
- **Problema:** `error.message` e retornado diretamente ao cliente, podendo revelar estrutura da DB ou stack traces.
- **Acao:** Retornar mensagem generica ao cliente. Manter `console.error` para debug interno.
- [ ] register.ts - mensagem generica
- [ ] users/[id].ts - mensagem generica
- [x] promote-jobs.ts - mensagem generica (v0.1.0)
- [ ] Verificar outros endpoints com o mesmo padrao

### 10. Sem rate limiting nos endpoints de autenticacao
- **Ficheiros:**
  - `src/pages/api/auth/signin.ts`
  - `src/pages/api/auth/register.ts`
- **Problema:** Sem protecao contra brute force ou criacao de contas spam.
- **Acao:** Implementar rate limiting (ex: Netlify Edge Functions, ou middleware customizado com contador em Firestore/memory).
- [ ] Rate limit no signin
- [ ] Rate limit no register

### 11. Falhas de email silenciosas
- **Ficheiro:** `src/lib/email.ts`
- **Problema:** `sendEmail` faz catch e so loga o erro. Os chamadores nunca sabem se o email falhou. No `assign/index.ts`, se o email falhar, o endpoint ainda retorna sucesso.
- **Acao:** Propagar erros ou retornar `{ success: boolean }`. Decidir se falha de email deve bloquear a operacao ou nao.
- [ ] Retornar resultado do envio em `sendEmail`
- [ ] Tratar erros de email nos chamadores criticos (assign, register)

### 12. Sem validacao de schema nos JSON.parse
- **Ficheiros:**
  - `src/pages/api/users/[id].ts` (linha ~55)
  - `src/pages/api/jobs/index.ts`
  - `src/pages/api/jobs/[id].ts`
- **Problema:** Dados JSON sao parsed sem validacao de schema. Um atacante pode injetar campos arbitrarios que vao direto para o Firestore.
- **Acao:** Validar com Zod schemas antes de gravar no Firestore.
- [ ] Criar Zod schemas para job updates
- [ ] Criar Zod schemas para user updates
- [ ] Aplicar validacao em todos os endpoints que fazem JSON.parse

### 13. Phone number validation com fallback inseguro
- **Ficheiro:** `src/pages/api/auth/register.ts` (linhas ~22-27)
- **Problema:** Se o parse do telefone falhar, o input original e guardado sem sanitizacao.
- **Acao:** Rejeitar o registo se o telefone for invalido em vez de aceitar o valor raw.
- [ ] Retornar erro 400 se o telefone for invalido

---

## MEDIO - Bom resolver para o MVP

### 14. Sem protecao CSRF
- **Ficheiros:** Todos os endpoints POST/PATCH/DELETE
- **Problema:** Com cookies de sessao, ataques CSRF sao possiveis.
- **Acao:** Implementar CSRF tokens ou usar `SameSite=Strict` nos cookies (ja esta, mas CSRF tokens dao protecao extra).
- [ ] Avaliar necessidade de CSRF tokens
- [ ] Implementar se necessario

### 15. Password minima de apenas 6 caracteres
- **Ficheiro:** `src/lib/schemas/register.ts`
- **Problema:** Minimo de 6 caracteres e fraco.
- **Acao:** Aumentar para 8+ com requisitos de complexidade (maiuscula, numero, especial).
- [ ] Atualizar schema de password

### 16. Variavel `threeHoursAgo` com valor de 24 horas
- **Ficheiro:** `src/cron/promote-jobs.ts` (linha ~12)
- **Problema:** Nome enganoso que pode causar bugs futuros.
- **Acao:** Renomear para `twentyFourHoursAgo` ou `promotionThreshold`.
- [ ] Renomear variavel

### 17. Sourcemaps ativados em producao
- **Ficheiro:** `astro.config.mjs`
- **Problema:** `sourcemap: true` expoe o codigo fonte original em producao.
- **Acao:** Desativar ou usar `hidden` sourcemaps.
- [ ] Desativar sourcemaps em producao

### 18. Email remetente hardcoded
- **Ficheiro:** `src/lib/email.ts` (linha ~21)
- **Problema:** `noreply@yournewwebsite.ch` esta hardcoded.
- **Acao:** Mover para env var `SENDGRID_FROM_EMAIL`.
- [ ] Criar env var e usar no codigo

### 19. Sem security headers
- **Problema:** Faltam headers como `X-Frame-Options`, `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`.
- **Acao:** Adicionar via Netlify `_headers` file ou middleware.
- [ ] Criar ficheiro `_headers` ou adicionar no middleware

### 20. Debug logging em producao
- **Ficheiro:** `src/middleware.ts`
- **Problema:** Multiplos `console.log` com UIDs e informacao de routing que nao devem estar em producao.
- **Acao:** Remover ou condicionar a `import.meta.env.DEV`.
- [ ] Limpar console.log de producao

### 21. Input nao sanitizado em emails
- **Ficheiro:** `src/pages/api/jobs/index.ts` (linhas ~81-91)
- **Problema:** Campos como `reason`, `notes`, `property.name` sao interpolados em templates de email sem sanitizacao. Possivel HTML injection nos emails.
- **Acao:** Sanitizar ou escapar HTML antes de incluir em templates de email.
- [ ] Sanitizar inputs antes de incluir em emails
