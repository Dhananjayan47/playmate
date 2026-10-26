import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { HomePage } from '../features/home/HomePage';
import { VenueDetailsPage } from '../features/venues/VenueDetailsPage';
import { FindPlayersPage } from '../features/matches/FindPlayerPage';
import { MyBookingsPage } from '../features/bookings/MyBookingsPage';
import { ProfilePage } from '../features/profile/ProfilePage';
import { RegisterPage } from '../features/auth/RegisterPage';
import { LoginPage } from '../features/auth/LoginPage';
import { OtpVerificationPage } from '../features/auth/OtpVerificationPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-otp" element={<OtpVerificationPage />} />
      <Route element={<AppLayout />}>
        {/* Screen 1: Home / Explore Grounds */}
        <Route path="/" element={<HomePage />} />

        {/* Screen 2: Venue Details + Booking */}
        <Route path="/venues/:id" element={<VenueDetailsPage />} />

        {/* Screen 3: Find Players */}
        <Route path="/matches" element={<FindPlayersPage />} />

        {/* Screen 5: My Bookings */}
        <Route path="/bookings" element={<MyBookingsPage />} />

        {/* Screen 4: Profile */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};