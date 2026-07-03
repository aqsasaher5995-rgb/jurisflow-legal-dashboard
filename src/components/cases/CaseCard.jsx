import React, { useState } from 'react';
import { 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaCalendarAlt, 
  FaDollarSign,
  FaUserFriends,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaHourglassHalf,
  FaExclamationTriangle
} from 'react-icons/fa';
import CaseDetailModal from '../modals/CaseDetailModal';

const CaseCard = ({ case: caseItem, onView, onEdit, onStatusChange, onDelete, isNew = false }) => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  if (!caseItem) return null;

  // ============================================
  // Helper Functions
  // ============================================
  
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      closed: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    };
    return colors[status] || colors.pending;
  };

  const getStatusLabel = (status) => {
    const labels = {
      active: 'Active',
      pending: 'Pending',
      closed: 'Closed',
    };
    return labels[status] || status;
  };

  const getStatusDot = (status) => {
    const dots = {
      active: 'bg-emerald-400',
      pending: 'bg-amber-400',
      closed: 'bg-gray-400',
    };
    return dots[status] || dots.pending;
  };

  const getInitials = (name) => {
    if (!name) return 'NA';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getTotalDocuments = () => {
    const docs = caseItem.documents || {};
    const petitioner = docs.petitioner || [];
    const research = docs.research || [];
    const defendant = docs.defendant || [];
    return petitioner.length + research.length + defendant.length;
  };

  const truncateText = (text, maxLength = 60) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // ============================================
  // Handlers
  // ============================================
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(caseItem.id);
    }
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleStatusChange = (newStatus) => {
    if (onStatusChange) {
      onStatusChange(caseItem.id, newStatus);
    }
  };

  // ============================================
  // Card Render
  // ============================================
  return (
    <>
      <div className={`${isNew ? 'glow-card-new' : 'glow-card'} flex flex-col relative`}>
        
        {/* Header - Title and Status Badge */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0 pr-20">
            <h3 className="font-semibold text-white text-base leading-tight truncate">
              {caseItem.title || caseItem.caseTitle || 'Untitled Case'}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <span className="text-[10px] text-gray-500 font-mono">#{caseItem.id?.slice(0, 8)}</span>
              {caseItem.caseNumber && (
                <span className="text-[10px] px-1.5 py-0.5 bg-[rgba(79,70,229,0.1)] rounded text-[#818cf8] border border-[rgba(79,70,229,0.1)]">
                  {caseItem.caseNumber}
                </span>
              )}
              <span className="text-[10px] px-1.5 py-0.5 bg-[rgba(255,255,255,0.05)] rounded text-gray-400 border border-[rgba(255,255,255,0.05)]">
                {caseItem.caseType || 'General'}
              </span>
            </div>
          </div>
          
          {/* Status Badge - Static (kept in header) */}
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${getStatusColor(caseItem.status)} flex-shrink-0 ml-2`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${getStatusDot(caseItem.status)} mr-1`}></span>
            {getStatusLabel(caseItem.status)}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2 mb-2 leading-relaxed">
          {caseItem.description || 'No description provided.'}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-2">
          <div>
            <p className="text-[8px] text-gray-500 uppercase tracking-wider">Amount</p>
            <p className="text-[12px] font-medium text-gray-300">{caseItem.amount || '—'}</p>
          </div>
          <div className="w-px h-6 bg-[rgba(255,255,255,0.06)]"></div>
          <div>
            <p className="text-[8px] text-gray-500 uppercase tracking-wider">Hearings</p>
            <p className="text-[12px] font-medium text-gray-300">{caseItem.hearings || 0}</p>
          </div>
          <div className="w-px h-6 bg-[rgba(255,255,255,0.06)]"></div>
          <div>
            <p className="text-[8px] text-gray-500 uppercase tracking-wider">Documents</p>
            <p className="text-[12px] font-medium text-gray-300">{getTotalDocuments()}</p>
          </div>
        </div>

        {/* Party */}
        <div className="flex items-center gap-2 p-1.5 bg-[rgba(255,255,255,0.03)] rounded-lg mb-2 border border-[rgba(255,255,255,0.05)]">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center text-white text-[9px] font-semibold flex-shrink-0">
            {getInitials(caseItem.party)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-500">Parties</p>
            <p className="text-xs text-gray-300 truncate">{caseItem.party || 'N/A'}</p>
          </div>
          <FaUserFriends className="text-gray-500 text-[10px] flex-shrink-0" />
        </div>

        {/* Footer - Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowViewModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium text-gray-400 hover:text-blue-400 hover:bg-[rgba(79,70,229,0.08)] transition-all"
            >
              <FaEye className="text-[9px]" /> View
            </button>
            <button
              onClick={() => onEdit && onEdit(caseItem)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium text-gray-400 hover:text-amber-400 hover:bg-[rgba(251,191,36,0.08)] transition-all"
            >
              <FaEdit className="text-[9px]" /> Edit
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Status Toggle Buttons - Alternative to dropdown */}
            <div className="flex items-center gap-0.5 bg-[rgba(255,255,255,0.03)] rounded-lg p-0.5 border border-[rgba(255,255,255,0.05)]">
              <button
                onClick={() => handleStatusChange('active')}
                className={`px-2 py-0.5 rounded text-[9px] font-medium transition-all ${
                  caseItem.status === 'active'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                <span className="flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-emerald-400"></span>
                  Active
                </span>
              </button>
              <button
                onClick={() => handleStatusChange('pending')}
                className={`px-2 py-0.5 rounded text-[9px] font-medium transition-all ${
                  caseItem.status === 'pending'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                <span className="flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-amber-400"></span>
                  Pending
                </span>
              </button>
              <button
                onClick={() => handleStatusChange('closed')}
                className={`px-2 py-0.5 rounded text-[9px] font-medium transition-all ${
                  caseItem.status === 'closed'
                    ? 'bg-gray-500/20 text-gray-400'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                <span className="flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-gray-400"></span>
                  Closed
                </span>
              </button>
            </div>

            {/* Delete Button */}
            <div className="relative">
              <button
                onClick={handleDeleteClick}
                className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <FaTrash className="text-[11px]" />
              </button>
              
              {showDeleteConfirm && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                    onClick={handleCancelDelete}
                  />
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div 
                      className="bg-[#1a1a2e] rounded-2xl border border-red-500/40 shadow-2xl shadow-red-500/20 p-6 max-w-sm w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center mb-3 animate-pulse">
                          <FaExclamationTriangle className="text-red-400 text-2xl" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">Delete Case?</h3>
                        <p className="text-sm text-gray-400 mb-4">This action cannot be undone.</p>
                        <div className="flex gap-3 w-full">
                          <button
                            onClick={handleConfirmDelete}
                            className="flex-1 px-4 py-2 text-sm font-medium bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all"
                          >
                            Delete
                          </button>
                          <button
                            onClick={handleCancelDelete}
                            className="flex-1 px-4 py-2 text-sm font-medium bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 rounded-xl transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && (
        <CaseDetailModal 
          isOpen={showViewModal}
          case={caseItem}
          onClose={() => setShowViewModal(false)}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
        />
      )}
    </>
  );
};

export default CaseCard;