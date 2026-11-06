import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Check, Users, Sparkles } from 'lucide-react';
import { useBookingContext } from '../../context/BookingContext';
import type { TimeSlot } from '../../types';
import { SlotPicker } from './components/SlotPicker';
import { BookingSummaryModal } from './components/BookingSummaryModal';

export const VenueDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getVenueById, bookSlot } = useBookingContext();

  const venue = getVenueById(id || '');

  // Booking Flow States
  const dates = useMemo(() => {
    return venue ? Object.keys(venue.availableSlots) : [];
  }, [venue]);

  const [selectedDate, setSelectedDate] = useState<string>(() => dates[0] || '2026-10-15');
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [splitCount, setSplitCount] = useState<number>(1);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  if (!venue) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Venue Not Found</h2>
        <p className="text-sm text-slate-500 mt-2 mb-6">
          The sports facility you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition"
        >
          Return to Grounds
        </Link>
      </div>
    );
  }

  const currentSlots = venue.availableSlots[selectedDate] || [];
  const selectedSlot = currentSlots.find((s) => s.id === selectedSlotId);

  const handleSlotToggle = (slot: TimeSlot) => {
    setSelectedSlotId((prev) => (prev === slot.id ? null : slot.id));
  };

  const handleConfirmReservation = () => {
    if (!selectedSlot) return;

    const success = bookSlot({
      venueId: venue.id,
      slotId: selectedSlot.id,
      date: selectedDate,
      courtNumber: selectedSlot.courtNumber,
      slotTime: selectedSlot.time,
      splitCount,
    });

    if (success) {
      setIsConfirmModalOpen(false);
      setSelectedSlotId(null);
      navigate('/bookings');
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Explore</span>
      </button>

      {/* Main Grid: Gallery & Info vs Sticky Booking Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Venue Presentation */}
        <div className="lg:col-span-7 space-y-6">
          {/* Photo Showcase */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
            <div className="h-72 sm:h-96 w-full">
              <img
                src={venue.images[0]}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
            </div>
            {venue.images.length > 1 && (
              <div className="grid grid-cols-2 gap-2 p-2 bg-slate-50 border-t border-slate-100">
                {venue.images.slice(1).map((img, idx) => (
                  <div key={idx} className="h-28 rounded-lg overflow-hidden">
                    <img
                      src={img}
                      alt={`${venue.name} gallery ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Metadata & Title */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-slate-900 text-white px-2.5 py-1 rounded-md">
                {venue.sport}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-full">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{venue.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">({venue.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{venue.name}</h1>
            <p className="text-sm text-slate-500 flex items-center gap-1 mt-1.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{venue.address}</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">{venue.distanceKm} km away</span>
            </p>
          </div>

          {/* Amenities List */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Facility Amenities
            </h3>
            <div className="flex flex-wrap gap-2">
              {venue.amenities.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking Widget */}
        <div className="lg:col-span-5 sticky top-20 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Court Rental Fee</span>
              <span className="text-2xl font-extrabold text-slate-900">₹{venue.pricePerHour}</span>
              <span className="text-xs text-slate-500"> / hour</span>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Instant Confirmation
            </span>
          </div>

          {/* Date & Slot Selector */}
          <SlotPicker
            dates={dates}
            selectedDate={selectedDate}
            onSelectDate={(d) => {
              setSelectedDate(d);
              setSelectedSlotId(null);
            }}
            slots={currentSlots}
            selectedSlotId={selectedSlotId}
            onSelectSlot={handleSlotToggle}
          />

          {/* Split Bill Calculator */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                Split with Friends
              </span>
              <span className="text-emerald-600 font-bold">
                ₹{Math.round(venue.pricePerHour / splitCount)} / person
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSplitCount((prev) => Math.max(1, prev - 1))}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition flex items-center justify-center text-sm"
              >
                -
              </button>
              <span className="text-xs font-bold text-slate-800 flex-1 text-center">
                {splitCount} {splitCount === 1 ? 'Player' : 'Players'}
              </span>
              <button
                type="button"
                onClick={() => setSplitCount((prev) => Math.min(10, prev + 1))}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Booking Action CTA */}
          <button
            type="button"
            disabled={!selectedSlot}
            onClick={() => setIsConfirmModalOpen(true)}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] text-white font-bold rounded-xl text-sm transition shadow-sm"
          >
            {selectedSlot ? 'Reserve Selected Slot' : 'Select a Slot to Continue'}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedSlot && (
        <BookingSummaryModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmReservation}
          venue={venue}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          splitCount={splitCount}
        />
      )}
    </div>
  );
};