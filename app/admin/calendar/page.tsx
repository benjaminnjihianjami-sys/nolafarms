import Link from 'next/link';
import { StatusBadge } from '@/components/bookings/StatusBadge';
import { getAdminBookings, getBlockedDates } from '@/lib/admin-data';

export default async function AdminCalendarPage() {
  const [{ bookings, setupMessage }, { blockedDates }] = await Promise.all([getAdminBookings(), getBlockedDates()]);
  const days = Array.from(new Set([...bookings.map((booking) => booking.visit_date), ...blockedDates.map((date) => date.date)])).sort();

  return (
    <div className="border border-farm-border bg-cream-secondary p-8">
      <h1 className="font-serif text-5xl text-brand-deep">Calendar</h1>
      <p className="mt-4 text-brand-deep/70">Month and week modes can build on this date-indexed view.</p>
      {setupMessage && <p className="mt-6 border border-gold-warm bg-gold-warm/10 p-4 text-sm text-brand-deep">{setupMessage}</p>}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {days.map((day) => {
          const dayBookings = bookings.filter((booking) => booking.visit_date === day);
          const blocked = blockedDates.find((date) => date.date === day);
          return (
            <article key={day} className="border border-farm-border bg-cream-warm p-5">
              <h2 className="font-serif text-2xl text-brand-deep">{day}</h2>
              {blocked && <p className="mt-2 text-sm text-red-800">Blocked: {blocked.reason || 'No reason provided'}</p>}
              <div className="mt-4 space-y-3">
                {dayBookings.map((booking) => (
                  <Link href={`/admin/bookings/${booking.id}`} key={booking.id} className="block border border-farm-border bg-cream-primary p-3 hover:border-brand-leaf">
                    <div className="flex justify-between gap-3">
                      <span>{booking.reference} - {booking.full_name}</span>
                      <StatusBadge status={booking.status} />
                    </div>
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
        {!setupMessage && days.length === 0 && <p className="text-brand-deep/65">No calendar entries yet.</p>}
      </div>
    </div>
  );
}
