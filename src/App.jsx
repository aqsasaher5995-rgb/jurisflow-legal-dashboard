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
import { 
  FaPlusCircle, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaDollarSign, 
  FaFileAlt, 
  FaCalendarAlt, 
  FaGavel 
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

  const filteredCases = getFilteredCases(activeTab, searchQuery);
  const stats = getStats();

  const initialCaseIds = ['1', '2', '3', '4', '5', '6'];
  const isNewCase = (caseId) => !initialCaseIds.includes(caseId);

  const tabs = [
    { id: 'all', label: 'All Cases', count: stats.total },
    { id: 'active', label: 'Active', count: stats.active },
    { id: 'pending', label: 'Pending', count: stats.pending },
    { id: 'closed', label: 'Closed', count: stats.closed },
  ];

  const handleNavigate = (page) => {
    setActivePage(page);
    console.log('Navigating to:', page);
    if (['cases', 'active', 'pending', 'closed', 'solved-cases', 'reference-cases'].includes(page)) {
      setActiveTab(page === 'solved-cases' ? 'solved' : page === 'reference-cases' ? 'reference' : page === 'cases' ? 'all' : page);
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

  // ============================================
  // Case Handlers
  // ============================================
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

  // ============================================
  // GLOBAL FALLBACK - Make edit available everywhere
  // ============================================
  window.__editCase = (caseItem) => {
    console.log('🌐 Global edit called for case:', caseItem);
    setCaseToEdit(caseItem);
    setIsEditModalOpen(true);
  };

  // ============================================
  // Render Content
  // ============================================
  const renderContent = () => {
    if (activePage === 'profile') return <Profile />;
    if (activePage === 'settings') return <Settings />;

    if (activePage === 'reference-cases') {
      const filteredReferences = referenceCases.filter(ref =>
        ref.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ref.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ref.caseType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ref.referenceCategory.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return (
        <div className="bg-[#0a0a0f] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">Reference Cases</h2>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/20">
                  {referenceCases.length} References
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Legal precedents and reference cases for research</p>
            </div>
            <button
              onClick={() => setIsAddReferenceModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              <FaPlusCircle className="text-xs" />
              Add Reference Case
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search reference cases..." />
          </div>
          
          {/* Reference Cases Grid - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredReferences.map((caseItem) => (
              <div key={caseItem.id} className="bg-[#0a0a0f] rounded-xl border border-[rgba(255,255,255,0.05)] p-5 hover:border-[rgba(255,255,255,0.1)] transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-base leading-tight truncate">{caseItem.title}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-gray-500 font-mono">#{caseItem.caseNumber}</span>
                      <span className="text-xs px-2 py-0.5 bg-[rgba(255,255,255,0.05)] rounded-full text-gray-400 border border-[rgba(255,255,255,0.05)]">
                        {caseItem.caseType || 'General'}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium border bg-blue-500/10 text-blue-400 border-blue-500/20 flex-shrink-0 ml-3">
                    📚 Reference
                  </span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2 mb-3">{caseItem.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.05)]">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-[10px]" />
                      {caseItem.date ? new Date(caseItem.date).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setSelectedCase(caseItem)} className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-[rgba(79,70,229,0.15)] rounded-lg transition-all">
                      <FaEye className="text-sm" />
                    </button>
                    <button onClick={() => handleDeleteReferenceCase(caseItem.id)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-[rgba(239,68,68,0.15)] rounded-lg transition-all">
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
                <h3 className="text-lg font-semibold text-white mb-1">No reference cases found</h3>
                <p className="text-gray-400 text-sm">{searchQuery ? 'Try adjusting your search' : 'Add reference cases for legal research'}</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (activePage === 'solved-cases') {
      return (
        <div className="bg-[#0a0a0f] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">Solved Cases</h2>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-medium border border-emerald-500/20">
                  {solvedCases.length} Solved
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Cases resolved by other lawyers</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search solved cases..." />
          </div>
          {/* Solved Cases Grid - 2 columns */}
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
                <h3 className="text-lg font-semibold text-white mb-1">No solved cases</h3>
              </div>
            </div>
          )}
        </div>
      );
    }

    switch (activePage) {
      case 'dashboard':
        return (
          <div className="bg-[#0a0a0f] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">All Cases</h2>
                <p className="text-sm text-gray-400 mt-1">Manage and track your legal cases</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Total: <span className="text-white font-bold">{stats.total}</span></span>
                <span className="text-gray-600">|</span>
                <span className="text-emerald-400">{stats.active} active</span>
                <span className="text-gray-600">|</span>
                <span className="text-amber-400">{stats.pending} pending</span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-400">{stats.closed} closed</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search cases..." />
            </div>
            {/* Dashboard Grid - 2 columns */}
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
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-lg font-semibold text-white mb-1">No cases found</h3>
                  <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
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
          <div className="bg-[#0a0a0f] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {activePage === 'cases' ? 'All Cases' : 
                   activePage === 'active' ? 'Active Cases' :
                   activePage === 'pending' ? 'Pending Cases' : 'Closed Cases'}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search cases..." />
            </div>
            {/* Cases Grid - 2 columns */}
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
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-lg font-semibold text-white mb-1">No cases found</h3>
                  <p className="text-gray-400 text-sm">Start by adding a new case</p>
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
          <div className="bg-[#0a0a0f] rounded-xl border border-[rgba(255,255,255,0.05)] p-12 text-center">
            <h3 className="text-2xl font-semibold text-white">Page not found</h3>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header 
        onAddClick={() => setIsAddModalOpen(true)}
        stats={stats}
        cases={cases}
        onNavigate={handleNavigate}
        activePage={activePage}
        solvedCases={solvedCases}
        referenceCases={referenceCases}
      />

      {activePage === 'dashboard' && <HeroSection stats={stats} />}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
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