import type { BlockedDate, Booking } from './booking-types';
import { getSupabaseAdmin, isSupabaseConfigured } from './supabase';

export async function getAdminBookings() {
  if (!isSupabaseConfigured()) return { bookings: [] as Booking[], setupMessage: setupMessage() };
  const { data, error } = await getSupabaseAdmin().from('bookings').select('*').order('created_at', { ascending: false });
  if (error) return { bookings: [] as Booking[], setupMessage: error.message };
  return { bookings: (data || []) as Booking[], setupMessage: null };
}

export async function getAdminBooking(id: string) {
  if (!isSupabaseConfigured()) return { booking: null as Booking | null, setupMessage: setupMessage() };
  const { data, error } = await getSupabaseAdmin().from('bookings').select('*').eq('id', id).single();
  if (error) return { booking: null as Booking | null, setupMessage: error.message };
  return { booking: data as Booking, setupMessage: null };
}

export async function getBlockedDates() {
  if (!isSupabaseConfigured()) return { blockedDates: [] as BlockedDate[], setupMessage: setupMessage() };
  const { data, error } = await getSupabaseAdmin().from('blocked_dates').select('*').order('date');
  if (error) return { blockedDates: [] as BlockedDate[], setupMessage: error.message };
  return { blockedDates: (data || []) as BlockedDate[], setupMessage: null };
}

export function bookingStats(bookings: Booking[]) {
  const today = new Date().toISOString().slice(0, 10);
  const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const monthStart = today.slice(0, 7);

  return {
    pending: bookings.filter((booking) => booking.status === 'pending').length,
    confirmed: bookings.filter((booking) => booking.status === 'confirmed').length,
    thisWeek: bookings.filter((booking) => booking.visit_date >= today && booking.visit_date <= weekFromNow).length,
    thisMonth: bookings.filter((booking) => booking.visit_date.startsWith(monthStart)).length,
    todayVisits: bookings.filter((booking) => booking.visit_date === today && booking.status === 'confirmed'),
    pendingBookings: bookings.filter((booking) => booking.status === 'pending'),
  };
}

function setupMessage() {
  return 'Supabase is not configured yet. Add environment variables and run supabase/schema.sql to activate dashboard data.';
}
