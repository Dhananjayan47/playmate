import React from 'react';
import { Calendar, Clock, Users, Check, ShieldCheck } from 'lucide-react';
import type { GameMatch } from '../../../types';
import { CURRENT_USER_ID } from '../../../data/games.mock';

interface MatchCardProps {
  game: GameMatch;
  onJoin: (id: string) => void;
  onAccept: (gameId: string, reqId: string) => void;
  onDecline: (gameId: string, reqId: string) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  game,
  onJoin,
  onAccept,
  onDecline,
}) => {
  const isHost = game.hostId === CURRENT_USER_ID;
  const spotsLeft = Math.max(0, game.spotsTotal - game.spotsFilled);
  const isFull = spotsLeft === 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        {/* Card Header: Sport Tag, Level & Host Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-slate-900 text-white px-2.5 py-1 rounded-md">
              {game.sport}
            </span>
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              {game.skillLevel}
            </span>
          </div>

          {isHost ? (
            <span className="flex items-center gap-1 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Hosted by You
            </span>
          ) : (
            <span className="text-xs text-slate-500">
              Host: <span className="font-semibold text-slate-700">{game.hostName}</span>
            </span>
          )}
        </div>

        {/* Venue & Schedule */}
        <h3 className="font-bold text-slate-900 text-lg leading-tight mb-2">
          {game.venueName}
        </h3>

        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {game.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {game.time}
          </span>
          {game.pricePerPlayer ? (
            <span className="font-semibold text-slate-700">
              ₹{game.pricePerPlayer} / player
            </span>
          ) : null}
        </div>

        {/* Spot Indicator Visualizer */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-4">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              {isFull ? (
                <span className="text-red-600">Game Full</span>
              ) : (
                <span>
                  {spotsLeft} spot{spotsLeft > 1 ? 's' : ''} needed
                </span>
              )}
            </span>
            <span className="text-slate-500">
              {game.spotsFilled} / {game.spotsTotal} filled
            </span>
          </div>

          {/* Visual Progress Dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: game.spotsTotal }).map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index < game.spotsFilled ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Host Section: Incoming Join Requests */}
        {isHost && game.pendingRequests && game.pendingRequests.length > 0 && (
          <div className="mb-4 pt-3 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-700 mb-2">
              Join Requests ({game.pendingRequests.filter((r) => r.status === 'pending').length})
            </p>
            <div className="space-y-2">
              {game.pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-800">{req.userName}</span>
                    <span className="text-slate-400 ml-1.5 font-medium">({req.userLevel})</span>
                  </div>

                  {req.status === 'pending' ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onAccept(game.id, req.id)}
                        disabled={isFull}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded font-medium transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => onDecline(game.id, req.id)}
                        className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded transition"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Accepted
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action CTA: Join vs Request Sent vs Host Controls */}
      <div className="pt-2">
        {isHost ? (
          <div className="w-full py-2.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-center text-xs font-medium">
            You are managing this game
          </div>
        ) : game.isRequested ? (
          <button
            disabled
            className="w-full py-2.5 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 cursor-not-allowed"
          >
            <Check className="w-4 h-4 text-emerald-600" />
            Request Sent
          </button>
        ) : isFull ? (
          <button
            disabled
            className="w-full py-2.5 bg-slate-100 text-slate-400 rounded-xl text-sm font-semibold cursor-not-allowed"
          >
            Match Full
          </button>
        ) : (
          <button
            onClick={() => onJoin(game.id)}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-xl text-sm font-semibold transition shadow-sm"
          >
            Join Game
          </button>
        )}
      </div>
    </div>
  );
};