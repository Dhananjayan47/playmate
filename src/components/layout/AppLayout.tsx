import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Compass, Users, CalendarCheck, User } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center flex-1 py-2 text-xs font-medium transition-colors ${
      isActive ? 'text-emerald-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
    }`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col pb-16 md:pb-0">
      {/* Desktop Header */}
      <header className="sticky top-0 z-40 bg-green-100 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <NavLink to="/" className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
              <span onClick={()=>{localStorage.clear()}} className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm font-black">
                P
              </span>
              PlayMate
            </NavLink>

            <nav className="hidden md:flex items-center gap-6">
              {/* ADD 'end' HERE */}
              <NavLink to="/" end className={navLinkClass}>
                Explore Grounds
              </NavLink>
              <NavLink to="/matches" className={navLinkClass}>
                Find Players
              </NavLink>
              <NavLink to="/bookings" className={navLinkClass}>
                My Bookings
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <NavLink
              to="/profile"
              className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs border border-emerald-300">
                M
              </div>
              <span className="hidden sm:inline">Minato</span>
            </NavLink>
          </div>
        </div>
      </header>

      {/* Routed Page Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Dock */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex md:hidden h-16 shadow-lg px-2">
        {/* ADD 'end' HERE */}
        <NavLink to="/" end className={mobileNavLinkClass}>
          <Compass className="w-5 h-5 mb-1" />
          <span>Explore</span>
        </NavLink>
        <NavLink to="/matches" className={mobileNavLinkClass}>
          <Users className="w-5 h-5 mb-1" />
          <span>Players</span>
        </NavLink>
        <NavLink to="/bookings" className={mobileNavLinkClass}>
          <CalendarCheck className="w-5 h-5 mb-1" />
          <span>Bookings</span>
        </NavLink>
        <NavLink to="/profile" className={mobileNavLinkClass}>
          <User className="w-5 h-5 mb-1" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};