import type { Config } from "@netlify/functions";

// Scheduled function that triggers job promotion (level_1 -> level_2) every 5 minutes.
// Replaces the GitHub Actions cron, which GitHub disables after 60 days of repo inactivity.
// Runs server-side on Netlify infra and authenticates via the Authorization header,
// so the CRON_SECRET never appears in a URL, server log or analytics (SECURITY-TODO #8).
export default async () => {
  const secret = process.env.CRON_SECRET;
  // Netlify exposes the live site URL via these env vars at runtime.
  const baseUrl = process.env.URL ?? process.env.DEPLOY_PRIME_URL;

  if (!secret) {
    console.error("[cron] CRON_SECRET is not set");
    return new Response("Missing CRON_SECRET", { status: 500 });
  }
  if (!baseUrl) {
    console.error("[cron] site URL env var is not available");
    return new Response("Missing site URL", { status: 500 });
  }

  const res = await fetch(`${baseUrl}/api/cron/promote-jobs`, {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}` },
  });

  const body = await res.text();
  if (!res.ok) {
    console.error(`[cron] promote-jobs failed (${res.status}): ${body}`);
    return new Response(body, { status: res.status });
  }

  console.log(`[cron] promote-jobs ok: ${body}`);
  return new Response(body, { status: 200 });
};

export const config: Config = {
  schedule: "*/5 * * * *",
};
