import React, { useState } from 'react';
import { 
  FaTimes, 
  FaCalendarAlt, 
  FaUser, 
  FaGavel, 
  FaFileAlt,
  FaUserFriends,
  FaMapMarkerAlt,
  FaBuilding,
  FaClock,
  FaFilePdf,
  FaCalendarCheck,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaBookOpen,
  FaClipboardList,
  FaTag,
  FaFileInvoice,
  FaChevronDown,
  FaChevronRight,
  FaDownload,
  FaEye,
  FaUniversity,
  FaLandmark,
  FaFolderOpen,
  FaEdit
} from 'react-icons/fa';
import { GiScales } from 'react-icons/gi';
import ProceedingPage from '../../pages/ProceedingPage';

const CaseDetailModal = ({ 
  isOpen, 
  case: caseItem, 
  onClose, 
  onStatusChange, 
  onEdit 
}) => {
  // ============================================
  // DEBUG - Log what's being received
  // ============================================
  console.log('🔍🔍🔍 CaseDetailModal PROPS:');
  console.log('  isOpen:', isOpen);
  console.log('  caseItem ID:', caseItem?.id);
  console.log('  onEdit type:', typeof onEdit);
  console.log('  onEdit is function?', typeof onEdit === 'function');
  console.log('  onEdit value:', onEdit);
  // ============================================

  const [expandedSection, setExpandedSection] = useState(null);
  const [showProceeding, setShowProceeding] = useState(false);

  if (!isOpen || !caseItem) return null;

  const statusConfig = {
    active: {
      badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
      icon: FaClock,
      label: 'Active',
    },
    pending: {
      badge: 'bg-amber-100 text-amber-700 border-amber-200',
      dot: 'bg-amber-500',
      icon: FaExclamationTriangle,
      label: 'Pending',
    },
    closed: {
      badge: 'bg-gray-100 text-gray-600 border-gray-200',
      dot: 'bg-gray-500',
      icon: FaCheckCircle,
      label: 'Closed',
    },
  };

  const getCaseTypeLabel = (type) => {
    const types = {
      civil: 'Civil',
      labour: 'Labour',
      service: 'Service',
      tax: 'Tax',
    };
    return types[type] || type || 'N/A';
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const status = caseItem.status || 'pending';
  const statusInfo = statusConfig[status] || statusConfig.pending;
  const StatusIcon = statusInfo.icon;

  const documents = caseItem.documents || {};
  const petitionerDocs = documents.petitioner || [];
  const researchDocs = documents.research || [];
  const defendantDocs = documents.defendant || [];
  const hasInstituteData = caseItem.instituteDate || caseItem.instituteNo;

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // ============================================
  // Handle Edit Button Click
  // ============================================
  const handleEditClick = () => {
    console.log('📝 Edit button clicked!');
    console.log('📝 onEdit type:', typeof onEdit);
    console.log('📝 onEdit is function?', typeof onEdit === 'function');
    console.log('📝 window.__editCase exists?', typeof window.__editCase === 'function');
    
    // Try onEdit first
    if (typeof onEdit === 'function') {
      console.log('✅ Using onEdit prop');
      onClose();
      onEdit(caseItem);
      return;
    }
    
    // Try window.__editCase fallback
    if (typeof window.__editCase === 'function') {
      console.log('✅ Using window.__editCase fallback');
      onClose();
      window.__editCase(caseItem);
      return;
    }
    
    // If nothing works, show detailed error
    console.error('❌ No edit function available!');
    console.error('❌ onEdit type:', typeof onEdit);
    console.error('❌ onEdit value:', onEdit);
    console.error('❌ window.__editCase type:', typeof window.__editCase);
    
    alert(
      'Edit function is not available.\n\n' +
      'Please check the console for details.\n\n' +
      `onEdit type: ${typeof onEdit}\n` +
      `window.__editCase type: ${typeof window.__editCase}`
    );
  };

  const DocumentSection = ({ title, docs, icon: Icon, color }) => {
    const isExpanded = expandedSection === title;
    const hasDocs = docs && docs.length > 0;

    return (
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <button
          onClick={() => toggleSection(title)}
          className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-${color}-50`}>
              <Icon className={`text-${color}-600`} />
            </div>
            <span className="font-medium text-gray-800">{title}</span>
            {hasDocs && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-medium">
                {docs.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!hasDocs && <span className="text-xs text-gray-400">No documents</span>}
            {isExpanded ? <FaChevronDown className="text-gray-400" /> : <FaChevronRight className="text-gray-400" />}
          </div>
        </button>
        
        {isExpanded && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            {hasDocs ? (
              <div className="space-y-2">
                {docs.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 group shadow-sm hover:shadow">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-red-50 rounded-lg">
                        <FaFilePdf className="text-red-500" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{doc}</span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => alert(`📄 Viewing: ${doc}`)}>
                        <FaEye className="text-sm" />
                      </button>
                      <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" onClick={() => alert(`⬇️ Downloading: ${doc}`)}>
                        <FaDownload className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm">
                <FaFileAlt className="mx-auto text-4xl mb-3 text-gray-300" />
                <p>No documents uploaded</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center">
        <div className="w-screen h-screen bg-white overflow-hidden flex flex-col">
          
          {/* HEADER - With Single Edit Button */}
          <div className="w-full px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0">
            <div className="relative w-full">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 -mt-4"></div>
            </div>
            
            <div className="flex items-start justify-between w-full">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <GiScales className="text-white text-xl" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight truncate">
                    {caseItem.caseTitle || caseItem.title || 'Untitled Case'}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      #{caseItem.id}
                    </span>
                    {caseItem.caseNumber && (
                      <span className="text-xs px-3 py-1 bg-blue-50 rounded-full text-blue-700 border border-blue-200 font-mono flex items-center gap-1">
                        <FaBookOpen className="text-[10px]" />
                        {caseItem.caseNumber}
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.badge} flex items-center gap-1.5`}>
                      <StatusIcon className="text-xs" />
                      {statusInfo.label}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons - ONLY ONE Edit Button Here */}
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                {/* ONLY ONE Edit Button - In Header */}
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 hover:shadow-lg hover:shadow-amber-500/20"
                >
                  <FaEdit className="text-sm" />
                  <span>Edit Case</span>
                </button>
                
                {/* Proceeding Button */}
                <button
                  onClick={() => setShowProceeding(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                >
                  <FaFolderOpen className="text-sm" />
                  <span>Proceeding</span>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                    {petitionerDocs.length + researchDocs.length + defendantDocs.length}
                  </span>
                </button>
                
                {/* Close Button */}
                <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200">
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex-1 w-full overflow-y-auto scrollbar-hide bg-gray-50/50 p-6">
            <div className="space-y-5 max-w-full">
              
              {/* ROW 1: CASE NO. & CASE TITLE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm w-full">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                      <FaBookOpen className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Case No.</p>
                      <p className="text-base font-semibold text-gray-800 truncate">{caseItem.caseNumber || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm w-full">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg flex-shrink-0">
                      <FaFileAlt className="text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Case Title</p>
                      <p className="text-base font-semibold text-gray-800 truncate">{caseItem.caseTitle || caseItem.title || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 2: JUDICIARY */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm w-full">
                <div className="flex items-center gap-3 mb-3 pb-2 border-b border-gray-100">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FaUniversity className="text-blue-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Judiciary</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 w-full">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">CMS No.</p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">{caseItem.judiciary?.cmsNo || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 w-full">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Court No.</p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">{caseItem.judiciary?.courtNo || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* ROW 3: CASE TYPE & CASE NATURE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm w-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <FaTag className="text-purple-600" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Case Type</h3>
                  </div>
                  <div className="bg-purple-50/50 rounded-lg border border-purple-200 p-3 text-center w-full">
                    <p className="text-base font-bold text-purple-700">{getCaseTypeLabel(caseItem.caseType)}</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm w-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <FaClipboardList className="text-amber-600" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Case Nature</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 text-center w-full">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Trial</p>
                      <p className="text-sm font-semibold text-gray-800 mt-1">{caseItem.caseNature?.trial || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 text-center w-full">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Appeal</p>
                      <p className="text-sm font-semibold text-gray-800 mt-1">{caseItem.caseNature?.appeal || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 4: COURT DETAILS */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm w-full">
                <div className="flex items-center gap-3 mb-3 pb-2 border-b border-gray-100">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FaLandmark className="text-blue-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Court Details</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                  <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 text-center w-full">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Court Name</p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">{caseItem.courtDetails?.courtName || caseItem.court || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 text-center w-full">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">District</p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">{caseItem.courtDetails?.district || caseItem.location || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 text-center w-full">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Previous Date</p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">{caseItem.courtDetails?.previousDate ? formatDate(caseItem.courtDetails.previousDate) : 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 text-center w-full relative">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Next Date</p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">{caseItem.courtDetails?.nextDate ? formatDate(caseItem.courtDetails.nextDate) : 'N/A'}</p>
                    {caseItem.courtDetails?.nextDate && (
                      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[8px] rounded-full">Upcoming</span>
                    )}
                  </div>
                </div>
              </div>

              {/* ROW 5: REMARKS */}
              {caseItem.remarks && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <FaInfoCircle className="text-amber-600" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Remarks</h3>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{caseItem.remarks}</p>
                </div>
              )}

              {/* ROW 6: INSTITUTE DETAILS */}
              {hasInstituteData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm w-full">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-cyan-50 rounded-lg flex-shrink-0">
                        <FaCalendarCheck className="text-cyan-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Institute Date</p>
                        <p className="text-base font-semibold text-gray-800 truncate">{caseItem.instituteDate ? formatDate(caseItem.instituteDate) : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm w-full">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-rose-50 rounded-lg flex-shrink-0">
                        <FaFileInvoice className="text-rose-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Institute No.</p>
                        <p className="text-base font-semibold text-gray-800 truncate">{caseItem.instituteNo || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ROW 7: ASSOCIATE */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm w-full">
                <div className="flex items-center gap-3 mb-3 pb-2 border-b border-gray-100">
                  <div className="p-2 bg-teal-50 rounded-lg">
                    <FaUserFriends className="text-teal-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Associate</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 w-full">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Name</p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">{caseItem.associate?.name || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 w-full">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">District</p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">{caseItem.associate?.district || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* ROW 8: ACTIONS - NO EDIT BUTTON HERE! */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 w-full">
                {caseItem.status !== 'closed' && onStatusChange && (
                  <button
                    onClick={() => { onStatusChange(caseItem.id, 'closed'); onClose(); }}
                    className="flex-1 min-w-[120px] px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
                  >
                    <FaGavel className="inline mr-2" /> Close Case
                  </button>
                )}
                {/* REMOVED: Edit Button - Only Close button remains */}
                <button onClick={onClose} className="flex-1 min-w-[120px] px-5 py-2.5 bg-gray-100 text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proceeding Page */}
      <ProceedingPage 
        isOpen={showProceeding}
        onClose={() => setShowProceeding(false)}
        caseItem={caseItem}
      />
    </>
  );
};

export default CaseDetailModal;