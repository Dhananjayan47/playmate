// ==========================================
// 1. General & Utility Types
// ==========================================

export type SportType = 'Badminton' | 'Football' | 'Cricket' | 'Tennis' | 'Basketball' | 'Paddle';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

// ==========================================
// 2. Venue & Booking Types (Screens 1 & 2)
// ==========================================

export interface TimeSlot {
  id: string;
  time: string; // e.g., "06:00 PM - 07:00 PM"
  courtNumber: string; // e.g., "Court 1", "Turf A"
  isBooked: boolean;
}

export interface VenueReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Venue {
  id: string;
  name: string;
  sport: SportType;
  pricePerHour: number;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  address: string;
  images: string[];
  amenities: string[]; // e.g., ["Floodlights", "Parking", "Locker Room", "Water"]
  // Keyed by ISO date string (e.g., "2026-10-14")
  availableSlots: Record<string, TimeSlot[]>;
}

export interface VenueFilterState {
  searchQuery: string;
  selectedSport: SportType | 'All';
  maxDistance: number; // in km
  maxPrice: number;    // in currency units
  sortBy: 'distance' | 'priceAsc' | 'priceDesc' | 'rating';
}

// ==========================================
// 3. User Bookings (Screen 5)
// ==========================================

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Booking {
  id: string;               // e.g., "BK-8821"
  venueId: string;
  venueName: string;
  venueImage: string;
  sport: SportType;
  slotTime: string;
  bookingDate: string;      // e.g., "2026-10-15"
  courtNumber: string;
  totalPaid: number;
  splitCount?: number;      // For split bill feature
  status: BookingStatus;
  createdAt: string;
}

// ==========================================
// 4. Find Players & Matchmaking (Screen 3)
// ==========================================

export type RequestStatus = 'pending' | 'accepted' | 'declined';

export interface JoinRequest {
  id: string;
  userId: string;
  userName: string;
  userLevel: SkillLevel;
  avatarUrl?: string;
  status: RequestStatus;
  requestedAt: string;
}

export interface GameMatch {
  id: string;
  sport: SportType;
  venueName: string;
  date: string;              // e.g., "Today", "Tomorrow", "2026-10-16"
  time: string;              // e.g., "07:30 PM"
  hostId: string;
  hostName: string;
  isHost: boolean;           // true if created by the active user
  spotsTotal: number;
  spotsFilled: number;
  skillLevel: SkillLevel;
  pricePerPlayer?: number;
  isRequested?: boolean;     // UI state: true when active user hits "Join"
  pendingRequests?: JoinRequest[]; // Incoming requests if user is host
}

export interface HostGameFormData {
  sport: SportType;
  venueName: string;
  date: string;
  time: string;
  spotsTotal: number;
  spotsFilled: number;
  skillLevel: SkillLevel;
  pricePerPlayer: number;
  hostId: string; // true if created by the active user
}

// ==========================================
// 5. User Profile & Stats (Screen 4)
// ==========================================

export interface UserStats {
  gamesPlayed: number;
  hoursOnCourt: number;
  reliabilityScore: number; // e.g., 98 (%)
  favoriteVenues: {
    venueName: string;
    bookingsCount: number;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  location: string;
  avatarUrl: string;
  sportsPlayed: SportType[];
  stats: UserStats;
}