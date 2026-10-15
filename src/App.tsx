import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { BookingProvider } from './context/BookingContext';
import { MatchProvider } from './context/MatchContext';
import { AppRouter } from './routes/AppRouter';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* react-hot-toast Notification Mount Point */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0F172A',
            color: '#F8FAFC',
            fontSize: '14px',
            borderRadius: '8px',
            padding: '12px 16px',
            border: '1px solid #1E293B',
          },
          success: {
            iconTheme: {
              primary: '#16A34A',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
          },
        }}
      />

      {/* Global State Providers */}
      <BookingProvider>
        <MatchProvider>
          <AppRouter />
        </MatchProvider>
      </BookingProvider>
    </BrowserRouter>
  );
};

export default App;