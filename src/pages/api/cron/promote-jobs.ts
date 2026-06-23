// src/pages/api/cron/promote-jobs.ts
import type { APIRoute } from 'astro';
import { promoteOldJobs } from '@/cron/promote-jobs';

export const POST: APIRoute = async ({ request }) => {
  // Auth via Authorization: Bearer <CRON_SECRET> header instead of a query param,
  // so the secret stays out of URLs, server logs and analytics (SECURITY-TODO #8).
  const authHeader = request.headers.get('authorization');
  const secret = process.env.CRON_SECRET;

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    await promoteOldJobs();
    return new Response('Jobs promoted', { status: 200 });
  } catch (err) {
    // Log the detail internally, return a generic message to the caller (SECURITY-TODO #9).
    console.error('[cron] error promoting jobs:', err);
    return new Response('Internal error', { status: 500 });
  }
};
