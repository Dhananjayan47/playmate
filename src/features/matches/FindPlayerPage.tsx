import React, { useState, useMemo } from 'react';
import { Plus, Users, Search } from 'lucide-react';
import { useMatchContext } from '../../context/MatchContext';
import type { SportType } from '../../types';
import { MatchCard } from './components/MatchCard';
import { HostGameModal } from './components/HostGameModal';

const FILTER_SPORTS: (SportType | 'All')[] = [
  'All',
  'Badminton',
  'Football',
  'Cricket',
  'Tennis',
  'Basketball',
  'Paddle',
];

export const FindPlayersPage: React.FC = () => {
  const { games, requestToJoin, acceptJoinRequest, declineJoinRequest } = useMatchContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<SportType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic filter for matches feed
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSport = selectedSport === 'All' || game.sport === selectedSport;
      const matchesSearch =
        game.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.hostName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSport && matchesSearch;
    });
  }, [games, selectedSport, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Header & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find Players & Pickup Games
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Join casual games near you or post a match to fill your empty spots.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold rounded-xl text-sm transition shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Host a Game</span>
        </button>
      </div>

      {/* Search & Sport Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by turf name, sport, or host..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-sm"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FILTER_SPORTS.map((sport) => {
            const isActive = selectedSport === sport;
            return (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
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
      </div>

      {/* Matches Feed Header */}
      <div className="text-xs font-semibold text-slate-500">
        Showing {filteredGames.length} active match{filteredGames.length === 1 ? '' : 'es'}
      </div>

      {/* Games Grid or Empty State */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <MatchCard
              key={game.id}
              game={game}
              onJoin={requestToJoin}
              onAccept={acceptJoinRequest}
              onDecline={declineJoinRequest}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">No matches found</h3>
          <p className="text-sm text-slate-500 max-w-sm mb-5">
            There are currently no open pickup games matching this criteria. Post one yourself to get players[cite: 1]!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition"
          >
            + Host a Game Now
          </button>
        </div>
      )}

      {/* Modal Dialog for Hosting */}
      <HostGameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};