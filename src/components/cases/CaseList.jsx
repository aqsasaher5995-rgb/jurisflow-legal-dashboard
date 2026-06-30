import React from 'react';
import CaseCard from './CaseCard';
import SearchBar from '../common/SearchBar';
import TabNavigation from '../common/TabNavigation';

const CaseList = ({
  cases,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onViewCase,
  onStatusChange,
  onDeleteCase,
  stats,
}) => {
  const tabs = [
    { id: 'all', label: 'All Cases', count: stats.total },
    { id: 'active', label: 'Active', count: stats.active },
    { id: 'pending', label: 'Pending', count: stats.pending },
    { id: 'closed', label: 'Closed', count: stats.closed },
  ];

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((caseItem) => (
          <CaseCard
            key={caseItem.id}
            case={caseItem}
            onView={onViewCase}
            onStatusChange={onStatusChange}
            onDelete={onDeleteCase}
          />
        ))}
      </div>

      {cases.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-white rounded-xl p-8 max-w-md mx-auto shadow-sm">
            <p className="text-gray-500 text-lg">No cases found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseList;