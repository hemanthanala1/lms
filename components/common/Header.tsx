import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const roleDashboardPath = () => {
    if (!user) return '/dashboard';
    switch (user.role) {
      case 'Student': return '/dashboard/student';
      case 'Instructor': return '/dashboard/instructor';
      case 'Admin': return '/dashboard/admin';
      case 'Content Creator': return '/dashboard/creator';
      default: return '/dashboard';
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary">
              LMS Pro
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/courses" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Courses</Link>
              {isAuthenticated && (
                <Link to={roleDashboardPath()} className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            {isAuthenticated && user ? (
              <div className="ml-4 flex items-center md:ml-6 relative">
                <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-9 w-9 rounded-full" src={user.avatarUrl || `https://i.pravatar.cc/150?u=${user.id}`} alt="" />
                </button>
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{user.role}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm transition-colors duration-300">
                Sign In
              </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-500 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/courses" className="text-gray-500 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Courses</Link>
            {isAuthenticated && (
              <Link to={roleDashboardPath()} className="text-gray-500 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
            )}
            {!isAuthenticated && (
                <Link to="/login" className="bg-primary text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark">Sign In</Link>
            )}
            {isAuthenticated && user && (
                <div className="pt-4 pb-3 border-t border-gray-200">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="" />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-gray-800">{user.name}</div>
                            <div className="text-sm font-medium leading-none text-gray-500">{user.email}</div>
                        </div>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                        <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-primary hover:bg-gray-100">Sign out</button>
                    </div>
                </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
