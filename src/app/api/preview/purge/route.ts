import { NextResponse } from 'next/server';
import { purgeExpired } from '@/lib/previewStore';

/**
 * Deletes previews past their window.
 *
 * Expiry is already enforced on read, so a missed run can never expose an old
 * preview — this only reclaims storage. Wired to a daily Vercel cron.
 */

export const runtime = 'nodejs';

export async function GET(request: Request) {
  // Vercel signs cron invocations with CRON_SECRET; anything else must present it.
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get('authorization') ?? '';
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const removed = await purgeExpired();
  return NextResponse.json({ removed: removed.length, slugs: removed });
}
