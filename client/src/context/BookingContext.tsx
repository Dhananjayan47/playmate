import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { Venue, Booking } from "../types";
import { INITIAL_VENUES } from "../data/venues.mock";
import { INITIAL_BOOKINGS } from "../data/booking.mock";


interface ReserveSlotParams {
  venueId: string;
  slotId: string;
  date: string;
  courtNumber: string;
  slotTime: string;
  splitCount?: number;
}

interface BookingContextType {
  venues: Venue[];
  bookings: Booking[];
  bookSlot: (params: ReserveSlotParams) => boolean;
  cancelBooking: (bookingId: string) => void;
  getVenueById: (id: string) => Venue | undefined;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [venues, setVenues] = useState<Venue[]>(() => {
    const saved = localStorage.getItem("pm_venues");
    return saved ? JSON.parse(saved) : INITIAL_VENUES;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("pm_bookings");
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  useEffect(() => {
    localStorage.setItem("pm_venues", JSON.stringify(venues));
  }, [venues]);

  useEffect(() => {
    localStorage.setItem("pm_bookings", JSON.stringify(bookings));
  }, [bookings]);

  const getVenueById = (id: string) => {
    return venues.find((v) => v.id === id);
  };

  const bookSlot = ({
    venueId,
    slotId,
    date,
    courtNumber,
    slotTime,
    splitCount = 1,
  }: ReserveSlotParams): boolean => {
    const venue = venues.find((v) => v.id === venueId);
    if (!venue) {
      toast.error("Venue not found");
      return false;
    }

    const daySlots = venue.availableSlots[date];
    const targetSlot = daySlots?.find((s) => s.id === slotId);

    if (!targetSlot || targetSlot.isBooked) {
      toast.error("Selected slot is no longer available");
      return false;
    }

    // Mark slot as booked in venue state
    setVenues((prevVenues) =>
      prevVenues.map((v) => {
        if (v.id !== venueId) return v;
        return {
          ...v,
          availableSlots: {
            ...v.availableSlots,
            [date]: v.availableSlots[date].map((s) =>
              s.id === slotId ? { ...s, isBooked: true } : s,
            ),
          },
        };
      }),
    );

    // Create new booking record
    const newBooking: Booking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      venueId: venue.id,
      venueName: venue.name,
      venueImage: venue.images[0],
      sport: venue.sport,
      slotTime,
      bookingDate: date,
      courtNumber,
      totalPaid: venue.pricePerHour,
      splitCount,
      status: "upcoming",
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    toast.success(`Slot reserved at ${venue.name}!`);
    return true;
  };

  const cancelBooking = (bookingId: string) => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return;

    // Free slot in venue state
    setVenues((prevVenues) =>
      prevVenues.map((v) => {
        if (v.id !== target.venueId) return v;
        const currentSlots = v.availableSlots[target.bookingDate] || [];
        return {
          ...v,
          availableSlots: {
            ...v.availableSlots,
            [target.bookingDate]: currentSlots.map((s) =>
              s.time === target.slotTime && s.courtNumber === target.courtNumber
                ? { ...s, isBooked: false }
                : s,
            ),
          },
        };
      }),
    );

    // Mark booking status as cancelled
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b)),
    );

    toast(`Booking #${target.id} cancelled.`, {
      icon: "ℹ️",
      style: { borderRadius: "8px", background: "#334155", color: "#fff" },
    });
  };

  return (
    <BookingContext.Provider
      value={{
        venues,
        bookings,
        bookSlot,
        cancelBooking,
        getVenueById,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const ctx = useContext(BookingContext);
  if (!ctx)
    throw new Error("useBookingContext must be used within BookingProvider");
  return ctx;
};
