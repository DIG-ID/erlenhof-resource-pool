import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_BqO5gSP-.mjs';
import 'cookie';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/apps/erlenhof-resource-pool/","cacheDir":"file:///D:/apps/erlenhof-resource-pool/node_modules/.astro/","outDir":"file:///D:/apps/erlenhof-resource-pool/dist/","srcDir":"file:///D:/apps/erlenhof-resource-pool/src/","publicDir":"file:///D:/apps/erlenhof-resource-pool/public/","buildClientDir":"file:///D:/apps/erlenhof-resource-pool/dist/","buildServerDir":"file:///D:/apps/erlenhof-resource-pool/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ej0knFEB.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/register","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/register\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/register.ts","pathname":"/api/auth/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signin","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signin\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signin.ts","pathname":"/api/auth/signin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signout.ts","pathname":"/api/auth/signout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/friends/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/friends\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"friends","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/friends/[id].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/friends","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/friends\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"friends","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/friends/index.ts","pathname":"/api/friends","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/jobs/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/jobs\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"jobs","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/jobs/[id].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/jobs","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/jobs\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"jobs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/jobs/index.ts","pathname":"/api/jobs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/users/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/users\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/users/[id].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/users","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/users\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/users/index.ts","pathname":"/api/users","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ej0knFEB.css"}],"routeData":{"route":"/forgot-password","isIndex":false,"type":"page","pattern":"^\\/forgot-password\\/?$","segments":[[{"content":"forgot-password","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/forgot-password.astro","pathname":"/forgot-password","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ej0knFEB.css"}],"routeData":{"route":"/jobs/add","isIndex":false,"type":"page","pattern":"^\\/jobs\\/add\\/?$","segments":[[{"content":"jobs","dynamic":false,"spread":false}],[{"content":"add","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jobs/add.astro","pathname":"/jobs/add","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ej0knFEB.css"}],"routeData":{"route":"/jobs/edit/[id]","isIndex":false,"type":"page","pattern":"^\\/jobs\\/edit\\/([^/]+?)\\/?$","segments":[[{"content":"jobs","dynamic":false,"spread":false}],[{"content":"edit","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/jobs/edit/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ej0knFEB.css"}],"routeData":{"route":"/jobs/jobs","isIndex":false,"type":"page","pattern":"^\\/jobs\\/jobs\\/?$","segments":[[{"content":"jobs","dynamic":false,"spread":false}],[{"content":"jobs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/jobs/jobs.astro","pathname":"/jobs/jobs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ej0knFEB.css"}],"routeData":{"route":"/jobs/[id]","isIndex":false,"type":"page","pattern":"^\\/jobs\\/([^/]+?)\\/?$","segments":[[{"content":"jobs","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/jobs/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ej0knFEB.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ej0knFEB.css"}],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ej0knFEB.css"}],"routeData":{"route":"/reset-password","isIndex":false,"type":"page","pattern":"^\\/reset-password\\/?$","segments":[[{"content":"reset-password","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/reset-password.astro","pathname":"/reset-password","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ej0knFEB.css"}],"routeData":{"route":"/users/add","isIndex":false,"type":"page","pattern":"^\\/users\\/add\\/?$","segments":[[{"content":"users","dynamic":false,"spread":false}],[{"content":"add","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/users/add.astro","pathname":"/users/add","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ej0knFEB.css"}],"routeData":{"route":"/users/edit/[id]","isIndex":false,"type":"page","pattern":"^\\/users\\/edit\\/([^/]+?)\\/?$","segments":[[{"content":"users","dynamic":false,"spread":false}],[{"content":"edit","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/users/edit/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ej0knFEB.css"}],"routeData":{"route":"/users/users","isIndex":false,"type":"page","pattern":"^\\/users\\/users\\/?$","segments":[[{"content":"users","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/users/users.astro","pathname":"/users/users","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ej0knFEB.css"}],"routeData":{"route":"/users/[id]","isIndex":false,"type":"page","pattern":"^\\/users\\/([^/]+?)\\/?$","segments":[[{"content":"users","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/users/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ej0knFEB.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/apps/erlenhof-resource-pool/src/pages/index.astro",{"propagation":"none","containsHead":true}],["D:/apps/erlenhof-resource-pool/src/pages/jobs/[id].astro",{"propagation":"none","containsHead":true}],["D:/apps/erlenhof-resource-pool/src/pages/jobs/add.astro",{"propagation":"none","containsHead":true}],["D:/apps/erlenhof-resource-pool/src/pages/jobs/edit/[id].astro",{"propagation":"none","containsHead":true}],["D:/apps/erlenhof-resource-pool/src/pages/jobs/jobs.astro",{"propagation":"none","containsHead":true}],["D:/apps/erlenhof-resource-pool/src/pages/users/add.astro",{"propagation":"none","containsHead":true}],["D:/apps/erlenhof-resource-pool/src/pages/users/users.astro",{"propagation":"none","containsHead":true}],["D:/apps/erlenhof-resource-pool/src/pages/404.astro",{"propagation":"none","containsHead":true}],["D:/apps/erlenhof-resource-pool/src/pages/forgot-password.astro",{"propagation":"none","containsHead":true}],["D:/apps/erlenhof-resource-pool/src/pages/login.astro",{"propagation":"none","containsHead":true}],["D:/apps/erlenhof-resource-pool/src/pages/register.astro",{"propagation":"none","containsHead":true}],["D:/apps/erlenhof-resource-pool/src/pages/reset-password.astro",{"propagation":"none","containsHead":true}],["D:/apps/erlenhof-resource-pool/src/pages/users/[id].astro",{"propagation":"none","containsHead":true}],["D:/apps/erlenhof-resource-pool/src/pages/users/edit/[id].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/auth/register@_@ts":"pages/api/auth/register.astro.mjs","\u0000@astro-page:src/pages/api/auth/signin@_@ts":"pages/api/auth/signin.astro.mjs","\u0000@astro-page:src/pages/api/auth/signout@_@ts":"pages/api/auth/signout.astro.mjs","\u0000@astro-page:src/pages/api/friends/[id]@_@ts":"pages/api/friends/_id_.astro.mjs","\u0000@astro-page:src/pages/api/friends/index@_@ts":"pages/api/friends.astro.mjs","\u0000@astro-page:src/pages/api/jobs/[id]@_@ts":"pages/api/jobs/_id_.astro.mjs","\u0000@astro-page:src/pages/api/jobs/index@_@ts":"pages/api/jobs.astro.mjs","\u0000@astro-page:src/pages/api/users/[id]@_@ts":"pages/api/users/_id_.astro.mjs","\u0000@astro-page:src/pages/api/users/index@_@ts":"pages/api/users.astro.mjs","\u0000@astro-page:src/pages/forgot-password@_@astro":"pages/forgot-password.astro.mjs","\u0000@astro-page:src/pages/jobs/add@_@astro":"pages/jobs/add.astro.mjs","\u0000@astro-page:src/pages/jobs/edit/[id]@_@astro":"pages/jobs/edit/_id_.astro.mjs","\u0000@astro-page:src/pages/jobs/jobs@_@astro":"pages/jobs/jobs.astro.mjs","\u0000@astro-page:src/pages/jobs/[id]@_@astro":"pages/jobs/_id_.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/register@_@astro":"pages/register.astro.mjs","\u0000@astro-page:src/pages/reset-password@_@astro":"pages/reset-password.astro.mjs","\u0000@astro-page:src/pages/users/add@_@astro":"pages/users/add.astro.mjs","\u0000@astro-page:src/pages/users/edit/[id]@_@astro":"pages/users/edit/_id_.astro.mjs","\u0000@astro-page:src/pages/users/users@_@astro":"pages/users/users.astro.mjs","\u0000@astro-page:src/pages/users/[id]@_@astro":"pages/users/_id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Bo_5v1s0.mjs","D:/apps/erlenhof-resource-pool/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_VRY5dcWO.mjs","@/components/ui/component-wrapper":"_astro/component-wrapper.CS92-H-t.js","@/components/select-role":"_astro/select-role.CV3i0U5v.js","@/components/select-status":"_astro/select-status.DaCM0TKx.js","@/components/alert-dialog-del-job":"_astro/alert-dialog-del-job.CE5lt5dv.js","@/app/dashboard/page":"_astro/page.BdczKJDk.js","@astrojs/react/client.js":"_astro/client.DXT7MGXl.js","D:/apps/erlenhof-resource-pool/src/pages/jobs/edit/[id].astro?astro&type=script&index=0&lang.ts":"_astro/_id_.astro_astro_type_script_index_0_lang.DfR1XVfl.js","D:/apps/erlenhof-resource-pool/src/pages/users/edit/[id].astro?astro&type=script&index=0&lang.ts":"_astro/_id_.astro_astro_type_script_index_0_lang.DJ-inksJ.js","D:/apps/erlenhof-resource-pool/src/components/RegisterForm.astro?astro&type=script&index=0&lang.ts":"_astro/RegisterForm.astro_astro_type_script_index_0_lang.Bhrb5T4-.js","D:/apps/erlenhof-resource-pool/src/components/LoginForm.astro?astro&type=script&index=0&lang.ts":"_astro/LoginForm.astro_astro_type_script_index_0_lang.Bw77gchE.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["D:/apps/erlenhof-resource-pool/src/pages/jobs/edit/[id].astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"delete-document\"),n=document.querySelector(\"form\")?.getAttribute(\"action\");t.addEventListener(\"click\",async()=>{const e=await fetch(n,{method:\"DELETE\"});e.redirected&&window.location.assign(e.url)});"],["D:/apps/erlenhof-resource-pool/src/pages/users/edit/[id].astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"delete-document\"),n=document.querySelector(\"form\")?.getAttribute(\"action\");t.addEventListener(\"click\",async()=>{const e=await fetch(n,{method:\"DELETE\"});e.redirected&&window.location.assign(e.url)});"],["D:/apps/erlenhof-resource-pool/src/components/RegisterForm.astro?astro&type=script&index=0&lang.ts","document.querySelector(\"form\").addEventListener(\"submit\",function(n){n.preventDefault(),document.querySelectorAll(\".error-message\").forEach(m=>{m.classList.add(\"hidden\")});const d=document.getElementById(\"name\").value,o=document.getElementById(\"surname\").value,s=document.getElementById(\"email\").value,t=document.getElementById(\"password\").value,r=document.getElementById(\"confirmPassword\").value;let e=!0;d||(document.getElementById(\"name-error\").classList.remove(\"hidden\"),e=!1),o||(document.getElementById(\"surname-error\").classList.remove(\"hidden\"),e=!1),s?/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(s)||(document.getElementById(\"email-error\").textContent=\"Invalid email format.\",document.getElementById(\"email-error\").classList.remove(\"hidden\"),e=!1):(document.getElementById(\"email-error\").classList.remove(\"hidden\"),e=!1),t?t.length<6&&(document.getElementById(\"password-error\").textContent=\"Password must be at least 6 characters.\",document.getElementById(\"password-error\").classList.remove(\"hidden\"),e=!1):(document.getElementById(\"password-error\").classList.remove(\"hidden\"),e=!1),r?t!==r&&(document.getElementById(\"confirmPassword-error\").textContent=\"Passwords do not match.\",document.getElementById(\"confirmPassword-error\").classList.remove(\"hidden\"),e=!1):(document.getElementById(\"confirmPassword-error\").classList.remove(\"hidden\"),e=!1),e&&this.submit()});"]],"assets":["/_astro/index.ej0knFEB.css","/erlenhof-logo.svg","/favicon.svg","/placeholder.svg","/shadcn.jpg","/_astro/alert-dialog-del-job.CE5lt5dv.js","/_astro/button.DDs6NgrR.js","/_astro/client.DXT7MGXl.js","/_astro/component-wrapper.CS92-H-t.js","/_astro/createLucideIcon.7s78tBKb.js","/_astro/index.BCtMShv3.js","/_astro/index.ClLcAK3B.js","/_astro/index.DaKJxkVF.js","/_astro/LoginForm.astro_astro_type_script_index_0_lang.Bw77gchE.js","/_astro/page.BdczKJDk.js","/_astro/select-role.CV3i0U5v.js","/_astro/select-status.DaCM0TKx.js","/_astro/select.DDoUzXqB.js","/_astro/tslib.es6.De9GV7Vy.js","/_astro/utils.Ch1JaNiN.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"S8pjtETwb/jYbLqw1GTUn8KQCqUQjCl02x5Pv96FCwc="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
