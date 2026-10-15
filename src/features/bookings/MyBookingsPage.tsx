import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { CalendarCheck2, ArrowRight } from 'lucide-react';
import { useBookingContext } from '../../context/BookingContext';
import type { Booking } from '../../types';
import { BookingCard } from './components/BookingCard';
import { CancelModal } from './components/CancelModal';

export const MyBookingsPage: React.FC = () => {
  const { bookings, cancelBooking } = useBookingContext();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<Booking | null>(null);

  // Split bookings by status
  const upcomingBookings = useMemo(
    () => bookings.filter((b) => b.status === 'upcoming'),
    [bookings]
  );

  const pastBookings = useMemo(
    () => bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled'),
    [bookings]
  );

  const displayedList = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Bookings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review your reserved court time slots and cancellation history[cite: 1].
        </p>
      </div>

      {/* Segmented Tab Controls */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`py-3 px-6 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'upcoming'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Upcoming</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              activeTab === 'upcoming'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {upcomingBookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`py-3 px-6 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'past'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Past & Cancelled</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              activeTab === 'past'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {pastBookings.length}
          </span>
        </button>
      </div>

      {/* Bookings Feed */}
      {displayedList.length > 0 ? (
        <div className="space-y-4">
          {displayedList.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancelRequest={(b) => setSelectedBookingForCancel(b)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <CalendarCheck2 className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">
            {activeTab === 'upcoming' ? 'No upcoming bookings' : 'No past bookings found'}
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mb-6">
            {activeTab === 'upcoming'
              ? "You haven't reserved any sports courts yet. Explore nearby grounds and book a slot!"
              : 'You do not have any past or cancelled reservations on record.'}
          </p>
          {activeTab === 'upcoming' && (
            <NavLink
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition shadow-sm"
            >
              <span>Explore Grounds</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          )}
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      <CancelModal
        booking={selectedBookingForCancel}
        isOpen={Boolean(selectedBookingForCancel)}
        onClose={() => setSelectedBookingForCancel(null)}
        onConfirm={cancelBooking}
      />
    </div>
  );
};