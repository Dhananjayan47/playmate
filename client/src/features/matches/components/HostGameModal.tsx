import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, Award, DollarSign } from 'lucide-react';
import { useMatchContext } from '../../../context/MatchContext';
import type { HostGameFormData, SportType, SkillLevel } from '../../../types';

interface HostGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SPORTS_LIST: SportType[] = [
  'Badminton',
  'Football',
  'Cricket',
  'Tennis',
  'Basketball',
  'Paddle',
];

const SKILL_LEVELS: SkillLevel[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'All Levels',
];

export const HostGameModal: React.FC<HostGameModalProps> = ({ isOpen, onClose }) => {
  const { hostNewGame } = useMatchContext();

  const [formData, setFormData] = useState<HostGameFormData>({
    sport: 'Badminton',
    venueName: '',
    date: 'Today',
    time: '07:00 PM',
    spotsTotal: 4,
    spotsFilled: 1, // The host fills spot 1
    skillLevel: 'Intermediate',
    pricePerPlayer: 150,
    hostId: 'user-123', 
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.venueName.trim() || !formData.time.trim()) return;

    hostNewGame(formData);
    onClose();

    // Reset Form
    setFormData({
      sport: 'Badminton',
      venueName: '',
      date: 'Today',
      time: '07:00 PM',
      spotsTotal: 4,
      spotsFilled: 1,
      skillLevel: 'Intermediate',
      pricePerPlayer: 150,
      hostId: 'user-123',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Host a Match</h2>
            <p className="text-xs text-slate-500">Post an open game to find players nearby</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Sport Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Sport
            </label>
            <div className="grid grid-cols-3 gap-2">
              {SPORTS_LIST.map((sport) => (
                <button
                  type="button"
                  key={sport}
                  onClick={() => setFormData({ ...formData, sport })}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition ${
                    formData.sport === sport
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* Venue Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Venue / Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Smash Point Arena, Court 2"
                value={formData.venueName}
                onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Today / Oct 16"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Time
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 07:00 PM"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Spots Total & Skill Level */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Total Players Needed
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="2"
                  max="22"
                  required
                  value={formData.spotsTotal}
                  onChange={(e) =>
                    setFormData({ ...formData, spotsTotal: Number(e.target.value) })
                  }
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Skill Level
              </label>
              <div className="relative">
                <Award className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={formData.skillLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, skillLevel: e.target.value as SkillLevel })
                  }
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition bg-white"
                >
                  {SKILL_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Approx Cost Per Player */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Estimated Share / Player (₹)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                min="0"
                step="10"
                value={formData.pricePerPlayer}
                onChange={(e) =>
                  setFormData({ ...formData, pricePerPlayer: Number(e.target.value) })
                }
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-sm font-semibold transition"
            >
              Post Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};