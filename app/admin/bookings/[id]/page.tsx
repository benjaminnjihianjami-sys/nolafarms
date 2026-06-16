import { AdminActionButtons } from '@/components/admin/AdminActionButtons';
import { StatusBadge } from '@/components/bookings/StatusBadge';
import { getAdminBooking } from '@/lib/admin-data';
import { VISIT_TIMES } from '@/lib/booking-utils';

export default async function AdminBookingDetailPage({ params }: { params: { id: string } }) {
  const { booking, setupMessage } = await getAdminBooking(params.id);

  if (!booking) {
    return (
      <div className="border border-farm-border bg-cream-secondary p-8">
        <h1 className="font-serif text-5xl text-brand-deep">Booking Detail</h1>
        <p className="mt-6 border border-gold-warm bg-gold-warm/10 p-4 text-sm text-brand-deep">{setupMessage || 'Booking not found.'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border border-farm-border bg-cream-secondary p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-leaf">Submitted: {booking.created_at}</p>
            <h1 className="mt-3 font-serif text-5xl text-brand-deep">Booking {booking.reference}</h1>
          </div>
          <StatusBadge status={booking.status} />
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <section className="border border-farm-border bg-cream-warm p-6">
          <h2 className="font-serif text-3xl text-brand-deep">Visitor Details</h2>
          <dl className="mt-5 space-y-3 text-brand-deep/75">
            <div><dt className="font-semibold">Name</dt><dd>{booking.full_name}</dd></div>
            <div><dt className="font-semibold">Phone</dt><dd><a href={`tel:${booking.phone_number}`} className="text-brand-leaf">{booking.phone_number}</a></dd></div>
            <div><dt className="font-semibold">Email</dt><dd>{booking.email}</dd></div>
            <div><dt className="font-semibold">Account</dt><dd>{booking.user_id ? 'Linked Clerk user' : 'Guest booking'}</dd></div>
          </dl>
        </section>
        <section className="border border-farm-border bg-cream-warm p-6">
          <h2 className="font-serif text-3xl text-brand-deep">Visit Details</h2>
          <dl className="mt-5 space-y-3 text-brand-deep/75">
            <div><dt className="font-semibold">Date</dt><dd>{booking.visit_date}</dd></div>
            <div><dt className="font-semibold">Time</dt><dd>{VISIT_TIMES[booking.visit_time]}</dd></div>
            <div><dt className="font-semibold">Group size</dt><dd>{booking.group_size} people</dd></div>
            <div><dt className="font-semibold">Purpose</dt><dd>{booking.purpose}</dd></div>
            <div><dt className="font-semibold">Special requests</dt><dd>{booking.special_requests || 'None provided'}</dd></div>
          </dl>
        </section>
      </div>
      <section className="border border-farm-border bg-cream-secondary p-8">
        <h2 className="font-serif text-3xl text-brand-deep">Admin Action</h2>
        <p className="mt-3 text-brand-deep/70">Approve, reject, cancel, or mark this booking as completed. Rejection and cancellation actions allow an optional note.</p>
        <div className="mt-7"><AdminActionButtons bookingId={booking.id} /></div>
      </section>
    </div>
  );
}
