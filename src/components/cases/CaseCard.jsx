import React, { useState } from 'react';
import { 
  FaEye, FaEdit, FaTrash, FaGavel, FaCalendarAlt, 
  FaUser, FaTag, FaTimes, FaClock, FaFileAlt,
  FaUserFriends, FaBriefcase, FaMapMarkerAlt,
  FaStar, FaRegStar, FaPaperclip, FaComment,
  FaDollarSign, FaCalendarCheck, FaUsers,
  FaFilePdf, FaShare, FaCopy
} from 'react-icons/fa';

const CaseCard = ({ case: caseItem, onView, onEdit, onStatusChange, onDelete, isNew = false }) => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  if (!caseItem) return null;

  const getStatusStyle = (status) => {
    const styles = {
      active: 'badge-active',
      pending: 'badge-pending',
      closed: 'badge-closed',
    };
    return styles[status] || styles.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: '🟢',
      pending: '🟡',
      closed: '⚪',
    };
    return icons[status] || '🟡';
  };

  const getPriorityStyle = (priority) => {
    const styles = {
      High: 'priority-high',
      Urgent: 'priority-urgent',
      Medium: 'priority-medium',
      Low: 'priority-low',
    };
    return styles[priority] || styles.medium;
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      High: '🔴',
      Urgent: '🟠',
      Medium: '🟡',
      Low: '🟢',
    };
    return icons[priority] || '🟡';
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
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleViewClick = () => {
    if (onView) {
      onView(caseItem);
    } else {
      setShowViewModal(true);
    }
  };

  // View Modal Component
  const ViewModal = () => {
    if (!showViewModal) return null;

    return (
      <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
        <div className="modal-content glow-view-card relative" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setShowViewModal(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
          
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">{caseItem.title}</h2>
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="text-yellow-400 hover:scale-110 transition-transform"
                  >
                    {isFavorite ? <FaStar className="text-xl" /> : <FaRegStar className="text-xl" />}
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <p className="text-sm text-gray-400 font-mono">#{caseItem.id}</p>
                  <span className="text-xs px-2 py-0.5 bg-[rgba(255,255,255,0.05)] rounded-full text-gray-400 border border-[rgba(255,255,255,0.05)]">
                    <FaBriefcase className="inline text-[10px] mr-1" />
                    {caseItem.caseType || 'General'}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-[rgba(79,70,229,0.1)] rounded-full text-[#818cf8] border border-[rgba(79,70,229,0.1)]">
                    👤 {caseItem.assignedTo || 'Unassigned'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(caseItem.status)}`}>
                  {getStatusIcon(caseItem.status)} {caseItem.status?.charAt(0).toUpperCase() + caseItem.status?.slice(1) || 'Pending'}
                </span>
                {caseItem.priority && (
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border ${getPriorityStyle(caseItem.priority)}`}>
                    {getPriorityIcon(caseItem.priority)} {caseItem.priority} Priority
                  </span>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)] text-center">
                <p className="text-xs text-gray-500">Documents</p>
                <p className="text-sm text-white font-medium">{caseItem.documents || 0}</p>
              </div>
              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)] text-center">
                <p className="text-xs text-gray-500">Hearings</p>
                <p className="text-sm text-white font-medium">{caseItem.hearings || 0}</p>
              </div>
              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)] text-center">
                <p className="text-xs text-gray-500">Amount</p>
                <p className="text-sm text-white font-medium">{caseItem.amount || 'N/A'}</p>
              </div>
              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)] text-center">
                <p className="text-xs text-gray-500">Next Hearing</p>
                <p className="text-sm text-white font-medium">{caseItem.nextHearing ? formatDate(caseItem.nextHearing) : 'None'}</p>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <FaFileAlt className="text-[10px]" /> Description
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">{caseItem.description || 'No description provided.'}</p>
            </div>

            {/* Parties & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <FaUserFriends className="text-[10px]" /> Parties
                </p>
                <p className="text-sm text-white">{caseItem.party || 'N/A'}</p>
              </div>
              {caseItem.location && (
                <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-[10px]" /> Location
                  </p>
                  <p className="text-sm text-white">{caseItem.location}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
              {caseItem.status !== 'closed' && onStatusChange && (
                <button
                  onClick={() => {
                    onStatusChange(caseItem.id, 'closed');
                    setShowViewModal(false);
                  }}
                  className="flex-1 min-w-[120px] px-4 py-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-all duration-200 font-medium"
                >
                  <FaGavel className="inline mr-2" /> Close Case
                </button>
              )}
              {isNew && (
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    onEdit && onEdit(caseItem);
                  }}
                  className="flex-1 min-w-[120px] px-4 py-2.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition-all duration-200 font-medium"
                >
                  <FaEdit className="inline mr-2" /> Edit Case
                </button>
              )}
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 min-w-[120px] px-4 py-2.5 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const cardClass = isNew ? 'glow-card-new' : 'glow-card';

  return (
    <>
      <div className={`${cardClass} relative`}>
        {/* NEW Badge */}
        {isNew && (
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 tracking-wider animate-pulse">
              ✨ NEW
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-16 z-10 text-gray-500 hover:text-yellow-400 transition-colors"
        >
          {isFavorite ? <FaStar className="text-yellow-400 text-xs" /> : <FaRegStar className="text-xs" />}
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 pr-20">
            <h3 className="font-semibold text-white text-base leading-tight truncate hover:text-blue-300 transition-colors">
              {caseItem.title || 'Untitled Case'}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-gray-500 font-mono">#{caseItem.id?.slice(0, 8) || 'N/A'}</span>
              <span className="text-xs px-2 py-0.5 bg-[rgba(255,255,255,0.05)] rounded-full text-gray-400 border border-[rgba(255,255,255,0.05)]">
                <FaBriefcase className="inline text-[8px] mr-1" />
                {caseItem.caseType || 'General'}
              </span>
              <span className="text-xs px-2 py-0.5 bg-[rgba(79,70,229,0.1)] rounded-full text-[#818cf8] border border-[rgba(79,70,229,0.1)]">
                👤 {caseItem.assignedTo || 'Unassigned'}
              </span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(caseItem.status)} flex-shrink-0 ml-3`}>
            {getStatusIcon(caseItem.status)} {caseItem.status?.charAt(0).toUpperCase() + caseItem.status?.slice(1) || 'Pending'}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2 mb-3 leading-relaxed hover:text-gray-300 transition-colors">
          {caseItem.description || 'No description provided.'}
        </p>

        {/* Info Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {caseItem.priority && (
            <div className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${getPriorityStyle(caseItem.priority)}`}>
              {getPriorityIcon(caseItem.priority)} {caseItem.priority}
            </div>
          )}
          {caseItem.documents && (
            <div className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.03)] text-gray-400 border border-[rgba(255,255,255,0.05)]">
              <FaPaperclip className="text-[10px]" /> {caseItem.documents}
            </div>
          )}
          {caseItem.amount && caseItem.amount !== 'N/A' && (
            <div className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-[rgba(16,185,129,0.1)] text-emerald-400 border border-[rgba(16,185,129,0.1)]">
              <FaDollarSign className="text-[10px]" /> {caseItem.amount}
            </div>
          )}
          {caseItem.nextHearing && (
            <div className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-[rgba(79,70,229,0.1)] text-[#818cf8] border border-[rgba(79,70,229,0.1)]">
              <FaCalendarCheck className="text-[10px]" /> {formatDate(caseItem.nextHearing)}
            </div>
          )}
        </div>

        {/* Party Information */}
        <div className="flex items-center gap-2.5 p-2.5 bg-[rgba(255,255,255,0.03)] rounded-lg mb-3 border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.06)] transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-lg shadow-[#4f46e5]/25">
            {getInitials(caseItem.party)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium">Parties</p>
            <p className="text-sm text-gray-300 truncate">{caseItem.party || 'N/A'}</p>
          </div>
          <FaUserFriends className="text-gray-600 text-xs flex-shrink-0" />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-[10px]" />
              {formatDate(caseItem.date)}
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1">
              <FaFilePdf className="text-[10px]" />
              {caseItem.documents || 0} docs
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleViewClick}
              className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-[rgba(79,70,229,0.15)] rounded-lg transition-all duration-200 group"
              title="View Details"
            >
              <FaEye className="text-sm group-hover:scale-110 transition-transform" />
            </button>

            {isNew && (
              <>
                <button
                  onClick={() => onEdit && onEdit(caseItem)}
                  className="p-1.5 text-yellow-400 hover:text-yellow-300 hover:bg-[rgba(234,179,8,0.15)] rounded-lg transition-all duration-200"
                  title="Edit Case"
                >
                  <FaEdit className="text-sm" />
                </button>
                <button
                  onClick={() => onDelete && onDelete(caseItem.id)}
                  className="p-1.5 text-red-400 hover:text-red-300 hover:bg-[rgba(239,68,68,0.15)] rounded-lg transition-all duration-200"
                  title="Delete Case"
                >
                  <FaTrash className="text-sm" />
                </button>
              </>
            )}

            {caseItem.status !== 'closed' && onStatusChange && (
              <button
                onClick={() => onStatusChange(caseItem.id, 'closed')}
                className="p-1.5 text-emerald-400 hover:text-emerald-300 hover:bg-[rgba(16,185,129,0.15)] rounded-lg transition-all duration-200"
                title="Close Case"
              >
                <FaGavel className="text-sm" />
              </button>
            )}
          </div>
        </div>
      </div>

      <ViewModal />
    </>
  );
};

export default CaseCard;