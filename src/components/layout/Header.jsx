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
  FaCheckDouble,
  FaBook,
  FaChevronDown,
  FaChevronRight,
  FaExternalLinkAlt,
  FaTag,
  FaList,
  FaFolderOpen,
  FaFileInvoice
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
  const [showTypesSubMenu, setShowTypesSubMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const casesDropdownRef = useRef(null);
  const allCasesRef = useRef(null);
  const subMenuRef = useRef(null);
  let closeTimeout = null;

  const displayUser = user || {
    name: 'John Doe',
    email: 'john.doe@jurisflow.com',
    role: 'Senior Attorney'
  };

  // ============================================
  // GET UNIQUE CASE TYPES FROM CASES
  // ============================================
  const getCaseTypes = () => {
    if (!cases || cases.length === 0) return [];
    
    const typeCounts = {};
    cases.forEach(c => {
      const type = c.caseType || c.type || 'General';
      const normalizedType = type.toLowerCase();
      if (typeCounts[normalizedType]) {
        typeCounts[normalizedType].count++;
      } else {
        typeCounts[normalizedType] = {
          type: type,
          count: 1,
          icon: getTypeIcon(type),
          color: getTypeColor(type)
        };
      }
    });
    
    return Object.values(typeCounts).sort((a, b) => a.type.localeCompare(b.type));
  };

  const getTypeIcon = (type) => {
    const icons = {
      'civil': FaGavel,
      'criminal': FaGavel,
      'labour': FaUsers,
      'service': FaFileAlt,
      'tax': FaFileInvoice,
      'family': FaUsers,
      'general': FaFolderOpen
    };
    return icons[type?.toLowerCase()] || FaGavel;
  };

  const getTypeColor = (type) => {
    const colors = {
      'civil': 'text-[#0F4C75]',
      'criminal': 'text-[#EF4444]',
      'labour': 'text-[#F59E0B]',
      'service': 'text-[#8B5CF6]',
      'tax': 'text-[#22C55E]',
      'family': 'text-[#EC4899]',
      'general': 'text-[#6B7280]'
    };
    return colors[type?.toLowerCase()] || colors.general;
  };

  const caseTypes = getCaseTypes();

  // Navigation items
  const navItems = [
    { id: 'dashboard', icon: FaHome, label: 'Dashboard' },
    { 
      id: 'cases-dropdown', 
      icon: FaGavel, 
      label: 'Cases', 
      count: stats?.total || 0,
      isDropdown: true
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
    if (itemId === 'profile') {
      setIsProfileOpen(false);
      window.location.href = '/profile';
      return;
    }
    
    if (itemId === 'settings') {
      setIsProfileOpen(false);
      window.location.href = '/settings';
      return;
    }
    
    if (onNavigate) {
      onNavigate(itemId);
    }
    setIsCasesDropdownOpen(false);
    setIsProfileOpen(false);
    setShowTypesSubMenu(false);
    clearTimeout(closeTimeout);
  };

  const handleDropdownItemClick = (itemId) => {
    if (onNavigate) {
      onNavigate(itemId);
    }
    setIsCasesDropdownOpen(false);
    setShowTypesSubMenu(false);
    clearTimeout(closeTimeout);
  };

  const handleLogout = async () => {
    setIsProfileOpen(false);
    if (onLogout) {
      await onLogout();
    }
  };

  // ============================================
  // DROPDOWN TOGGLE
  // ============================================
  const toggleDropdown = () => {
    setIsCasesDropdownOpen(!isCasesDropdownOpen);
    if (!isCasesDropdownOpen) {
      setShowTypesSubMenu(false);
    }
    clearTimeout(closeTimeout);
  };

  // ============================================
  // SUB-MENU HANDLERS - FIXED
  // ============================================
  const handleAllCasesEnter = () => {
    clearTimeout(closeTimeout);
    setShowTypesSubMenu(true);
  };

  const handleAllCasesLeave = () => {
    closeTimeout = setTimeout(() => {
      setShowTypesSubMenu(false);
    }, 300);
  };

  const handleSubMenuEnter = () => {
    clearTimeout(closeTimeout);
    setShowTypesSubMenu(true);
  };

  const handleSubMenuLeave = () => {
    closeTimeout = setTimeout(() => {
      setShowTypesSubMenu(false);
    }, 300);
  };

  // ============================================
  // CLOSE DROPDOWN ON ESCAPE
  // ============================================
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsCasesDropdownOpen(false);
        setShowTypesSubMenu(false);
        setIsProfileOpen(false);
        setIsNotificationsOpen(false);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

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
        setShowTypesSubMenu(false);
        clearTimeout(closeTimeout);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(closeTimeout);
    };
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
    <>
      {/* Premium Top Accent Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-[#1B262C] via-[#0F4C75] to-[#3282B8]"></div>

      <header className="sticky top-0 z-50 bg-[#1B262C] border-b border-[#3282B8]/20 shadow-xl shadow-[#1B262C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button 
                onClick={onMenuClick}
                className="lg:hidden p-2 text-[#BBE1FA]/60 hover:text-[#3282B8] hover:bg-[#3282B8]/10 rounded-xl transition-all duration-200"
                aria-label="Toggle menu"
              >
                <FaBars className="text-lg" />
              </button>

              <div className="flex items-center gap-3 group" onClick={() => handleNavClick('dashboard')}>
                <div className="gradient-accent p-2 rounded-xl group-hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-[#0F4C75]/25">
                  <GiScales className="text-white text-xl" />
                </div>
                <div className="hidden sm:block cursor-pointer">
                  <h1 className="text-xl font-bold text-white tracking-tight">
                    Juris<span className="text-[#3282B8]">Flow</span>
                  </h1>
                  <p className="text-[8px] text-[#BBE1FA]/60 font-medium tracking-[0.2em] uppercase">Legal Case Management</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#3282B8]/10 rounded-xl p-1 border border-[#3282B8]/20">
              {navItems.map((item) => {
                if (item.isDropdown) {
                  return (
                    <div 
                      key={item.id} 
                      className="relative" 
                      ref={casesDropdownRef}
                    >
                      <button
                        onClick={toggleDropdown}
                        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                          activePage === 'cases' || activePage === 'solved-cases' || activePage === 'reference-cases' || activePage?.startsWith('type-')
                            ? 'gradient-accent text-white shadow-lg shadow-[#0F4C75]/30' 
                            : 'text-[#BBE1FA]/60 hover:text-white hover:bg-[#3282B8]/20'
                        }`}
                      >
                        <item.icon className="text-sm" />
                        {item.label}
                        {item.count !== undefined && item.count > 0 && (
                          <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                            activePage === 'cases' || activePage === 'solved-cases' || activePage === 'reference-cases' || activePage?.startsWith('type-')
                              ? 'bg-white/20 text-white' 
                              : 'bg-[#3282B8]/30 text-[#BBE1FA]'
                          }`}>
                            {item.count}
                          </span>
                        )}
                        <FaChevronDown className={`text-[10px] ml-0.5 transition-transform duration-200 ${isCasesDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isCasesDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-64 bg-[#1B262C] border border-[#3282B8]/30 rounded-xl shadow-2xl shadow-[#0F4C75]/20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                          
                          {/* Header */}
                          <div className="px-4 py-3 border-b border-[#3282B8]/20 bg-[#1B262C]/80">
                            <div className="flex items-center gap-2">
                              <FaGavel className="text-[#3282B8] text-sm" />
                              <span className="text-xs font-semibold text-white uppercase tracking-wider">Cases</span>
                              <span className="ml-auto text-[10px] px-2 py-0.5 gradient-accent text-white rounded-full font-medium">
                                {stats?.total || 0} Total
                              </span>
                            </div>
                          </div>

                          {/* ===== DROPDOWN ITEMS ===== */}
                          <div className="py-1 bg-[#1B262C]">
                            
                            {/* ===== ALL CASES - WITH SUB-MENU ===== */}
                            <div 
                              className="relative"
                              onMouseEnter={handleAllCasesEnter}
                              onMouseLeave={handleAllCasesLeave}
                            >
                              <button
                                onClick={() => handleDropdownItemClick('cases')}
                                className={`w-full flex items-center justify-between px-4 py-2.5 transition-all duration-200 group ${
                                  activePage === 'cases'
                                    ? 'bg-[#3282B8]/20 text-white'
                                    : 'text-[#BBE1FA]/70 hover:bg-[#3282B8]/10 hover:text-white'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                    activePage === 'cases'
                                      ? 'gradient-accent text-white shadow-lg shadow-[#0F4C75]/25'
                                      : 'bg-[#3282B8]/10 group-hover:bg-[#3282B8]/20'
                                  }`}>
                                    <FaList className="text-sm text-white" />
                                  </div>
                                  <div className="text-left">
                                    <div className="text-sm font-medium text-white">All Cases</div>
                                    <div className="text-[10px] text-[#BBE1FA]/50">View all cases</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs px-2 py-0.5 bg-[#3282B8]/20 text-[#3282B8] rounded-full font-medium">
                                    {stats?.total || 0}
                                  </span>
                                  {caseTypes.length > 0 && (
                                    <FaChevronRight className="text-[#3282B8] text-xs animate-pulse" />
                                  )}
                                </div>
                              </button>

                              {/* ===== SUB-MENU: CASE TYPES ===== */}
                              {showTypesSubMenu && caseTypes.length > 0 && (
                                <div 
                                  className="absolute left-full top-0 ml-1 w-56 bg-[#1B262C] border border-[#3282B8]/30 rounded-xl shadow-2xl shadow-[#0F4C75]/20 overflow-hidden animate-in fade-in slide-in-from-left-2 duration-150 z-[999]"
                                  onMouseEnter={handleSubMenuEnter}
                                  onMouseLeave={handleSubMenuLeave}
                                  ref={subMenuRef}
                                >
                                  <div className="px-4 py-2 border-b border-[#3282B8]/20 bg-[#1B262C]/80">
                                    <div className="flex items-center gap-2">
                                      <FaTag className="text-[#3282B8] text-[10px]" />
                                      <span className="text-[10px] font-semibold text-white uppercase tracking-wider">Case Types</span>
                                    </div>
                                  </div>
                                  <div className="py-1 max-h-[300px] overflow-y-auto">
                                    {caseTypes.map((type) => {
                                      const isActive = activePage === `type-${type.type.toLowerCase()}`;
                                      const Icon = type.icon;
                                      const colorText = getTypeColor(type.type);
                                      
                                      return (
                                        <button
                                          key={type.type}
                                          onClick={() => handleDropdownItemClick(`type-${type.type.toLowerCase()}`)}
                                          className={`w-full flex items-center gap-3 px-4 py-2 transition-all duration-200 group ${
                                            isActive
                                              ? 'bg-[#3282B8]/20 text-white'
                                              : 'text-[#BBE1FA]/70 hover:bg-[#3282B8]/10 hover:text-white'
                                          }`}
                                        >
                                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                            isActive
                                              ? 'gradient-accent text-white shadow-lg shadow-[#0F4C75]/25'
                                              : 'bg-[#3282B8]/10 group-hover:bg-[#3282B8]/20'
                                          }`}>
                                            <Icon className={`text-sm ${isActive ? 'text-white' : colorText}`} />
                                          </div>
                                          <div className="flex-1 text-left">
                                            <div className="text-sm font-medium text-white capitalize">{type.type}</div>
                                            <div className="text-[10px] text-[#BBE1FA]/50">{type.count} case{type.count > 1 ? 's' : ''}</div>
                                          </div>
                                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                            isActive
                                              ? 'gradient-accent text-white'
                                              : `bg-[#3282B8]/10 ${colorText}`
                                          }`}>
                                            {type.count}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* ===== DIVIDER ===== */}
                            <div className="px-4 py-1">
                              <div className="border-t border-[#3282B8]/20"></div>
                            </div>

                            {/* ===== SOLVED CASES ===== */}
                            <button
                              onClick={() => handleDropdownItemClick('solved-cases')}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all duration-200 group ${
                                activePage === 'solved-cases'
                                  ? 'bg-[#3282B8]/20 text-white'
                                  : 'text-[#BBE1FA]/70 hover:bg-[#3282B8]/10 hover:text-white'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                activePage === 'solved-cases'
                                  ? 'gradient-accent text-white shadow-lg shadow-[#0F4C75]/25'
                                  : 'bg-[#22C55E]/20 group-hover:bg-[#22C55E]/30'
                              }`}>
                                <FaCheckDouble className={`text-sm ${activePage ? 'text-white' : 'text-[#22C55E]'}`} />
                              </div>
                              <div className="flex-1 text-left">
                                <div className="text-sm font-medium text-white">Solved Cases</div>
                                <div className="text-[10px] text-[#BBE1FA]/50">Cases resolved by others</div>
                              </div>
                              {solvedCases?.length > 0 && (
                                <span className="text-xs px-2 py-0.5 bg-[#22C55E]/20 text-[#22C55E] rounded-full font-medium">
                                  {solvedCases.length}
                                </span>
                              )}
                            </button>

                            {/* ===== REFERENCE CASES ===== */}
                            <button
                              onClick={() => handleDropdownItemClick('reference-cases')}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all duration-200 group ${
                                activePage === 'reference-cases'
                                  ? 'bg-[#3282B8]/20 text-white'
                                  : 'text-[#BBE1FA]/70 hover:bg-[#3282B8]/10 hover:text-white'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                activePage === 'reference-cases'
                                  ? 'gradient-accent text-white shadow-lg shadow-[#0F4C75]/25'
                                  : 'bg-[#3282B8]/20 group-hover:bg-[#3282B8]/30'
                              }`}>
                                <FaBook className={`text-sm ${activePage ? 'text-white' : 'text-[#3282B8]'}`} />
                              </div>
                              <div className="flex-1 text-left">
                                <div className="text-sm font-medium text-white">Reference Cases</div>
                                <div className="text-[10px] text-[#BBE1FA]/50">Legal precedents</div>
                              </div>
                              {referenceCases?.length > 0 && (
                                <span className="text-xs px-2 py-0.5 bg-[#3282B8]/20 text-[#3282B8] rounded-full font-medium">
                                  {referenceCases.length}
                                </span>
                              )}
                            </button>
                          </div>

                          {/* Footer */}
                          <div className="px-4 py-2 border-t border-[#3282B8]/20 bg-[#1B262C]/80">
                            <button
                              onClick={() => handleDropdownItemClick('cases')}
                              className="w-full flex items-center justify-center gap-2 text-xs text-[#3282B8] hover:text-[#BBE1FA] transition-colors py-1"
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

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                      activePage === item.id 
                        ? 'gradient-accent text-white shadow-lg shadow-[#0F4C75]/30' 
                        : 'text-[#BBE1FA]/60 hover:text-white hover:bg-[#3282B8]/20'
                    }`}
                  >
                    <item.icon className="text-sm" />
                    {item.label}
                    {item.count !== undefined && item.count > 0 && (
                      <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                        activePage === item.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-[#3282B8]/30 text-[#BBE1FA]'
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
                  className="p-2 text-[#BBE1FA]/60 hover:text-[#3282B8] hover:bg-[#3282B8]/10 rounded-xl transition-all duration-200"
                  aria-label="Search"
                >
                  <FaSearch className="text-sm" />
                </button>

                {isSearchOpen && (
                  <form 
                    onSubmit={handleSearch}
                    className="absolute right-0 mt-2 w-80 bg-white border border-[#3282B8] rounded-xl p-2 shadow-premium-lg"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Search cases, clients, documents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-3 py-2 bg-[#F0F4F8] text-[#1B262C] placeholder:text-[#9CA3AF] rounded-lg border border-[#BBE1FA] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 gradient-accent text-white rounded-lg hover:shadow-lg hover:shadow-[#0F4C75]/30 transition-all font-medium"
                      >
                        <FaSearch className="text-sm" />
                      </button>
                    </div>
                    <div className="mt-2 text-xs text-[#6B7280] flex items-center gap-1">
                      <span className="text-[#0F4C75]">⌘</span> Press Enter to search
                    </div>
                  </form>
                )}
              </div>
              
              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 text-[#BBE1FA]/60 hover:text-[#3282B8] hover:bg-[#3282B8]/10 rounded-xl transition-all duration-200"
                  aria-label="Notifications"
                >
                  <FaBell className="text-sm" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-[#1B262C] animate-pulse"></span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-[#3282B8] rounded-xl shadow-premium-lg overflow-hidden">
                    <div className="p-4 border-b border-[#BBE1FA] bg-[#F0F4F8]">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-[#1B262C]">Notifications</h3>
                        {unreadCount > 0 && (
                          <button 
                            onClick={markAllRead}
                            className="text-xs text-[#0F4C75] hover:text-[#3282B8] transition-colors font-medium"
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
                            className={`p-4 hover:bg-[#F0F4F8] transition-colors cursor-pointer ${!notif.read ? 'border-l-2 border-[#0F4C75]' : ''}`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-xl">{notif.icon}</span>
                              <div className="flex-1">
                                <p className={`text-sm ${!notif.read ? 'text-[#1B262C] font-medium' : 'text-[#6B7280]'}`}>{notif.title}</p>
                                <p className="text-xs text-[#6B7280] mt-1">{notif.time}</p>
                              </div>
                              {!notif.read && (
                                <div className="w-2 h-2 bg-[#0F4C75] rounded-full mt-1"></div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <div className="text-4xl mb-2">🔔</div>
                          <p className="text-[#6B7280] text-sm">No notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 border-t border-[#BBE1FA] bg-[#F0F4F8] text-center">
                      <button className="text-sm text-[#0F4C75] hover:text-[#3282B8] transition-colors font-medium">
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
                  className="flex items-center gap-2 px-2 py-1 hover:bg-[#3282B8]/10 rounded-xl transition-all duration-200"
                  aria-label="Profile"
                >
                  <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-lg shadow-[#0F4C75]/25">
                    {getUserInitials()}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-medium text-[#BBE1FA]">{getDisplayName()}</p>
                    <p className="text-[10px] text-[#3282B8]">{displayUser.role || 'User'}</p>
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-[#3282B8] rounded-xl shadow-premium-lg overflow-hidden">
                    <div className="p-4 border-b border-[#BBE1FA] bg-[#F0F4F8]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 gradient-accent rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-[#0F4C75]/25">
                          {getUserInitials()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#1B262C]">{getDisplayName()}</p>
                          <p className="text-xs text-[#6B7280]">{displayUser.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      <button 
                        onClick={() => handleNavClick('profile')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#1B262C] hover:bg-[#3282B8]/10 transition-colors"
                      >
                        <FaUserCircle className="text-[#0F4C75]" />
                        Profile
                      </button>
                      <button 
                        onClick={() => handleNavClick('settings')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#1B262C] hover:bg-[#3282B8]/10 transition-colors"
                      >
                        <FaCog className="text-[#0F4C75]" />
                        Settings
                      </button>
                    </div>
                    <div className="border-t border-[#BBE1FA] py-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
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
                className="btn-primary text-sm py-1.5 px-4 flex items-center gap-1.5"
                aria-label="Add new case"
              >
                <FaPlusCircle className="text-xs" />
                <span className="hidden sm:inline">New Case</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;