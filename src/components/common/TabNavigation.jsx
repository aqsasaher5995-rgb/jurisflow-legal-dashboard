import React from 'react';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap gap-1.5 p-1 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
            activeTab === tab.id
              ? 'bg-[#4f46e5] text-white shadow-lg shadow-[#4f46e5]/20'
              : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
          }`}
        >
          {tab.label}
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
            activeTab === tab.id
              ? 'bg-white/20 text-white'
              : 'bg-[rgba(255,255,255,0.05)] text-gray-500'
          }`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;