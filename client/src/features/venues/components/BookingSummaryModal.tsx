import React from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle, Users } from 'lucide-react';
import type { Venue, TimeSlot } from '../../../types';

interface BookingSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  venue: Venue;
  selectedDate: string;
  selectedSlot: TimeSlot;
  splitCount: number;
}

export const BookingSummaryModal: React.FC<BookingSummaryModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  venue,
  selectedDate,
  selectedSlot,
  splitCount,
}) => {
  if (!isOpen) return null;

  const perPersonCost = Math.round(venue.pricePerHour / splitCount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Confirm Reservation</h2>
            <p className="text-xs text-slate-500">Review your slot details before booking</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Details Body */}
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2.5">
            <h3 className="font-bold text-slate-900 text-base">{venue.name}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{venue.address}</span>
            </p>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-700">
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                {selectedDate}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                {selectedSlot.time} ({selectedSlot.courtNumber})
              </span>
            </div>
          </div>

          {/* Pricing & Split Breakdown */}
          <div className="space-y-2 pt-1 text-sm">
            <div className="flex justify-between text-slate-600 text-xs">
              <span>Court Hourly Rate</span>
              <span>₹{venue.pricePerHour}</span>
            </div>

            {splitCount > 1 && (
              <div className="flex justify-between text-emerald-700 text-xs font-semibold bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  Split between {splitCount} players
                </span>
                <span>₹{perPersonCost} / player</span>
              </div>
            )}

            <div className="flex justify-between items-center text-slate-900 font-bold pt-2 border-t border-slate-100 text-base">
              <span>Total Payable</span>
              <span className="text-emerald-600 text-xl">₹{venue.pricePerHour}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm text-slate-600 hover:text-slate-900 font-medium transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-sm font-semibold transition shadow-sm flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Confirm & Book</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};