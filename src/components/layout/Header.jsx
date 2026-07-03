import React, { useState, useRef, useEffect } from 'react';
import { 
  FaUserCircle, 
  FaCog, 
  FaSignOutAlt, 
  FaSearch, 
  FaBell, 
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaChartBar,
  FaFileAlt,
  FaPlusCircle,
  FaGavel,
  FaBars,
  FaTimes,
  FaCheckDouble,
  FaBook,
  FaChevronDown,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { GiScales } from 'react-icons/gi';

const Header = ({ 
  onAddClick, 
  stats, 
  cases, 
  onNavigate, 
  activePage, 
  onMenuClick,
  user = null,
  onLogout = () => {},
  solvedCases = [],
  referenceCases = []
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCasesDropdownOpen, setIsCasesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const casesDropdownRef = useRef(null);

  const displayUser = user || {
    name: 'John Doe',
    email: 'john.doe@jurisflow.com',
    role: 'Senior Attorney'
  };

  // Navigation items with Cases dropdown
  const navItems = [
    { id: 'dashboard', icon: FaHome, label: 'Dashboard' },
    { 
      id: 'cases-dropdown', 
      icon: FaGavel, 
      label: 'Cases', 
      count: stats?.total || 0,
      isDropdown: true,
      dropdownItems: [
        { 
          id: 'cases', 
          label: 'All Cases', 
          icon: FaFileAlt, 
          count: stats?.total || 0,
          description: 'View all cases',
          color: 'text-blue-400'
        },
        { 
          id: 'solved-cases', 
          label: 'Solved Cases', 
          icon: FaCheckDouble, 
          count: solvedCases?.length || 0,
          description: 'Cases resolved by others',
          color: 'text-emerald-400'
        },
        { 
          id: 'reference-cases', 
          label: 'Reference Cases', 
          icon: FaBook, 
          count: referenceCases?.length || 0,
          description: 'Legal precedents',
          color: 'text-purple-400'
        },
      ]
    },
    { id: 'clients', icon: FaUsers, label: 'Clients' },
    { id: 'calendar', icon: FaCalendarAlt, label: 'Calendar' },
    { id: 'reports', icon: FaChartBar, label: 'Reports' },
  ];

  const notifications = [
    { id: 1, title: 'New case assigned to you', time: '5 min ago', read: false, icon: '📋' },
    { id: 2, title: 'Case #1234 status updated', time: '1 hour ago', read: false, icon: '🔄' },
    { id: 3, title: 'Hearing scheduled for tomorrow', time: '3 hours ago', read: true, icon: '⚖️' },
    { id: 4, title: 'New reference case added', time: '2 hours ago', read: false, icon: '📚' },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getUserInitials = () => {
    const name = displayUser.name || 'User';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getDisplayName = () => {
    return displayUser.name || displayUser.email || 'User';
  };

  const handleNavClick = (itemId) => {
    if (onNavigate) {
      onNavigate(itemId);
    }
    setIsCasesDropdownOpen(false);
    setIsProfileOpen(false);
  };

  const handleDropdownItemClick = (itemId) => {
    if (onNavigate) {
      onNavigate(itemId);
    }
    setIsCasesDropdownOpen(false);
  };

  const handleLogout = async () => {
    setIsProfileOpen(false);
    if (onLogout) {
      await onLogout();
    }
  };

  const toggleCasesDropdown = () => {
    setIsCasesDropdownOpen(!isCasesDropdownOpen);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (casesDropdownRef.current && !casesDropdownRef.current.contains(event.target)) {
        setIsCasesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      if (onNavigate) {
        onNavigate('search', { query: searchQuery });
      }
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const markAllRead = () => {
    console.log('Marking all notifications as read');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a2e] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Menu Toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button 
              onClick={onMenuClick}
              className="lg:hidden p-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              aria-label="Toggle menu"
            >
              <FaBars className="text-lg" />
            </button>

            <div className="flex items-center gap-3 group" onClick={() => handleNavClick('dashboard')}>
              <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <GiScales className="text-white text-xl" />
              </div>
              <div className="hidden sm:block cursor-pointer">
                <h1 className="text-xl font-bold text-white tracking-tight">JurisFlow</h1>
                <p className="text-[8px] text-blue-200 font-medium tracking-[0.2em] uppercase">Legal Case Management</p>
              </div>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 rounded-lg p-1">
            {navItems.map((item) => {
              // Render dropdown for Cases
              if (item.isDropdown) {
                return (
                  <div key={item.id} className="relative" ref={casesDropdownRef}>
                    <button
                      onClick={toggleCasesDropdown}
                      className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                        activePage === 'cases' || activePage === 'solved-cases' || activePage === 'reference-cases'
                          ? 'bg-white/20 text-white shadow-lg' 
                          : 'text-blue-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <item.icon className="text-sm" />
                      {item.label}
                      {item.count !== undefined && item.count > 0 && (
                        <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                          activePage === 'cases' || activePage === 'solved-cases' || activePage === 'reference-cases'
                            ? 'bg-white/20 text-white' 
                            : 'bg-white/10 text-blue-200'
                        }`}>
                          {item.count}
                        </span>
                      )}
                      <FaChevronDown className={`text-[10px] ml-0.5 transition-transform duration-200 ${isCasesDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Professional Dropdown Menu */}
                    {isCasesDropdownOpen && (
                      <div 
                        className="absolute left-0 mt-2 w-64 bg-[#0a0a2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                      >
                        {/* Dropdown Header */}
                        <div className="px-4 py-3 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <FaGavel className="text-blue-400 text-sm" />
                            <span className="text-xs font-semibold text-white uppercase tracking-wider">Cases</span>
                            <span className="ml-auto text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full">
                              {stats?.total || 0} Total
                            </span>
                          </div>
                        </div>

                        {/* Dropdown Items */}
                        <div className="py-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <button
                              key={dropdownItem.id}
                              onClick={() => handleDropdownItemClick(dropdownItem.id)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all duration-200 group ${
                                activePage === dropdownItem.id
                                  ? 'bg-white/10 text-white'
                                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
                              }`}
                            >
                              {/* Icon with colored background */}
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                activePage === dropdownItem.id
                                  ? 'bg-blue-500/20'
                                  : 'bg-white/5 group-hover:bg-white/10'
                              }`}>
                                <dropdownItem.icon className={`text-sm ${dropdownItem.color || 'text-gray-400'}`} />
                              </div>
                              
                              {/* Text */}
                              <div className="flex-1 text-left">
                                <div className="text-sm font-medium">{dropdownItem.label}</div>
                                <div className="text-[10px] text-gray-500">{dropdownItem.description || ''}</div>
                              </div>
                              
                              {/* Count Badge */}
                              {dropdownItem.count !== undefined && dropdownItem.count > 0 && (
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  activePage === dropdownItem.id
                                    ? 'bg-blue-500/20 text-blue-300'
                                    : 'bg-white/5 text-gray-400 group-hover:bg-white/10'
                                }`}>
                                  {dropdownItem.count}
                                </span>
                              )}
                              
                              {/* Active Indicator */}
                              {activePage === dropdownItem.id && (
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                              )}
                            </button>
                          ))}
                        </div>

                        {/* Dropdown Footer */}
                        <div className="px-4 py-2 border-t border-white/10">
                          <button
                            onClick={() => handleDropdownItemClick('cases')}
                            className="w-full flex items-center justify-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors py-1"
                          >
                            <FaExternalLinkAlt className="text-[10px]" />
                            View All Cases
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Render normal nav items
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    activePage === item.id 
                      ? 'bg-white/20 text-white shadow-lg' 
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="text-sm" />
                  {item.label}
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                      activePage === item.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-white/10 text-blue-200'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label="Search"
              >
                <FaSearch className="text-sm" />
              </button>

              {isSearchOpen && (
                <form 
                  onSubmit={handleSearch}
                  className="absolute right-0 mt-2 w-80 bg-[#0a0a2e] border border-white/10 rounded-xl p-2 shadow-2xl"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search cases, clients, documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white/5 text-white placeholder:text-gray-400 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none transition-all"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <FaSearch className="text-sm" />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Press Enter to search
                  </div>
                </form>
              )}
            </div>
            
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label="Notifications"
              >
                <FaBell className="text-sm" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0a0a2e] animate-pulse"></span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0a0a2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">Notifications</h3>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllRead}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`p-4 hover:bg-white/5 transition-colors cursor-pointer ${!notif.read ? 'border-l-2 border-blue-500' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-xl">{notif.icon}</span>
                            <div className="flex-1">
                              <p className={`text-sm ${!notif.read ? 'text-white' : 'text-gray-400'}`}>{notif.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <div className="text-4xl mb-2">🔔</div>
                        <p className="text-gray-400 text-sm">No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-white/10 text-center">
                    <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label="Profile"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-lg shadow-blue-500/25">
                  {getUserInitials()}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-medium text-white">{getDisplayName()}</p>
                  <p className="text-[10px] text-blue-200">{displayUser.role || 'User'}</p>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#0a0a2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {getUserInitials()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{getDisplayName()}</p>
                        <p className="text-xs text-gray-400">{displayUser.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    {/* ============================================
                        FIXED: Profile Button - Calls handleNavClick
                        ============================================ */}
                    <button 
                      onClick={() => handleNavClick('profile')}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                    >
                      <FaUserCircle className="text-gray-400" />
                      Profile
                    </button>
                    {/* ============================================
                        FIXED: Settings Button - Calls handleNavClick
                        ============================================ */}
                    <button 
                      onClick={() => handleNavClick('settings')}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                    >
                      <FaCog className="text-gray-400" />
                      Settings
                    </button>
                  </div>
                  <div className="border-t border-white/10 py-1">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <FaSignOutAlt />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Add Case Button */}
            <button
              onClick={onAddClick}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              aria-label="Add new case"
            >
              <FaPlusCircle className="text-xs" />
              <span className="hidden sm:inline">New Case</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;