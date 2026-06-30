import React from 'react';
import { FaTimes, FaCalendarAlt, FaUser, FaGavel, FaFileAlt } from 'react-icons/fa';

const CaseDetailModal = ({ isOpen, case: caseItem, onClose, onStatusChange }) => {
  if (!isOpen || !caseItem) return null;

  const statusConfig = {
    active: 'badge-active',
    pending: 'badge-pending',
    closed: 'badge-closed',
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[rgba(79,70,229,0.15)] rounded-xl">
              <FaGavel className="text-[#818cf8] text-xl" />
            </div>
            <h2 className="text-xl font-semibold text-white">Case Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[rgba(255,255,255,0.05)] rounded-xl transition-all duration-200"
          >
            <FaTimes className="text-gray-400 hover:text-gray-200" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white">{caseItem.title}</h3>
            <p className="text-sm text-gray-500 font-mono mt-1">Case #{caseItem.id}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className={`badge ${statusConfig[caseItem.status]}`}>
              <span className={`status-dot ${caseItem.status === 'active' ? 'status-dot-active' : caseItem.status === 'pending' ? 'status-dot-pending' : 'status-dot-closed'}`}></span>
              {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
            </span>
            {caseItem.status !== 'closed' && (
              <button
                onClick={() => {
                  onStatusChange(caseItem.id, 'closed');
                  onClose();
                }}
                className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] text-gray-400 rounded-full text-sm hover:bg-[rgba(255,255,255,0.1)] hover:text-white transition-colors"
              >
                Close Case
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-[rgba(255,255,255,0.03)] rounded-xl">
              <FaUser className="text-gray-500 text-lg" />
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Party</p>
                <p className="font-medium text-white">{caseItem.party || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[rgba(255,255,255,0.03)] rounded-xl">
              <FaCalendarAlt className="text-gray-500 text-lg" />
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Date</p>
                <p className="font-medium text-white">
                  {new Date(caseItem.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
            <div className="flex items-center gap-2 mb-2.5">
              <FaFileAlt className="text-gray-500" />
              <p className="text-sm font-medium text-gray-300">Description</p>
            </div>
            <p className="text-gray-400 leading-relaxed">{caseItem.description || 'No description provided.'}</p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailModal;