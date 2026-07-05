import React, { useState, useMemo } from 'react';
import { useCases } from './hooks/useCases';
import { dummyClients, dummyEvents } from './data/dummyData';
import { dummyReferenceCases } from './data/referenceData';
import Header from './components/layout/Header';
import HeroSection from './components/layout/HeroSection';
import Footer from './components/layout/Footer';
import CaseCard from './components/cases/CaseCard';
import SearchBar from './components/common/SearchBar';
import TabNavigation from './components/common/TabNavigation';
import AddCaseModal from './components/modals/AddCaseModal';
import EditCaseModal from './components/modals/EditCaseModal';
import CaseDetailModal from './components/modals/CaseDetailModal';
import ClientsList from './components/clients/ClientsList';
import CalendarView from './components/calendar/CalendarView';
import ReportsDashboard from './components/reports/ReportsDashboard';
import AddReferenceModal from './components/modals/AddReferenceModal';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { 
  FaPlusCircle, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaDollarSign, 
  FaFileAlt, 
  FaCalendarAlt, 
  FaGavel,
  FaSearch,
  FaClock,
  FaCheckCircle
} from 'react-icons/fa';

function App() {
  const {
    cases,
    addCase,
    updateCase,
    deleteCase,
    updateCaseStatus,
    getFilteredCases,
    getStats,
  } = useCases();

  const [activePage, setActivePage] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddReferenceModalOpen, setIsAddReferenceModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [caseToEdit, setCaseToEdit] = useState(null);
  
  const [clients, setClients] = useState(dummyClients);
  const [events, setEvents] = useState(dummyEvents);
  const [referenceCases, setReferenceCases] = useState(dummyReferenceCases);

  const solvedCases = useMemo(() => {
    const solvedCaseIds = ['3', '5'];
    return cases.filter(c => c.status === 'closed' && solvedCaseIds.includes(c.id));
  }, [cases]);

  const filteredCases = useMemo(() => {
    let filtered = cases;

    if (activeTab !== 'all') {
      filtered = filtered.filter(c => c.status === activeTab);
    }

    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(c =>
        c.caseTitle?.toLowerCase().includes(query) ||
        c.title?.toLowerCase().includes(query) ||
        c.caseNumber?.toLowerCase().includes(query) ||
        c.party?.toLowerCase().includes(query) ||
        c.description?.toLowerCase().includes(query) ||
        c.caseType?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [cases, activeTab, searchQuery]);

  const stats = getStats();

  const initialCaseIds = ['1', '2', '3', '4', '5', '6'];
  const isNewCase = (caseId) => !initialCaseIds.includes(caseId);

  const tabs = [
    { id: 'all', label: 'All Cases', count: filteredCases.length },
    { id: 'active', label: 'Active', count: filteredCases.filter(c => c.status === 'active').length },
    { id: 'pending', label: 'Pending', count: filteredCases.filter(c => c.status === 'pending').length },
    { id: 'closed', label: 'Closed', count: filteredCases.filter(c => c.status === 'closed').length },
  ];

  const handleNavigate = (page) => {
    setActivePage(page);
    console.log('Navigating to:', page);
    
    if (page === 'profile' || page === 'settings') {
      return;
    }
    
    if (['cases', 'active', 'pending', 'closed', 'solved-cases', 'reference-cases'].includes(page)) {
      setActiveTab(page === 'solved-cases' ? 'solved' : page === 'reference-cases' ? 'reference' : page === 'cases' ? 'all' : page);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query && query.trim()) {
      setActivePage('cases');
    }
  };

  const handleHeroSearch = (query) => {
    setSearchQuery(query);
    if (query && query.trim()) {
      setActivePage('cases');
    }
  };

  const handleAddClient = (newClient) => {
    setClients([newClient, ...clients]);
  };

  const handleEditClient = (updatedClient) => {
    setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
  };

  const handleDeleteClient = (clientId) => {
    setClients(clients.filter(c => c.id !== clientId));
  };

  const handleAddEvent = (newEvent) => {
    setEvents([newEvent, ...events]);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const handleEdit = (caseItem) => {
    console.log('📝 App - Opening edit modal for case:', caseItem?.id);
    setCaseToEdit(caseItem);
    setIsEditModalOpen(true);
  };

  const handleUpdateCase = async (id, updatedData) => {
    console.log('📝 App - Updating case:', id);
    console.log('📝 App - Updated data:', updatedData);
    const result = await updateCase(id, updatedData);
    if (result.success) {
      setCaseToEdit(null);
      setIsEditModalOpen(false);
    }
    return result;
  };

  const handleAddReferenceCase = (newReference) => {
    const newRef = {
      id: `ref${Date.now()}`,
      ...newReference,
      status: 'reference',
    };
    setReferenceCases([newRef, ...referenceCases]);
    setIsAddReferenceModalOpen(false);
  };

  const handleDeleteReferenceCase = (id) => {
    if (window.confirm('Are you sure you want to delete this reference case?')) {
      setReferenceCases(referenceCases.filter(c => c.id !== id));
    }
  };

  window.__editCase = (caseItem) => {
    console.log('🌐 Global edit called for case:', caseItem);
    setCaseToEdit(caseItem);
    setIsEditModalOpen(true);
  };

  const renderContent = () => {
    if (activePage === 'profile') {
      return <Profile onNavigate={handleNavigate} />;
    }
    
    if (activePage === 'settings') {
      return <Settings onNavigate={handleNavigate} />;
    }

    if (activePage === 'reference-cases') {
      const filteredReferences = referenceCases.filter(ref =>
        ref.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ref.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ref.caseType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ref.referenceCategory.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-[#1B262C]">Reference Cases</h2>
                <span className="px-3 py-1 bg-[#3282B8]/10 text-[#0F4C75] rounded-full text-xs font-medium border border-[#3282B8]/20">
                  {referenceCases.length} References
                </span>
              </div>
              <p className="text-sm text-[#6B7280] mt-1">Legal precedents and reference cases for research</p>
            </div>
            <button
              onClick={() => setIsAddReferenceModalOpen(true)}
              className="flex items-center gap-2 btn-primary px-4 py-2 text-sm font-medium"
            >
              <FaPlusCircle className="text-xs" />
              Add Reference Case
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-3.5 w-3.5 text-[#9CA3AF]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search reference cases..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#BBE1FA] rounded-xl text-sm text-[#1B262C] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-4 focus:ring-[#3282B8]/10 focus:border-[#3282B8] transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9CA3AF] hover:text-[#1B262C]"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredReferences.map((caseItem) => (
              <div key={caseItem.id} className="premium-card hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#1B262C] text-base leading-tight truncate">{caseItem.title}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-[#6B7280] font-mono">#{caseItem.caseNumber}</span>
                      <span className="text-xs px-2 py-0.5 bg-[#3282B8]/10 rounded text-[#0F4C75] border border-[#3282B8]/20">
                        {caseItem.caseType || 'General'}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium border bg-[#3282B8]/10 text-[#0F4C75] border-[#3282B8]/20 flex-shrink-0 ml-3">
                    📚 Reference
                  </span>
                </div>
                <p className="text-sm text-[#6B7280] line-clamp-2 mb-3">{caseItem.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[#BBE1FA]">
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-[10px] text-[#0F4C75]" />
                      {caseItem.date ? new Date(caseItem.date).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setSelectedCase(caseItem)} className="p-1.5 text-[#1B262C] hover:text-[#0F4C75] hover:bg-[#3282B8]/10 rounded-lg transition-all">
                      <FaEye className="text-sm" />
                    </button>
                    <button onClick={() => handleDeleteReferenceCase(caseItem.id)} className="p-1.5 text-[#EF4444] hover:text-[#EF4444]/80 hover:bg-[#EF4444]/10 rounded-lg transition-all">
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredReferences.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-lg font-semibold text-[#1B262C] mb-1">No reference cases found</h3>
                <p className="text-[#6B7280] text-sm">{searchQuery ? 'Try adjusting your search' : 'Add reference cases for legal research'}</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (activePage === 'solved-cases') {
      return (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-[#1B262C]">Solved Cases</h2>
                <span className="px-3 py-1 bg-[#22C55E]/10 text-[#22C55E] rounded-full text-xs font-medium border border-[#22C55E]/20">
                  {solvedCases.length} Solved
                </span>
              </div>
              <p className="text-sm text-[#6B7280] mt-1">Cases resolved by other lawyers</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-3.5 w-3.5 text-[#9CA3AF]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search solved cases..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#BBE1FA] rounded-xl text-sm text-[#1B262C] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-4 focus:ring-[#3282B8]/10 focus:border-[#3282B8]"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9CA3AF] hover:text-[#1B262C]"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {solvedCases.map((caseItem) => (
              <CaseCard
                key={caseItem.id}
                case={caseItem}
                onView={() => setSelectedCase(caseItem)}
                onEdit={() => handleEdit(caseItem)}
                onStatusChange={updateCaseStatus}
                onDelete={deleteCase}
                isNew={isNewCase(caseItem.id)}
              />
            ))}
          </div>
          {solvedCases.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-lg font-semibold text-[#1B262C] mb-1">No solved cases</h3>
              </div>
            </div>
          )}
        </div>
      );
    }

    switch (activePage) {
      case 'dashboard':
        return (
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#1B262C]">All Cases</h2>
                <p className="text-xs text-[#6B7280]">Manage and track your legal cases</p>
              </div>
              
              {/* Stats - Deep Current Theme */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-[#1B262C]/10 px-3 py-1.5 rounded-xl border border-[#1B262C]/20">
                  <FaFileAlt className="text-[#1B262C] text-[10px]" />
                  <span className="text-[10px] text-[#6B7280]">Total</span>
                  <span className="text-xs font-bold text-[#1B262C]">{stats.total}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0F4C75]/10 px-3 py-1.5 rounded-xl border border-[#0F4C75]/20">
                  <FaGavel className="text-[#0F4C75] text-[10px]" />
                  <span className="text-[10px] text-[#6B7280]">Active</span>
                  <span className="text-xs font-bold text-[#0F4C75]">{stats.active}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#F59E0B]/10 px-3 py-1.5 rounded-xl border border-[#F59E0B]/20">
                  <FaClock className="text-[#F59E0B] text-[10px]" />
                  <span className="text-[10px] text-[#6B7280]">Pending</span>
                  <span className="text-xs font-bold text-[#F59E0B]">{stats.pending}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#9CA3AF]/10 px-3 py-1.5 rounded-xl border border-[#9CA3AF]/20">
                  <FaCheckCircle className="text-[#6B7280] text-[10px]" />
                  <span className="text-[10px] text-[#6B7280]">Closed</span>
                  <span className="text-xs font-bold text-[#6B7280]">{stats.closed}</span>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-3.5 w-3.5 text-[#9CA3AF]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search cases..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#BBE1FA] rounded-xl text-sm text-[#1B262C] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-4 focus:ring-[#3282B8]/10 focus:border-[#3282B8] transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearch('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9CA3AF] hover:text-[#1B262C]"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
              {searchQuery && (
                <span className="text-xs text-[#6B7280] whitespace-nowrap">
                  {filteredCases.length} result{filteredCases.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* ===== CASES GRID WITH NEW BACKGROUND ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredCases.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  case={caseItem}
                  onView={() => setSelectedCase(caseItem)}
                  onEdit={() => handleEdit(caseItem)}
                  onStatusChange={updateCaseStatus}
                  onDelete={deleteCase}
                  isNew={isNewCase(caseItem.id)}
                />
              ))}
            </div>
            
            {filteredCases.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="text-5xl mb-3">🔍</div>
                  <h3 className="text-base font-semibold text-[#1B262C] mb-1">No cases found</h3>
                  <p className="text-sm text-[#6B7280]">
                    {searchQuery ? `No results found for "${searchQuery}"` : 'Try adjusting your search or filters'}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => handleSearch('')}
                      className="mt-3 text-sm text-[#0F4C75] hover:text-[#3282B8] transition-colors font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      
      case 'cases':
      case 'active':
      case 'pending':
      case 'closed':
        return (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#1B262C]">
                  {activePage === 'cases' ? 'All Cases' : 
                   activePage === 'active' ? 'Active Cases' :
                   activePage === 'pending' ? 'Pending Cases' : 'Closed Cases'}
                </h2>
                <p className="text-xs text-[#6B7280]">
                  {filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-3.5 w-3.5 text-[#9CA3AF]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search cases..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#BBE1FA] rounded-xl text-sm text-[#1B262C] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-4 focus:ring-[#3282B8]/10 focus:border-[#3282B8]"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearch('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9CA3AF] hover:text-[#1B262C]"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              {searchQuery && (
                <span className="text-xs text-[#6B7280] whitespace-nowrap">
                  {filteredCases.length} result{filteredCases.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* ===== CASES GRID WITH NEW BACKGROUND ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredCases.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  case={caseItem}
                  onView={() => setSelectedCase(caseItem)}
                  onEdit={() => handleEdit(caseItem)}
                  onStatusChange={updateCaseStatus}
                  onDelete={deleteCase}
                  isNew={isNewCase(caseItem.id)}
                />
              ))}
            </div>
            
            {filteredCases.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="text-5xl mb-3">🔍</div>
                  <h3 className="text-base font-semibold text-[#1B262C] mb-1">No cases found</h3>
                  <p className="text-sm text-[#6B7280]">
                    {searchQuery ? `No results for "${searchQuery}"` : 'Start by adding a new case'}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => handleSearch('')}
                      className="mt-3 text-sm text-[#0F4C75] hover:text-[#3282B8] transition-colors font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      
      case 'clients':
        return (
          <ClientsList 
            clients={clients}
            onAddClient={handleAddClient}
            onEditClient={handleEditClient}
            onDeleteClient={handleDeleteClient}
          />
        );
      
      case 'calendar':
        return (
          <CalendarView 
            events={events}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        );
      
      case 'reports':
        return <ReportsDashboard cases={cases} clients={clients} events={events} />;
      
      default:
        return (
          <div className="bg-white rounded-2xl border border-[#BBE1FA] shadow-premium p-12 text-center">
            <h3 className="text-xl font-semibold text-[#1B262C]">Page not found</h3>
          </div>
        );
    }
  };

  return (
    // ===== UPDATED MAIN BACKGROUND =====
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4F8] via-[#F0F4F8] to-[#BBE1FA]/20 flex flex-col">
      {/* Premium Top Accent Bar - Deep Current */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-[#1B262C] via-[#0F4C75] to-[#3282B8]"></div>
      
      <Header 
        onAddClick={() => setIsAddModalOpen(true)}
        stats={stats}
        cases={cases}
        onNavigate={handleNavigate}
        activePage={activePage}
        solvedCases={solvedCases}
        referenceCases={referenceCases}
      />

      {activePage === 'dashboard' && (
        <HeroSection 
          stats={stats} 
          onSearch={handleHeroSearch}
        />
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {renderContent()}
      </main>

      <Footer stats={stats} onNavigate={handleNavigate} />

      <AddCaseModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={addCase} />

      <EditCaseModal
        isOpen={isEditModalOpen}
        case={caseToEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setCaseToEdit(null);
        }}
        onUpdate={handleUpdateCase}
      />

      <CaseDetailModal
        isOpen={!!selectedCase}
        case={selectedCase}
        onClose={() => setSelectedCase(null)}
        onStatusChange={updateCaseStatus}
        onEdit={handleEdit}
      />

      <AddReferenceModal
        isOpen={isAddReferenceModalOpen}
        onClose={() => setIsAddReferenceModalOpen(false)}
        onAdd={handleAddReferenceCase}
      />
    </div>
  );
}

export default App;