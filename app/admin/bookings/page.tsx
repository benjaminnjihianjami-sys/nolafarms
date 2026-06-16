import Link from 'next/link';
import { AdminActionButtons } from '@/components/admin/AdminActionButtons';
import { StatusBadge } from '@/components/bookings/StatusBadge';
import { getAdminBookings } from '@/lib/admin-data';
import { VISIT_TIMES } from '@/lib/booking-utils';

export default async function AdminBookingsPage() {
  const { bookings, setupMessage } = await getAdminBookings();

  return (
    <div className="border border-farm-border bg-cream-secondary p-6">
      <h1 className="font-serif text-5xl text-brand-deep">All Bookings</h1>
      <p className="mt-4 text-brand-deep/70">Use the API filters for status, date range, and search in production interfaces.</p>
      {setupMessage && <p className="mt-6 border border-gold-warm bg-gold-warm/10 p-4 text-sm text-brand-deep">{setupMessage}</p>}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead className="bg-brand-deep text-cream-primary">
            <tr>
              {['Reference', 'Name', 'Phone', 'Date', 'Time', 'Group', 'Purpose', 'Status', 'Actions'].map((heading) => <th key={heading} className="p-3">{heading}</th>)}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-farm-border bg-cream-warm">
                <td className="p-3"><Link href={`/admin/bookings/${booking.id}`} className="text-brand-leaf">{booking.reference}</Link></td>
                <td className="p-3">{booking.full_name}</td>
                <td className="p-3">{booking.phone_number}</td>
                <td className="p-3">{booking.visit_date}</td>
                <td className="p-3">{VISIT_TIMES[booking.visit_time]}</td>
                <td className="p-3">{booking.group_size}</td>
                <td className="p-3">{booking.purpose}</td>
                <td className="p-3"><StatusBadge status={booking.status} /></td>
                <td className="p-3"><AdminActionButtons bookingId={booking.id} compact /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {!setupMessage && bookings.length === 0 && <p className="mt-6 text-brand-deep/65">No bookings found.</p>}
      </div>
    </div>
  );
}
