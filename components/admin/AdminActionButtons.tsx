'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AdminActionButtons({ bookingId, compact = false }: { bookingId: string; compact?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function action(kind: 'approve' | 'reject' | 'cancel' | 'complete') {
    const note = kind === 'reject' || kind === 'cancel' ? window.prompt('Optional note for the visitor') : null;
    if ((kind === 'reject' || kind === 'cancel') && note === null) return;
    setLoading(kind);
    await fetch(`/api/bookings/${bookingId}/${kind}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_note: note }),
    });
    setLoading(null);
    router.refresh();
  }

  const buttonClass = compact
    ? 'border border-brand-deep px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-brand-deep hover:bg-brand-deep hover:text-cream-primary disabled:opacity-60'
    : 'px-5 py-3 text-xs font-semibold uppercase tracking-widest text-cream-primary disabled:opacity-60';

  return (
    <div className="flex flex-wrap gap-2">
      <button disabled={loading !== null} onClick={() => action('approve')} className={compact ? buttonClass : `${buttonClass} bg-brand-primary hover:bg-brand-mid`}>
        {loading === 'approve' ? 'Approving' : 'Approve'}
      </button>
      <button disabled={loading !== null} onClick={() => action('reject')} className={compact ? buttonClass : `${buttonClass} bg-red-700 hover:bg-red-800`}>
        {loading === 'reject' ? 'Rejecting' : 'Reject'}
      </button>
      <button disabled={loading !== null} onClick={() => action('cancel')} className={compact ? buttonClass : `${buttonClass} bg-farm-muted hover:bg-brand-dark`}>
        {loading === 'cancel' ? 'Cancelling' : 'Cancel'}
      </button>
      <button disabled={loading !== null} onClick={() => action('complete')} className={compact ? buttonClass : `${buttonClass} bg-brand-deep hover:bg-brand-primary`}>
        {loading === 'complete' ? 'Saving' : 'Complete'}
      </button>
    </div>
  );
}
