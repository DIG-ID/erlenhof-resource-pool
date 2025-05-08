// src/pages/api/cron/promote-jobs.ts
import type { APIRoute } from 'astro';
import { promoteOldJobs } from '@/cron/promote-jobs';

export const get: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  if (url.searchParams.get('secret') !== process.env.CRON_SECRET) {
    return new Response('❌ Unauthorized', { status: 401 });
  }

  try {
    await promoteOldJobs();
    return new Response('✅ Jobs promovidos com sucesso', { status: 200 });
  } catch (err: any) {
    console.error('[cron] erro ao promover jobs:', err);
    return new Response(`❌ Erro interno: ${err.message}`, { status: 500 });
  }
};
