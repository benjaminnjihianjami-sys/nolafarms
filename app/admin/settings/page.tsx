import { SITE } from '@/lib/constants';

export default function AdminSettingsPage() {
  return (
    <div className="border border-farm-border bg-cream-secondary p-8">
      <h1 className="font-serif text-5xl text-brand-deep">Farm Settings</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="border border-farm-border bg-cream-warm p-6">
          <h2 className="font-serif text-3xl text-brand-deep">Farm Details</h2>
          <dl className="mt-5 space-y-3 text-brand-deep/75">
            <div><dt className="font-semibold">Farm name</dt><dd>{SITE.name}</dd></div>
            <div><dt className="font-semibold">Contact email</dt><dd>{SITE.email}</dd></div>
            <div><dt className="font-semibold">WhatsApp</dt><dd>{SITE.whatsapp}</dd></div>
          </dl>
        </section>
        <section className="border border-farm-border bg-cream-warm p-6">
          <h2 className="font-serif text-3xl text-brand-deep">Booking Rules</h2>
          <dl className="mt-5 space-y-3 text-brand-deep/75">
            <div><dt className="font-semibold">Minimum advance notice</dt><dd>24 hours</dd></div>
            <div><dt className="font-semibold">Visit time slots</dt><dd>Morning (9:00 AM), Afternoon (1:00 PM)</dd></div>
            <div><dt className="font-semibold">Reminder emails</dt><dd>On, via Supabase Edge Function scaffold</dd></div>
          </dl>
        </section>
      </div>
    </div>
  );
}
