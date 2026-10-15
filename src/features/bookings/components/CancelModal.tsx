import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import type { Booking } from '../../../types';

interface CancelModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingId: string) => void;
}

export const CancelModal: React.FC<CancelModalProps> = ({
  booking,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Cancel Reservation</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            Are you sure you want to cancel your reservation for{' '}
            <strong className="text-slate-900">{booking.venueName}</strong> on{' '}
            <strong className="text-slate-900">{booking.bookingDate}</strong>?
          </p>
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-xl mb-4">
            This will immediately release your time slot ({booking.slotTime}) so other players can book it.
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition"
            >
              Keep Booking
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm(booking.id);
                onClose();
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-lg text-sm font-semibold transition shadow-sm"
            >
              Yes, Cancel Slot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};