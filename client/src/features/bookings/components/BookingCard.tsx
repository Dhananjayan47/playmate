import React from 'react';
import { Calendar, Clock, Users, Ban, CheckCircle2 } from 'lucide-react';
import type { Booking } from '../../../types';

interface BookingCardProps {
  booking: Booking;
  onCancelRequest: (booking: Booking) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancelRequest }) => {
  const isUpcoming = booking.status === 'upcoming';
  const isCancelled = booking.status === 'cancelled';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row">
      {/* Thumbnail Banner */}
      <div className="md:w-56 h-40 md:h-auto relative bg-slate-100 shrink-0">
        <img
          src={booking.venueImage}
          alt={booking.venueName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-xs px-2.5 py-1 rounded-md font-medium">
          {booking.sport}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: ID & Status Badge */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
              Ref: {booking.id}
            </span>

            {isUpcoming && (
              <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Confirmed
              </span>
            )}
            {booking.status === 'completed' && (
              <span className="text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full">
                Completed
              </span>
            )}
            {isCancelled && (
              <span className="text-xs font-semibold bg-red-50 text-red-600 border border-red-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Ban className="w-3.5 h-3.5" />
                Cancelled
              </span>
            )}
          </div>

          {/* Venue Name & Court Info */}
          <h3 className="font-bold text-slate-900 text-lg leading-snug mb-1">
            {booking.venueName}
          </h3>
          <p className="text-xs text-slate-500 font-medium mb-3">
            Allocated: <span className="text-slate-800">{booking.courtNumber}</span>
          </p>

          {/* Date, Time & Split Details */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              {booking.bookingDate}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              {booking.slotTime}
            </span>
            {booking.splitCount && booking.splitCount > 1 && (
              <span className="flex items-center gap-1 text-slate-500">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                Split: {booking.splitCount} players (₹{Math.round(booking.totalPaid / booking.splitCount)}/each)
              </span>
            )}
          </div>
        </div>

        {/* Footer Row: Payment & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Total Paid</span>
            <span className="text-base font-bold text-slate-900">₹{booking.totalPaid}</span>
          </div>

          <div>
            {isUpcoming && (
              <button
                onClick={() => onCancelRequest(booking)}
                className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-xs font-semibold transition active:scale-95"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};