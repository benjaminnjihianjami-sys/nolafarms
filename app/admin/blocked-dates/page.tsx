import { AddBlockedDateForm, RemoveBlockedDateButton } from '@/components/admin/BlockedDateControls';
import { getBlockedDates } from '@/lib/admin-data';

export default async function AdminBlockedDatesPage() {
  const { blockedDates, setupMessage } = await getBlockedDates();

  return (
    <div className="space-y-8">
      <div className="border border-farm-border bg-cream-secondary p-8">
        <h1 className="font-serif text-5xl text-brand-deep">Blocked Dates</h1>
        <p className="mt-4 text-brand-deep/70">Block closures and unavailable dates so visitors cannot choose them.</p>
        {setupMessage && <p className="mt-6 border border-gold-warm bg-gold-warm/10 p-4 text-sm text-brand-deep">{setupMessage}</p>}
      </div>
      <AddBlockedDateForm />
      <div className="space-y-3">
        {blockedDates.map((date) => (
          <article key={date.id} className="flex flex-col justify-between gap-4 border border-farm-border bg-cream-warm p-5 md:flex-row md:items-center">
            <div>
              <h2 className="font-serif text-2xl text-brand-deep">{date.date}</h2>
              <p className="text-brand-deep/70">{date.reason || 'No reason provided'}</p>
            </div>
            <RemoveBlockedDateButton id={date.id} />
          </article>
        ))}
      </div>
    </div>
  );
}
