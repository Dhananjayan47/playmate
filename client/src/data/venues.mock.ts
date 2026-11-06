import type { Venue } from '../types';

export const INITIAL_VENUES: Venue[] = [
  {
    id: 'venue-1',
    name: 'Smash Point Badminton Arena',
    sport: 'Badminton',
    pricePerHour: 450,
    distanceKm: 1.2,
    rating: 4.8,
    reviewCount: 124,
    address: 'Gandhi Road, Tambaram West, Chennai',
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80',
     
      'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?w=800&auto=format&fit=crop&q=80',
    ],
    amenities: ['Synthetic Courts', 'Floodlights', 'Locker Room', 'Parking', 'Mineral Water'],
    availableSlots: {
      '2026-10-14': [
        { id: 'v1-s1', time: '05:00 AM - 06:00 AM', courtNumber: 'Court 1', isBooked: true },
        { id: 'v1-s2', time: '06:00 AM - 07:00 AM', courtNumber: 'Court 1', isBooked: false },
        { id: 'v1-s3', time: '05:00 PM - 06:00 PM', courtNumber: 'Court 2', isBooked: false },
        { id: 'v1-s4', time: '06:00 PM - 07:00 PM', courtNumber: 'Court 2', isBooked: true },
        { id: 'v1-s5', time: '07:00 PM - 08:00 PM', courtNumber: 'Court 1', isBooked: false },
      ],
      '2026-10-15': [
        { id: 'v1-s6', time: '06:00 AM - 07:00 AM', courtNumber: 'Court 1', isBooked: false },
        { id: 'v1-s7', time: '06:00 PM - 07:00 PM', courtNumber: 'Court 2', isBooked: false },
      ],
    },
  },
  {
    id: 'venue-2',
    name: 'KickOff 5v5 Turf Arena',
    sport: 'Football',
    pricePerHour: 1100,
    distanceKm: 2.4,
    rating: 4.7,
    reviewCount: 98,
    address: 'Velachery Main Road, Selaiyur, Chennai',
    images: [
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&auto=format&fit=crop&q=80',
    ],
    amenities: ['FIFA Grade Turf', 'High-Beam Floodlights', 'Bibs Provided', 'Dressing Room'],
    availableSlots: {
      '2026-10-14': [
        { id: 'v2-s1', time: '06:00 PM - 07:00 PM', courtNumber: 'Pitch A', isBooked: true },
        { id: 'v2-s2', time: '07:00 PM - 08:00 PM', courtNumber: 'Pitch A', isBooked: false },
        { id: 'v2-s3', time: '08:00 PM - 09:00 PM', courtNumber: 'Pitch B', isBooked: false },
        { id: 'v2-s4', time: '09:00 PM - 10:00 PM', courtNumber: 'Pitch B', isBooked: true },
      ],
      '2026-10-15': [
        { id: 'v2-s5', time: '07:00 PM - 08:00 PM', courtNumber: 'Pitch A', isBooked: false },
        { id: 'v2-s6', time: '08:00 PM - 09:00 PM', courtNumber: 'Pitch A', isBooked: false },
      ],
    },
  },
  {
    id: 'venue-3',
    name: 'Strike Zone Cricket Nets & Turf',
    sport: 'Cricket',
    pricePerHour: 800,
    distanceKm: 3.1,
    rating: 4.5,
    reviewCount: 64,
    address: 'Mudichur Road, Tambaram, Chennai',
    images: [
      'https://images.unsplash.com/photo-1779488389208-fd2dd9550919?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
      'https://images.unsplash.com/photo-1531415074868-036b1c57e329?w=800&auto=format&fit=crop&q=80',
      
    ],
    amenities: ['Bowling Machine', 'Box Cricket Turf', 'Night Lights', 'Equipment on Rent'],
    availableSlots: {
      '2026-10-14': [
        { id: 'v3-s1', time: '06:00 AM - 07:00 AM', courtNumber: 'Net 1', isBooked: false },
        { id: 'v3-s2', time: '07:00 AM - 08:00 AM', courtNumber: 'Net 1', isBooked: true },
        { id: 'v3-s3', time: '05:00 PM - 06:00 PM', courtNumber: 'Box Turf', isBooked: false },
        { id: 'v3-s4', time: '06:00 PM - 07:00 PM', courtNumber: 'Box Turf', isBooked: false },
      ],
      '2026-10-15': [
        { id: 'v3-s5', time: '05:00 PM - 06:00 PM', courtNumber: 'Box Turf', isBooked: true },
      ],
    },
  },
  {
    id: 'venue-4',
    name: 'Baseline Tennis Academy',
    sport: 'Tennis',
    pricePerHour: 650,
    distanceKm: 4.0,
    rating: 4.9,
    reviewCount: 140,
    address: 'GST Road, Chromepet, Chennai',
    images: [
      'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&auto=format&fit=crop&q=80',
    ],
    amenities: ['Clay Courts', 'Ball Boy Support', 'Floodlights', 'Pro Shop', 'Locker Room'],
    availableSlots: {
      '2026-10-14': [
        { id: 'v4-s1', time: '06:00 AM - 07:00 AM', courtNumber: 'Clay Court 1', isBooked: true },
        { id: 'v4-s2', time: '07:00 AM - 08:00 AM', courtNumber: 'Clay Court 1', isBooked: false },
        { id: 'v4-s3', time: '04:00 PM - 05:00 PM', courtNumber: 'Clay Court 2', isBooked: false },
      ],
      '2026-10-15': [
        { id: 'v4-s4', time: '04:00 PM - 05:00 PM', courtNumber: 'Clay Court 2', isBooked: false },
        { id: 'v4-s5', time: '05:00 PM - 06:00 PM', courtNumber: 'Clay Court 1', isBooked: true },
      ],
    },
  },
  {
    id: 'venue-5',
    name: 'HoopNation Basketball Club',
    sport: 'Basketball',
    pricePerHour: 500,
    distanceKm: 5.5,
    rating: 4.6,
    reviewCount: 42,
    address: 'Camp Road Junction, East Tambaram, Chennai',
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80',
    ],
    amenities: ['Hardwood Court', 'Fiberglass Backboards', 'Electronic Scoreboard', 'Spectator Seating'],
    availableSlots: {
      '2026-10-14': [
        { id: 'v5-s1', time: '06:00 AM - 07:00 AM', courtNumber: 'Full Court', isBooked: false },
        { id: 'v5-s2', time: '05:00 PM - 06:00 PM', courtNumber: 'Half Court A', isBooked: true },
        { id: 'v5-s3', time: '06:00 PM - 07:00 PM', courtNumber: 'Full Court', isBooked: false },
      ],
      '2026-10-15': [
        { id: 'v5-s4', time: '06:00 PM - 07:00 PM', courtNumber: 'Full Court', isBooked: false },
      ],
    },
  },
  {
    id: 'venue-6',
    name: 'Ace Padel & Pickler Hub',
    sport: 'Paddle',
    pricePerHour: 750,
    distanceKm: 6.2,
    rating: 4.4,
    reviewCount: 31,
    address: 'Perungalathur Bypass Road, Chennai',
    images: [
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=80',
    ],
    amenities: ['Panoramic Glass Courts', 'Racket Rental', 'Cafe', 'Covered Roof'],
    availableSlots: {
      '2026-10-14': [
        { id: 'v6-s1', time: '07:00 AM - 08:00 AM', courtNumber: 'Padel 1', isBooked: false },
        { id: 'v6-s2', time: '05:00 PM - 06:00 PM', courtNumber: 'Padel 2', isBooked: false },
        { id: 'v6-s3', time: '07:00 PM - 08:00 PM', courtNumber: 'Padel 1', isBooked: true },
      ],
      '2026-10-15': [
        { id: 'v6-s4', time: '06:00 PM - 07:00 PM', courtNumber: 'Padel 1', isBooked: false },
      ],
    },
  },
];