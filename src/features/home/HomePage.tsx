import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useBookingContext } from '../../context/BookingContext';
import type { SportType } from '../../types';
import { VenueCard } from './components/VenueCard';
import { EmptyState } from '../../components/layout/shared/EmptyState';

const SPORTS_CATEGORIES: (SportType | 'All')[] = [
  'All',
  'Badminton',
  'Football',
  'Cricket',
  'Tennis',
  'Basketball',
  'Paddle',
];

export const HomePage: React.FC = () => {
  const { venues } = useBookingContext();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<SportType | 'All'>('All');
  const [maxDistance, setMaxDistance] = useState<number>(10); // default up to 10km
  const [maxPrice, setMaxPrice] = useState<number>(1500); // default up to ₹1500
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  
  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      // 1. Text Search matches Name or Address
      const matchesSearch =
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.address.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Sport Category Match
      const matchesSport = selectedSport === 'All' || venue.sport === selectedSport;

      // 3. Distance Radius Match
      const matchesDistance = venue.distanceKm <= maxDistance;

      // 4. Max Price Match
      const matchesPrice = venue.pricePerHour <= maxPrice;

      return matchesSearch && matchesSport && matchesDistance && matchesPrice;
    });
  }, [venues, searchQuery, selectedSport, maxDistance, maxPrice]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSport('All');
    setMaxDistance(10);
    setMaxPrice(1500);
  };

  return (
    <div className="space-y-6">
      {/* Hero / Header Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Find & Book Sports Grounds
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore top-rated turfs, badminton courts, and nets near you.
        </p>
      </div>

      {/* Search Bar & Filter Drawer Toggle (Step 7) */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search venue by name or area (e.g. Tambaram, Smash Point)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-sm"
          />
        </div>

        <button
          onClick={() => setIsFilterDrawerOpen((prev) => !prev)}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition ${
            isFilterDrawerOpen || maxDistance < 10 || maxPrice < 1500
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

     
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SPORTS_CATEGORIES.map((sport) => {
          const isActive = selectedSport === sport;
          return (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {sport}
            </button>
          );
        })}
      </div>

      {/* Expandable Advanced Filters: Distance & Price Sliders (Step 8) */}
      {isFilterDrawerOpen && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {/* Max Distance Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
              <span>Maximum Distance</span>
              <span className="text-emerald-600">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>1 km</span>
              <span>15 km</span>
            </div>
          </div>

          {/* Max Price Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
              <span>Max Price / Hour</span>
              <span className="text-emerald-600">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="300"
              max="2000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>₹300</span>
              <span>₹2,000</span>
            </div>
          </div>

          {/* Reset Filters Shortcut */}
          <div className="md:col-span-2 flex justify-end">
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset all sliders
            </button>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>
          Showing {filteredVenues.length} {filteredVenues.length === 1 ? 'venue' : 'venues'}
        </span>
      </div>

      {/* Grounds Grid or Empty State (Step 9 & 10) */}
      {filteredVenues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <EmptyState onReset={handleResetFilters} />
      )}
    </div>
  );
};