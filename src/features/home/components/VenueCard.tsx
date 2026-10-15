import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import type { Venue } from '../../../types';

interface VenueCardProps {
  venue: Venue;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Venue Thumbnail & Overlay Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={venue.images[0]}
          alt={venue.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{venue.rating.toFixed(1)}</span>
          <span className="text-slate-400 font-normal">({venue.reviewCount})</span>
        </div>
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-medium">
          {venue.sport}
        </div>
      </div>

      {/* Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{venue.name}</h3>
          <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{venue.address}</span>
            <span className="text-slate-300">•</span>
            <span className="font-medium text-slate-600">{venue.distanceKm} km away</span>
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Starting from</span>
            <span className="text-lg font-bold text-slate-900">₹{venue.pricePerHour}</span>
            <span className="text-xs text-slate-500"> / hr</span>
          </div>

          <button
            onClick={() => navigate(`/venues/${venue.id}`)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-sm font-semibold transition"
          >
            View Slots
          </button>
        </div>
      </div>
    </div>
  );
};