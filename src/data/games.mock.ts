import type { GameMatch } from '../types';
export const CURRENT_USER_ID = 'user-me';

export const INITIAL_GAMES: GameMatch[] = [
  {
    id: 'game-1',
    sport: 'Football',
    venueName: 'KickOff 5v5 Turf Arena',
    date: 'Today',
    time: '07:00 PM',
    hostId: 'user-101',
    hostName: 'Karthik Raja',
    isHost: false,
    spotsTotal: 10,
    spotsFilled: 8, // 2 spots needed
    skillLevel: 'Intermediate',
    pricePerPlayer: 110,
    isRequested: false, // Default active "Join" button state
  },
  {
    id: 'game-2',
    sport: 'Badminton',
    venueName: 'Smash Point Badminton Arena',
    date: 'Today',
    time: '08:00 PM',
    hostId: 'user-102',
    hostName: 'Sanjay Kumar',
    isHost: false,
    spotsTotal: 4,
    spotsFilled: 3, // 1 spot needed
    skillLevel: 'Beginner',
    pricePerPlayer: 150,
    isRequested: true, // Displays disabled "Request Sent ✓" state
  },
  {
    id: 'game-3',
    sport: 'Cricket',
    venueName: 'Strike Zone Cricket Nets',
    date: 'Tomorrow',
    time: '06:00 AM',
    hostId: 'user-103',
    hostName: 'Vignesh W.',
    isHost: false,
    spotsTotal: 12,
    spotsFilled: 9, // 3 spots needed
    skillLevel: 'All Levels',
    pricePerPlayer: 80,
    isRequested: false,
  },
  {
    id: 'game-4',
    sport: 'Tennis',
    venueName: 'Baseline Tennis Academy',
    date: 'Oct 15, 2026',
    time: '05:30 PM',
    hostId: 'user-self',
    hostName: 'Minato',
    isHost: true, // Hosted by current user
    spotsTotal: 4,
    spotsFilled: 2, // 2 spots needed
    skillLevel: 'Advanced',
    pricePerPlayer: 220,
    isRequested: false,
    pendingRequests: [
      {
        id: 'req-101',
        userId: 'user-204',
        userName: 'Praveen Balaji',
        userLevel: 'Advanced',
        status: 'pending',
        requestedAt: '15 mins ago',
      },
    ],
  },
];