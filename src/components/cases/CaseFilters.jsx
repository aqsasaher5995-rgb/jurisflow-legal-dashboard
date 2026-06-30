import React from 'react';

const CaseFilters = ({ onStatusFilter, onDateFilter, onReset }) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <select
        onChange={(e) => onStatusFilter(e.target.value)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="closed">Closed</option>
      </select>
      
      <select
        onChange={(e) => onDateFilter(e.target.value)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="all">All Dates</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
      
      <button
        onClick={onReset}
        className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default CaseFilters;