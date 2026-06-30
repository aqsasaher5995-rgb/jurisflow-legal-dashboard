import React, { useState } from 'react';
import { useCases } from './hooks/useCases';
import { dummyClients, dummyEvents } from './data/dummyData';
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
  const [selectedCase, setSelectedCase] = useState(null);
  const [caseToEdit, setCaseToEdit] = useState(null);

  const [clients] = useState(dummyClients);
  const [events] = useState(dummyEvents);

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
    if (['cases', 'active', 'pending', 'closed'].includes(page)) {
      setActiveTab(page === 'cases' ? 'all' : page);
    }
  };

  const handleEdit = (caseItem) => {
    setCaseToEdit(caseItem);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedCase) => {
    updateCase(updatedCase);
    setIsEditModalOpen(false);
    setCaseToEdit(null);
  };

  const renderContent = () => {
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
              <SearchBar 
                value={searchQuery} 
                onChange={setSearchQuery} 
                placeholder="Search cases..." 
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
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
              <SearchBar 
                value={searchQuery} 
                onChange={setSearchQuery} 
                placeholder="Search cases..." 
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
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
        return <ClientsList clients={clients} />;
      
      case 'calendar':
        return <CalendarView events={events} />;
      
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
      />

      {activePage === 'dashboard' && <HeroSection stats={stats} />}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      <Footer />

      <AddCaseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addCase}
      />

      <EditCaseModal
        isOpen={isEditModalOpen}
        case={caseToEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setCaseToEdit(null);
        }}
        onUpdate={handleUpdate}
      />

      <CaseDetailModal
        isOpen={!!selectedCase}
        case={selectedCase}
        onClose={() => setSelectedCase(null)}
        onStatusChange={updateCaseStatus}
      />
    </div>
  );
}

export default App;