import Link from 'next/link';
import type { ReactNode } from 'react';

const links = [
  { label: 'Overview', href: '/admin' },
  { label: 'Bookings', href: '/admin/bookings' },
  { label: 'Calendar', href: '/admin/calendar' },
  { label: 'Blocked Dates', href: '/admin/blocked-dates' },
  { label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-cream-primary pt-28">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-6 py-12 md:grid-cols-[260px_1fr] lg:px-8">
        <aside className="h-fit border border-farm-border bg-brand-deep p-6 text-cream-secondary">
          <h1 className="font-serif text-3xl text-cream-primary">Admin</h1>
          <nav className="mt-7 space-y-2" aria-label="Admin navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="block px-3 py-2 text-sm hover:bg-white/10 hover:text-cream-primary">
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="min-w-0">{children}</section>
      </div>
    </main>
  );
}
