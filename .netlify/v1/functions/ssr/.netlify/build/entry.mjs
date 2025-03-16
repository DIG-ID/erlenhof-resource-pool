import { renderers } from './renderers.mjs';
import { a as actions } from './chunks/_noop-actions_CfKMStZn.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_CECeHvJi.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/auth/register.astro.mjs');
const _page3 = () => import('./pages/api/auth/signin.astro.mjs');
const _page4 = () => import('./pages/api/auth/signout.astro.mjs');
const _page5 = () => import('./pages/api/friends/_id_.astro.mjs');
const _page6 = () => import('./pages/api/friends.astro.mjs');
const _page7 = () => import('./pages/api/jobs/apply.astro.mjs');
const _page8 = () => import('./pages/api/jobs/_id_.astro.mjs');
const _page9 = () => import('./pages/api/jobs.astro.mjs');
const _page10 = () => import('./pages/api/users/_id_.astro.mjs');
const _page11 = () => import('./pages/api/users.astro.mjs');
const _page12 = () => import('./pages/forgot-password.astro.mjs');
const _page13 = () => import('./pages/jobs/add.astro.mjs');
const _page14 = () => import('./pages/jobs/edit/_id_.astro.mjs');
const _page15 = () => import('./pages/jobs/jobs.astro.mjs');
const _page16 = () => import('./pages/jobs/_id_.astro.mjs');
const _page17 = () => import('./pages/login.astro.mjs');
const _page18 = () => import('./pages/profile.astro.mjs');
const _page19 = () => import('./pages/register.astro.mjs');
const _page20 = () => import('./pages/reset-password.astro.mjs');
const _page21 = () => import('./pages/users/add.astro.mjs');
const _page22 = () => import('./pages/users/edit/_id_.astro.mjs');
const _page23 = () => import('./pages/users/users.astro.mjs');
const _page24 = () => import('./pages/users/_id_.astro.mjs');
const _page25 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/auth/register.ts", _page2],
    ["src/pages/api/auth/signin.ts", _page3],
    ["src/pages/api/auth/signout.ts", _page4],
    ["src/pages/api/friends/[id].ts", _page5],
    ["src/pages/api/friends/index.ts", _page6],
    ["src/pages/api/jobs/apply.ts", _page7],
    ["src/pages/api/jobs/[id].ts", _page8],
    ["src/pages/api/jobs/index.ts", _page9],
    ["src/pages/api/users/[id].ts", _page10],
    ["src/pages/api/users/index.ts", _page11],
    ["src/pages/forgot-password.astro", _page12],
    ["src/pages/jobs/add.astro", _page13],
    ["src/pages/jobs/edit/[id].astro", _page14],
    ["src/pages/jobs/jobs.astro", _page15],
    ["src/pages/jobs/[id].astro", _page16],
    ["src/pages/login.astro", _page17],
    ["src/pages/profile.astro", _page18],
    ["src/pages/register.astro", _page19],
    ["src/pages/reset-password.astro", _page20],
    ["src/pages/users/add.astro", _page21],
    ["src/pages/users/edit/[id].astro", _page22],
    ["src/pages/users/users.astro", _page23],
    ["src/pages/users/[id].astro", _page24],
    ["src/pages/index.astro", _page25]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "96e843d4-197a-4e1b-85eb-1b2cc3916326"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
