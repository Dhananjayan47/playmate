import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import type { GameMatch, HostGameFormData, JoinRequest } from '../types';
import { INITIAL_GAMES, CURRENT_USER_ID } from '../data/games.mock';

interface MatchContextType {
  games: GameMatch[];
  requestToJoin: (gameId: string) => void;
  hostNewGame: (formData: HostGameFormData) => void;
  acceptJoinRequest: (gameId: string, requestId: string) => void;
  declineJoinRequest: (gameId: string, requestId: string) => void;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<GameMatch[]>(() => {
    const saved = localStorage.getItem('pm_games');
    return saved ? JSON.parse(saved) : INITIAL_GAMES;
  });

  useEffect(() => {
    localStorage.setItem('pm_games', JSON.stringify(games));
  }, [games]);

  // FIX: Toggles isRequested AND appends current user to pendingRequests
  const requestToJoin = (gameId: string) => {
    // Current user's request payload
    const myRequest: JoinRequest = {
      id: `req-${Date.now()}`,
      userId: CURRENT_USER_ID,
      userName: 'Minato',
      userLevel: 'Intermediate',
      status: 'pending',
      requestedAt: 'Just now',
    };

    setGames((prevGames) =>
      prevGames.map((game) => {
        if (game.id !== gameId) return game;

        // Check if user already requested to prevent duplicates
        const existingList = game.pendingRequests || [];
        const alreadyRequested = existingList.some((r) => r.userId === CURRENT_USER_ID);
        if (alreadyRequested) return game;

        return {
          ...game,
          isRequested: true,
          pendingRequests: [...existingList, myRequest], // Appends to pending list
        };
      })
    );

    toast.success('Request sent to match host!');
  };

  const hostNewGame = (formData: HostGameFormData) => {
    const newGame: GameMatch = {
        id: `game-${Date.now()}`,
        ...formData,
        hostId: CURRENT_USER_ID,
        hostName: 'Minato',
        isRequested: false,
        pendingRequests: [],
        isHost: formData.hostId === CURRENT_USER_ID, // Mark as host
    };

    setGames((prev) => [newGame, ...prev]);
    toast.success('Your game is now live on the match feed!');
  };

  const acceptJoinRequest = (gameId: string, requestId: string) => {
    setGames((prevGames) =>
      prevGames.map((game) => {
        if (game.id !== gameId) return game;

        // If game is full, do not accept more players
        if (game.spotsFilled >= game.spotsTotal) {
          toast.error('This game is already full!');
          return game;
        }

        const updatedRequests = (game.pendingRequests || []).map((req) =>
          req.id === requestId ? { ...req, status: 'accepted' as const } : req
        );

        return {
          ...game,
          spotsFilled: game.spotsFilled + 1,
          pendingRequests: updatedRequests,
        };
      })
    );

    toast.success('Player accepted into your match!');
  };

  const declineJoinRequest = (gameId: string, requestId: string) => {
    setGames((prevGames) =>
      prevGames.map((game) => {
        if (game.id !== gameId) return game;

        return {
          ...game,
          pendingRequests: (game.pendingRequests || []).filter((req) => req.id !== requestId),
        };
      })
    );

    toast('Request declined', { icon: '✖' });
  };

  return (
    <MatchContext.Provider
      value={{
        games,
        requestToJoin,
        hostNewGame,
        acceptJoinRequest,
        declineJoinRequest,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export const useMatchContext = () => {
  const ctx = useContext(MatchContext);
  if (!ctx) throw new Error('useMatchContext must be used within MatchProvider');
  return ctx;
};