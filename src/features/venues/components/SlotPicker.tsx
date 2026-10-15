import React from 'react';
import { Clock, Ban, Check } from 'lucide-react';
import type { TimeSlot } from '../../../types';

interface SlotPickerProps {
  dates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  slots: TimeSlot[];
  selectedSlotId: string | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

export const SlotPicker: React.FC<SlotPickerProps> = ({
  dates,
  selectedDate,
  onSelectDate,
  slots,
  selectedSlotId,
  onSelectSlot,
}) => {
  return (
    <div className="space-y-4">
      {/* Date Tabs */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          1. Select Date
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {dates.map((date) => {
            const isSelected = selectedDate === date;
            return (
              <button
                key={date}
                type="button"
                onClick={() => onSelectDate(date)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {date}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slots Grid */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            2. Available Time Slots
          </label>
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full border border-emerald-500 bg-emerald-50" />
              Available
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              Booked
            </span>
          </div>
        </div>

        {slots && slots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {slots.map((slot) => {
              const isSelected = selectedSlotId === slot.id;

              if (slot.isBooked) {
                return (
                  <button
                    key={slot.id}
                    disabled
                    type="button"
                    className="p-3 rounded-xl border border-dashed border-slate-200 bg-slate-100 text-slate-400 text-xs flex items-center justify-between cursor-not-allowed opacity-75"
                  >
                    <span className="flex items-center gap-1.5 line-through">
                      <Clock className="w-3.5 h-3.5" />
                      {slot.time}
                    </span>
                    <span className="text-[10px] font-semibold uppercase flex items-center gap-1">
                      <Ban className="w-3 h-3" /> Booked
                    </span>
                  </button>
                );
              }

              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => onSelectSlot(slot)}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {slot.time}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      isSelected
                        ? 'bg-white/20 text-white flex items-center gap-1'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3 h-3" /> Selected
                      </>
                    ) : (
                      slot.courtNumber
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
            No slots scheduled for this date.
          </div>
        )}
      </div>
    </div>
  );
};