import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Trophy, 
  Clock, 
  ShieldCheck, 
  CalendarCheck, 
  MapPin, 
  Plus, 
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useBookingContext } from '../../context/BookingContext';
import { useMatchContext } from '../../context/MatchContext';
import { CURRENT_USER_ID } from '../../data/games.mock';

export const ProfilePage: React.FC = () => {
  const { bookings } = useBookingContext();
  const { games } = useMatchContext();

  // Dynamically calculate metrics based on state
  const completedBookings = bookings.filter((b) => b.status === 'completed');
  const upcomingBookings = bookings.filter((b) => b.status === 'upcoming');
  const myHostedGames = games.filter((g) => g.hostId === CURRENT_USER_ID);

  // Static profile info
  const player = {
    name: 'Minato',
    location: 'Tambaram, Chennai',
    memberSince: 'March 2025',
    avatarLetter: 'M',
    sports: ['Badminton', 'Football', 'Tennis', 'Cricket'],
    baseGamesPlayed: 24, // historical games
    baseHours: 36,       // historical hours
    reliabilityScore: 98, // percentage
  };

  const totalGamesPlayed = player.baseGamesPlayed + completedBookings.length;
  const totalHoursOnCourt = player.baseHours + completedBookings.length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* 1. Header Card: Identity & Sports Played */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* User Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 text-white font-extrabold text-3xl flex items-center justify-center shadow-md border-2 border-emerald-400">
              {player.avatarLetter}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {player.name}
                </h1>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Verified Player
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{player.location}</span>
                <span className="text-slate-300">•</span>
                <span>Member since {player.memberSince}</span>
              </p>
            </div>
          </div>

          <NavLink
            to="/matches"
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Host Match</span>
          </NavLink>
        </div>

        {/* Sports Badges */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
            Sports Played
          </span>
          <div className="flex flex-wrap gap-2">
            {player.sports.map((sport) => (
              <span
                key={sport}
                className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                {sport}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Simple Stats View (Required Screen Item) */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          Performance & Activity Stats
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Stat 1: Games Played */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">Total Games</span>
              <span className="text-2xl font-extrabold text-slate-900 leading-tight">
                {totalGamesPlayed}
              </span>
            </div>
          </div>

          {/* Stat 2: Hours on Court */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">Hours on Court</span>
              <span className="text-2xl font-extrabold text-slate-900 leading-tight">
                {totalHoursOnCourt} hrs
              </span>
            </div>
          </div>

          {/* Stat 3: Reliability Score */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">Reliability Score</span>
              <span className="text-2xl font-extrabold text-slate-900 leading-tight">
                {player.reliabilityScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Live Account Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Active Upcoming Bookings Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-slate-800 text-sm">Upcoming Bookings</h3>
            </div>
            <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {upcomingBookings.length} Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            You have {upcomingBookings.length} court slot reservation{upcomingBookings.length === 1 ? '' : 's'} scheduled.
          </p>
          <NavLink
            to="/bookings"
            className="inline-flex items-center justify-between text-xs font-bold text-emerald-600 hover:text-emerald-700 transition pt-2 border-t border-slate-100"
          >
            <span>Manage Reservations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        {/* Hosted Pickup Games Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-800 text-sm">Hosted Match Games</h3>
            </div>
            <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {myHostedGames.length} Hosted
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            You are managing {myHostedGames.length} open pickup game{myHostedGames.length === 1 ? '' : 's'} looking for players.
          </p>
          <NavLink
            to="/matches"
            className="inline-flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-700 transition pt-2 border-t border-slate-100"
          >
            <span>View Hosted Matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};