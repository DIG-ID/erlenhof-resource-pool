# Changelog

Todas as alteracoes relevantes deste projecto sao documentadas neste ficheiro.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e o projecto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

> **Nota:** Este projecto e um MVP. Enquanto a versao for `0.x.y` nao ha
> garantia de estabilidade de API. A `1.0.0` fica reservada para o produto
> final/producao estavel.

## [Nao lancado]

### Por fazer (ver `SECURITY-TODO.md`)
- Race condition na atribuicao de jobs — usar transactions (CRITICO #3)
- Ordem das verificacoes no middleware (BUG #4)
- Signin/signout via GET em vez de POST (#5)
- Mapear rotas de API no `roleRoutes` (#6)
- Verificar historico git do `.env` e rodar secrets (CRITICO #1)

---

## [0.1.1] - 2026-06-23

### Seguranca
- Endpoint `/api/jobs/send-now`: adicionado guard de autenticacao e role no
  servidor (401 sem sessao, 403 se o role nao for `super_admin` nem
  `property`). Antes dependia apenas do middleware (SECURITY-TODO #2).

---

## [0.1.0] - 2026-06-23

Primeiro release versionado. Migracao do cron para infra fiavel e primeiras
correccoes de seguranca. Tudo antes desta versao e considerado a baseline MVP
nao versionada (`0.0.1`).

### Adicionado
- Netlify Scheduled Function (`netlify/functions/promote-jobs-scheduled.mts`)
  que promove jobs `level_1` -> `level_2` a cada 5 minutos, a correr server-side
  na infra do Netlify.
- `CHANGELOG.md` para rastrear alteracoes a partir desta versao.

### Alterado
- Endpoint `/api/cron/promote-jobs`: passou de `GET ?secret=...` para
  `POST` com autenticacao via header `Authorization: Bearer`, mantendo o
  secret fora de URLs, logs e analytics (SECURITY-TODO #8).
- Endpoint do cron devolve mensagem de erro generica ao cliente em vez de
  expor `err.message` (SECURITY-TODO #9, parcial).
- Dependencias: `npm audit fix` reduziu as vulnerabilidades de 44 para 24
  (aplicadas apenas as correccoes compativeis com semver; as restantes sao
  transitivas da toolchain Netlify/Firebase e exigiriam breaking changes).

### Removido
- Workflow `.github/workflows/promote-jobs.yml` (cron migrado para Netlify).
- Workflow `.github/workflows/keepalive.yml` — deixou de ser necessario o
  workaround da regra dos 60 dias de inatividade do GitHub Actions.

### Corrigido
- Promocao de jobs deixou de depender do cron do GitHub Actions, que era
  desativado apos 60 dias sem actividade no repositorio (causa de os jobs
  ficarem presos em Festvertrag sem passar a Stundenvertrag).

[Nao lancado]: https://github.com/DIG-ID/erlenhof-resource-pool/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/DIG-ID/erlenhof-resource-pool/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/DIG-ID/erlenhof-resource-pool/releases/tag/v0.1.0
