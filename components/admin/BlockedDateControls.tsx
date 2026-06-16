'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AddBlockedDateForm() {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch('/api/blocked-dates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: formData.get('date'), reason: formData.get('reason') }),
    });
    setStatus(response.ok ? 'Date blocked.' : 'Date could not be blocked.');
    if (response.ok) {
      form.reset();
      router.refresh();
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 border border-farm-border bg-cream-warm p-5 md:grid-cols-[180px_1fr_auto]">
      <input name="date" type="date" required className="border border-farm-border bg-cream-primary px-3 py-2 outline-none focus:border-brand-leaf" />
      <input name="reason" placeholder="Internal reason" className="border border-farm-border bg-cream-primary px-3 py-2 outline-none focus:border-brand-leaf" />
      <button className="bg-brand-deep px-5 py-2 text-xs font-semibold uppercase tracking-widest text-cream-primary hover:bg-brand-primary">Block Date</button>
      {status && <p className="text-sm text-brand-leaf md:col-span-3">{status}</p>}
    </form>
  );
}

export function RemoveBlockedDateButton({ id }: { id: string }) {
  const router = useRouter();

  async function remove() {
    await fetch(`/api/blocked-dates/${id}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <button onClick={remove} className="border border-brand-deep px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand-deep hover:bg-brand-deep hover:text-cream-primary">
      Remove
    </button>
  );
}
