import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, X, BatteryCharging, MapPin, Plus, Home, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { useUserAuth } from '../context/AuthContext';
import useLoggedinuser from '../hooks/useLoggedinuser';
import Button from '../ui/Button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut } = useUserAuth();
  const [loggedInUser] = useLoggedinuser();

  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Stations', path: '/stations', icon: <BatteryCharging size={20} /> },
    { name: 'Map', path: '/map', icon: <MapPin size={20} /> },
    { name: 'Add Station', path: '/stations/add', icon: <Plus size={20} /> },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setIsProfileMenuOpen(false);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fallback avatar URL
  const avatarUrl = loggedInUser?.avatar || null;

  // Get initials from the user's name
  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    return names
      .map((n) => n.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const Avatar = ({ src, alt, children, onClick, className = "" }) => (
    <div
      className={`w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center cursor-pointer ring-2 ring-white shadow-md hover:ring-green-200 transition-all duration-200 ${className}`}
      onClick={onClick}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="text-sm font-semibold text-white">
          {children}
        </span>
      )}
    </div>
  );

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center group">
                <BatteryCharging className="h-8 w-8 text-green-500 group-hover:text-green-600 transition-colors" />
                <span className="ml-2 text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">EV Charge</span>
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full transition-all duration-200 ${
                    isActive(item.path)
                      ? 'border-green-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Auth buttons or profile */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <Avatar
                  src={avatarUrl}
                  alt={loggedInUser?.name || 'User'}
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className={`transform transition-all duration-200 ${
                    isProfileMenuOpen ? 'scale-95 ring-green-300' : 'hover:scale-105'
                  }`}
                >
                  {!avatarUrl && getInitials(loggedInUser?.name || user.email.split('@')[0])}
                </Avatar>

                {/* Custom Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <Avatar
                          src={avatarUrl}
                          alt={loggedInUser?.name || 'User'}
                          className="w-8 h-8"
                        >
                          {!avatarUrl && getInitials(loggedInUser?.name || user.email.split('@')[0])}
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {loggedInUser?.name || user.email.split('@')[0]}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                        
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      >
                        <User size={16} className="mr-3 text-gray-400" />
                        View Profile
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                      >
                        <LogOut size={16} className="mr-3 text-gray-400" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" icon={<LogIn size={18} />}>
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" icon={<UserPlus size={18} />}>
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-colors"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  isActive(item.path)
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } pl-3 pr-4 py-2 border-l-4 text-base font-medium flex items-center transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}

            {/* Mobile auth buttons */}
            {!user && (
              <div className="mt-4 space-y-2 px-4">
                <Link to="/login" className="w-full">
                  <Button variant="outline" fullWidth icon={<LogIn size={18} />}>
                    Sign in
                  </Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button variant="primary" fullWidth icon={<UserPlus size={18} />}>
                    Sign up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile profile menu */}
            {user && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex items-center px-4 pb-3">
                  <Avatar
                    src={avatarUrl}
                    alt={loggedInUser?.name || 'User'}
                  >
                    {!avatarUrl && getInitials(loggedInUser?.name || user.email.split('@')[0])}
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-900">
                      {loggedInUser?.name || user.email.split('@')[0]}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => {
              
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User size={18} className="mr-3" />
                  View Profile
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <LogOut size={18} className="mr-3" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;