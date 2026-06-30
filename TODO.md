# TODO - Funcionalidades / Roadmap

Lista de funcionalidades planeadas (nao-seguranca). Para falhas de seguranca
ver `SECURITY-TODO.md`. Para o historico de versoes ver `CHANGELOG.md`.

---

## Mostrar versao da app + link para o changelog (apenas super_admin)

**Objectivo:** mostrar a versao actual da aplicacao algures na UI (ex.: rodape
da sidebar ou rodape geral). A versao deve ser um link que abre uma pagina de
changelog dentro da app. Visivel **apenas para `super_admin`**.

**Esboco de implementacao:**
- [ ] Expor a versao do `package.json` no frontend (ex.: ler `version` via
      `import` do JSON, ou injectar em `import.meta.env` no `astro.config.mjs`
      com `vite.define`). Evitar hardcode — deve vir sempre do `package.json`.
- [ ] Componente que mostra `v{version}` (ex.: rodape da sidebar), renderizado
      so quando `locals.userData.role.id === "super_admin"`.
- [ ] Pagina `/changelog` (`.astro`) que renderiza o conteudo do `CHANGELOG.md`
      (parse de Markdown -> HTML).
- [ ] Proteger `/changelog` para `super_admin` no `roleRoutes`
      (`src/lib/auth/route-permissions.ts`) + adicionar ao middleware.
- [ ] A versao na UI liga para `/changelog`.

**Notas:**
- Manter o `package.json`, as tags git e o `CHANGELOG.md` sempre alinhados a
  cada release (ja e o fluxo actual).
- Considerar mostrar tambem o commit hash curto em ambientes nao-producao.
