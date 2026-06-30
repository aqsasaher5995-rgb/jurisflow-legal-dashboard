import React from 'react';
import { FaEye } from 'react-icons/fa';

const RecentCases = ({ cases, onViewCase }) => {
  const recentCases = cases.slice(0, 3);

  return (
    <div className="card mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Cases</h3>
      <div className="space-y-3">
        {recentCases.map((caseItem) => (
          <div key={caseItem.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div>
              <p className="font-medium text-gray-900">{caseItem.title}</p>
              <p className="text-sm text-gray-500">{caseItem.party}</p>
            </div>
            <button
              onClick={() => onViewCase(caseItem)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <FaEye />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCases;