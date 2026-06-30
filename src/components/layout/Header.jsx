import React, { useState } from 'react';
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
  FaGavel
} from 'react-icons/fa';
import { GiScales } from 'react-icons/gi';

const Header = ({ onAddClick, stats, cases, onNavigate, activePage }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', icon: FaHome, label: 'Dashboard' },
    { id: 'cases', icon: FaGavel, label: 'Cases', count: stats?.total || 0 },
    { id: 'clients', icon: FaUsers, label: 'Clients' },
    { id: 'calendar', icon: FaCalendarAlt, label: 'Calendar' },
    { id: 'reports', icon: FaChartBar, label: 'Reports' },
  ];

  const notifications = [
    { id: 1, title: 'New case assigned to you', time: '5 min ago', read: false, icon: '📋' },
    { id: 2, title: 'Case #1234 status updated', time: '1 hour ago', read: false, icon: '🔄' },
    { id: 3, title: 'Hearing scheduled for tomorrow', time: '3 hours ago', read: true, icon: '⚖️' },
  ];

  const handleNavClick = (itemId) => {
    if (onNavigate) {
      onNavigate(itemId);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a2e] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
              <GiScales className="text-white text-xl" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white tracking-tight">JurisFlow</h1>
              <p className="text-[8px] text-blue-200 font-medium tracking-[0.2em] uppercase">Legal Case Management</p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 rounded-lg p-1">
            {navItems.map((item) => (
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
                {item.count && (
                  <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                    activePage === item.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-white/10 text-blue-200'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative"
            >
              <FaSearch className="text-sm" />
            </button>

            {isSearchOpen && (
              <div className="absolute top-16 right-4 left-4 sm:left-auto sm:right-20 sm:w-80 bg-[#0a0a2e] border border-white/10 rounded-xl p-2 shadow-2xl">
                <input
                  type="text"
                  placeholder="Search cases..."
                  className="w-full px-4 py-2 bg-white/5 text-white placeholder:text-gray-400 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none transition-all"
                  autoFocus
                />
              </div>
            )}
            
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
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
                      <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Mark all read</button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
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
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-white/10 text-center">
                    <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View all</button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-lg shadow-blue-500/25">
                  JD
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-medium text-white">John Doe</p>
                  <p className="text-[10px] text-blue-200">Senior Attorney</p>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#0a0a2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        JD
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">John Doe</p>
                        <p className="text-xs text-gray-400">john.doe@jurisflow.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors">
                      <FaUserCircle className="text-gray-400" />
                      Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors">
                      <FaCog className="text-gray-400" />
                      Settings
                    </button>
                  </div>
                  <div className="border-t border-white/10 py-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                      <FaSignOutAlt />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onAddClick}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
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