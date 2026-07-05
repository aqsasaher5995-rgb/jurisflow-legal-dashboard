import React, { useState } from 'react';
import { 
  FaUser, FaEnvelope, FaPhone, FaBuilding, 
  FaCalendarAlt, FaCheckCircle, FaClock,
  FaSearch, FaPlusCircle, FaEdit, FaTrash,
  FaUsers, FaFileAlt, FaEye, FaTimes,
  FaSave, FaMapMarkerAlt, FaBriefcase, FaChevronDown,
  FaChevronUp, FaGavel, FaBalanceScale, FaFileContract,
  FaHome, FaCar, FaHeartbeat, FaBuilding as FaBuildingIcon,
  FaShieldAlt, FaHandshake, FaUserGraduate,
  FaHourglassHalf, FaBan,
  FaClipboardList, FaArrowLeft, FaExternalLinkAlt,
  FaFolderOpen, FaFilePdf, FaPrint, FaShareAlt,
  FaPlus, FaFile, FaCalendarPlus, FaUserPlus,
  FaExclamationTriangle
} from 'react-icons/fa';

const ClientsList = ({ clients, onAddClient, onEditClient, onDeleteClient }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showCaseDetail, setShowCaseDetail] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [showEditCase, setShowEditCase] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    status: 'active',
  });
  const [caseFormData, setCaseFormData] = useState({
    title: '',
    caseNumber: '',
    status: 'active',
    type: 'Civil Litigation',
    amount: '',
    description: '',
    priority: 'Medium',
    parties: '',
    jurisdiction: 'State Court',
    judge: '',
    lawFirm: '',
    outcome: 'Pending',
    hearings: 0,
    documents: 0,
    filed: '',
    nextHearing: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast notification
  const showToastMessage = (message, type = 'success') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  // Define all cases with detailed information
  const allCases = [
    { 
      id: 1, 
      title: 'Smith v. Johnson', 
      caseNumber: 'CIV-2026-001', 
      status: 'active', 
      amount: '$250,000', 
      type: 'Civil Litigation',
      typeIcon: FaBalanceScale,
      description: 'Contract dispute over property sale agreement. The plaintiff alleges breach of contract and seeks damages.',
      parties: 'Plaintiff: Smith | Defendant: Johnson',
      hearings: 3,
      documents: 6,
      filed: '2026-01-15',
      nextHearing: '2026-03-20',
      priority: 'High',
      jurisdiction: 'Federal Court',
      judge: 'Hon. Sarah Johnson',
      lawFirm: 'Smith & Associates',
      outcome: 'Pending'
    },
    { 
      id: 2, 
      title: 'State v. Williams', 
      caseNumber: 'CRIM-2026-002', 
      status: 'pending', 
      amount: 'N/A', 
      type: 'Criminal Defense',
      typeIcon: FaShieldAlt,
      description: 'Criminal case regarding possession of illegal substances. The defendant is charged with felony possession with intent to distribute.',
      parties: 'State: California | Defendant: Williams',
      hearings: 2,
      documents: 3,
      filed: '2026-01-20',
      nextHearing: '2026-04-15',
      priority: 'Urgent',
      jurisdiction: 'State Court',
      judge: 'Hon. Robert Davis',
      lawFirm: 'Public Defender Office',
      outcome: 'Pending'
    },
    { 
      id: 3, 
      title: 'Brown v. City of LA', 
      caseNumber: 'CIV-2026-003', 
      status: 'active', 
      amount: '$500,000', 
      type: 'Civil Rights',
      typeIcon: FaHandshake,
      description: 'Civil rights violation claim against city officials. The plaintiff alleges discrimination and unlawful arrest during a peaceful protest.',
      parties: 'Plaintiff: Brown | Defendant: City of LA',
      hearings: 5,
      documents: 8,
      filed: '2026-01-10',
      nextHearing: '2026-02-28',
      priority: 'High',
      jurisdiction: 'Federal Court',
      judge: 'Hon. Maria Garcia',
      lawFirm: 'Civil Rights Law Group',
      outcome: 'Pending'
    },
    { 
      id: 4, 
      title: 'Estate of Davis v. Davis', 
      caseNumber: 'FAM-2026-004', 
      status: 'pending', 
      amount: '$1,200,000', 
      type: 'Family Law',
      typeIcon: FaHome,
      description: 'Family law dispute over inheritance distribution among siblings. Multiple parties involved in complex estate matter with contested will.',
      parties: 'Estate: Davis | Defendant: Davis Family',
      hearings: 3,
      documents: 12,
      filed: '2026-01-05',
      nextHearing: '2026-03-10',
      priority: 'Medium',
      jurisdiction: 'State Court',
      judge: 'Hon. Patricia Wilson',
      lawFirm: 'Estate Law Partners',
      outcome: 'Pending'
    },
    { 
      id: 5, 
      title: 'Wilson v. Martinez', 
      caseNumber: 'PI-2026-005', 
      status: 'active', 
      amount: '$350,000', 
      type: 'Personal Injury',
      typeIcon: FaCar,
      description: 'Personal injury claim from auto accident. The plaintiff seeks compensation for medical expenses, lost wages, and pain and suffering.',
      parties: 'Plaintiff: Martinez | Defendant: Wilson',
      hearings: 2,
      documents: 5,
      filed: '2026-01-25',
      nextHearing: '2026-04-01',
      priority: 'High',
      jurisdiction: 'State Court',
      judge: 'Hon. James Thompson',
      lawFirm: 'Injury Law Center',
      outcome: 'Pending'
    },
    { 
      id: 6, 
      title: 'In re Adoption of Thompson', 
      caseNumber: 'FAM-2026-006', 
      status: 'closed', 
      amount: '$75,000', 
      type: 'Family Law',
      typeIcon: FaUserGraduate,
      description: 'Adoption proceeding for minor child. The petitioners seek to finalize adoption and establish legal guardianship with all rights.',
      parties: 'Petitioners: Thompson Family | Child: Minor',
      hearings: 2,
      documents: 4,
      filed: '2025-12-01',
      nextHearing: 'Completed',
      priority: 'Low',
      jurisdiction: 'State Court',
      judge: 'Hon. Linda Martinez',
      lawFirm: 'Family Law Associates',
      outcome: 'Adoption Granted'
    },
    { 
      id: 7, 
      title: 'TechCorp v. Innovate LLC', 
      caseNumber: 'CORP-2026-007', 
      status: 'active', 
      amount: '$2,500,000', 
      type: 'Corporate Law',
      typeIcon: FaBuildingIcon,
      description: 'Shareholder dispute regarding corporate governance and fiduciary duties. Multiple parties involved in complex business litigation.',
      parties: 'Plaintiff: TechCorp | Defendant: Innovate LLC',
      hearings: 4,
      documents: 15,
      filed: '2026-01-08',
      nextHearing: '2026-03-15',
      priority: 'High',
      jurisdiction: 'Federal Court',
      judge: 'Hon. Richard Chen',
      lawFirm: 'Corporate Legal Solutions',
      outcome: 'Pending'
    },
    { 
      id: 8, 
      title: 'Healthcare v. Insurance Co.', 
      caseNumber: 'HTH-2026-008', 
      status: 'pending', 
      amount: '$750,000', 
      type: 'Healthcare',
      typeIcon: FaHeartbeat,
      description: 'Medical malpractice claim against healthcare provider. The plaintiff alleges negligence in treatment and care resulting in injury.',
      parties: 'Plaintiff: Patient | Defendant: Hospital',
      hearings: 1,
      documents: 7,
      filed: '2026-02-01',
      nextHearing: '2026-05-10',
      priority: 'Urgent',
      jurisdiction: 'State Court',
      judge: 'Hon. Daniel Kim',
      lawFirm: 'Medical Law Group',
      outcome: 'Pending'
    },
    { 
      id: 9, 
      title: 'Greenfield v. Developer', 
      caseNumber: 'REAL-2026-009', 
      status: 'active', 
      amount: '$1,800,000', 
      type: 'Real Estate',
      typeIcon: FaBuilding,
      description: 'Real estate development dispute over zoning violations and property damage claims from construction and environmental issues.',
      parties: 'Plaintiff: Residents | Defendant: Developer',
      hearings: 3,
      documents: 9,
      filed: '2026-01-18',
      nextHearing: '2026-03-25',
      priority: 'Medium',
      jurisdiction: 'State Court',
      judge: 'Hon. Thomas Park',
      lawFirm: 'Real Estate Law Partners',
      outcome: 'Pending'
    },
    { 
      id: 10, 
      title: 'Employee v. Corporation', 
      caseNumber: 'EMP-2026-010', 
      status: 'closed', 
      amount: '$450,000', 
      type: 'Employment Law',
      typeIcon: FaHandshake,
      description: 'Wrongful termination and discrimination claim. Settlement reached before trial with confidentiality agreement and non-disparagement clause.',
      parties: 'Plaintiff: Former Employee | Defendant: Corporation',
      hearings: 2,
      documents: 6,
      filed: '2025-11-15',
      nextHearing: 'Completed',
      priority: 'Low',
      jurisdiction: 'Federal Court',
      judge: 'Hon. Angela White',
      lawFirm: 'Employment Law Group',
      outcome: 'Settled'
    },
    { 
      id: 11, 
      title: 'Estate Planning of Johnson', 
      caseNumber: 'EST-2026-011', 
      status: 'pending', 
      amount: '$950,000', 
      type: 'Estate Planning',
      typeIcon: FaClipboardList,
      description: 'Complex estate planning matter involving trust administration and tax planning for high-net-worth individual with international assets.',
      parties: 'Estate: Johnson | Beneficiaries: Family Trust',
      hearings: 1,
      documents: 10,
      filed: '2026-02-10',
      nextHearing: '2026-06-01',
      priority: 'Medium',
      jurisdiction: 'State Court',
      judge: 'Hon. Katherine Lee',
      lawFirm: 'Estate Planning Group',
      outcome: 'Pending'
    },
    { 
      id: 12, 
      title: 'Construction Co. v. Developer', 
      caseNumber: 'CON-2026-012', 
      status: 'active', 
      amount: '$3,200,000', 
      type: 'Construction Law',
      typeIcon: FaBuildingIcon,
      description: 'Construction defect lawsuit involving commercial building project. Multiple subcontractors and design issues with structural concerns.',
      parties: 'Plaintiff: Construction Co. | Defendant: Developer',
      hearings: 6,
      documents: 20,
      filed: '2025-12-20',
      nextHearing: '2026-04-20',
      priority: 'High',
      jurisdiction: 'State Court',
      judge: 'Hon. Michael Brown',
      lawFirm: 'Construction Law Center',
      outcome: 'Pending'
    }
  ];

  // Get cases for a specific client
  const getClientCases = (clientId) => {
    const idNum = parseInt(clientId.toString().replace(/\D/g, '')) || 1;
    const startIdx = idNum % allCases.length;
    const count = 2 + (idNum % 3);
    
    const assignedCases = [];
    for (let i = 0; i < count && i < allCases.length; i++) {
      const idx = (startIdx + i) % allCases.length;
      assignedCases.push({ 
        ...allCases[idx], 
        id: `${allCases[idx].id}-${clientId}` 
      });
    }
    return assignedCases;
  };

  const filteredClients = clients.filter(client =>
    client.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ============================================
  // STATUS STYLES - DEEP CURRENT THEME
  // ============================================
  
  const getStatusStyle = (status) => {
    const styles = {
      active: 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20',
      pending: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
      inactive: 'bg-[#9CA3AF]/10 text-[#6B7280] border-[#9CA3AF]/20',
      closed: 'bg-[#9CA3AF]/10 text-[#6B7280] border-[#9CA3AF]/20',
    };
    return styles[status] || styles.active;
  };

  const getStatusDot = (status) => {
    const dots = {
      active: 'bg-[#22C55E]',
      pending: 'bg-[#F59E0B]',
      inactive: 'bg-[#9CA3AF]',
      closed: 'bg-[#9CA3AF]',
    };
    return dots[status] || dots.active;
  };

  const getCaseStatusStyle = (status) => {
    const styles = {
      active: 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20',
      pending: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
      closed: 'bg-[#9CA3AF]/10 text-[#6B7280] border-[#9CA3AF]/20',
    };
    return styles[status] || styles.pending;
  };

  const getPriorityStyle = (priority) => {
    const styles = {
      High: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
      Urgent: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
      Medium: 'bg-[#3282B8]/10 text-[#0F4C75] border-[#3282B8]/20',
      Low: 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20',
    };
    return styles[priority] || styles.Medium;
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: <FaCheckCircle className="text-[#22C55E]" />,
      pending: <FaHourglassHalf className="text-[#F59E0B]" />,
      closed: <FaBan className="text-[#6B7280]" />,
    };
    return icons[status] || icons.pending;
  };

  const handleCaseClick = (caseItem) => {
    setSelectedCase(caseItem);
    setShowCaseDetail(true);
    setIsDropdownOpen(false);
  };

  const handleEditCaseClick = (caseItem) => {
    setEditingCase(caseItem);
    setCaseFormData({
      title: caseItem.title || '',
      caseNumber: caseItem.caseNumber || '',
      status: caseItem.status || 'active',
      type: caseItem.type || 'Civil Litigation',
      amount: caseItem.amount || '',
      description: caseItem.description || '',
      priority: caseItem.priority || 'Medium',
      parties: caseItem.parties || '',
      jurisdiction: caseItem.jurisdiction || 'State Court',
      judge: caseItem.judge || '',
      lawFirm: caseItem.lawFirm || '',
      outcome: caseItem.outcome || 'Pending',
      hearings: caseItem.hearings || 0,
      documents: caseItem.documents || 0,
      filed: caseItem.filed || '',
      nextHearing: caseItem.nextHearing || '',
    });
    setShowEditCase(true);
    setIsDropdownOpen(false);
  };

  const handleDeleteCase = (caseId) => {
    setDeleteTarget(caseId);
    setShowDeleteConfirm(true);
    setIsDropdownOpen(false);
  };

  const confirmDeleteCase = () => {
    showToastMessage(`🗑️ Case ${deleteTarget} deleted successfully!`, 'success');
    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  // Working button handlers
  const handleViewDocuments = () => {
    showToastMessage('📄 Opening documents folder...', 'info');
  };

  const handleScheduleHearing = () => {
    showToastMessage('📅 Opening hearing scheduler...', 'info');
  };

  const handleAddParty = () => {
    showToastMessage('👤 Opening add party form...', 'info');
  };

  const handlePrintCase = () => {
    showToastMessage('🖨️ Printing case details...', 'info');
  };

  const handleAddNote = () => {
    showToastMessage('📝 Adding new note...', 'info');
  };

  const handleShareCase = () => {
    showToastMessage('📤 Sharing case...', 'info');
  };

  const handleSaveCaseEdit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      showToastMessage('✅ Case updated successfully!', 'success');
      setIsSubmitting(false);
      setShowEditCase(false);
      setEditingCase(null);
    }, 1000);
  };

  // Toast Component
  const Toast = () => {
    if (!showToast) return null;
    const bgColor = showToast.type === 'success' ? 'bg-[#22C55E]' : 
                    showToast.type === 'error' ? 'bg-[#EF4444]' : 'bg-[#0F4C75]';
    return (
      <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg animate-in slide-down duration-300`}>
        {showToast.message}
      </div>
    );
  };

  // ============================================
  // COLORFUL DELETE CONFIRMATION MODAL
  // ============================================
  const DeleteConfirmModal = () => {
    if (!showDeleteConfirm) return null;
    return (
      <div className="fixed inset-0 bg-[#1B262C]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border-2 border-[#EF4444] overflow-hidden animate-in fade-in zoom-in duration-300">
          {/* Colorful Header */}
          <div className="bg-gradient-to-r from-[#EF4444] via-[#DC2626] to-[#B91C1C] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                <FaExclamationTriangle className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Delete Client</h3>
                <p className="text-white/70 text-sm">This action cannot be undone</p>
              </div>
            </div>
          </div>
          
          {/* Body */}
          <div className="p-6">
            <div className="bg-red-50 rounded-xl p-4 border border-red-200 mb-4">
              <p className="text-sm text-red-700 flex items-start gap-2">
                <span className="text-red-500 text-lg">⚠️</span>
                <span>Are you sure you want to delete <strong className="text-red-800">{selectedClient?.name}</strong>? All associated data will be permanently removed.</span>
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-[#F0F4F8] text-[#1B262C] border border-[#BBE1FA] rounded-xl hover:bg-[#BBE1FA] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedClient) {
                    handleDeleteClient(selectedClient.id);
                    setShowDeleteConfirm(false);
                  }
                }}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white rounded-xl hover:shadow-lg hover:shadow-[#EF4444]/40 transition-all font-medium flex items-center justify-center gap-2"
              >
                <FaTrash className="text-sm" /> Delete Client
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // CASE DETAIL - FULL SCREEN
  // ============================================
  const CaseDetailPage = () => {
    if (!selectedCase || !showCaseDetail) return null;
    
    const TypeIcon = selectedCase.typeIcon || FaFileContract;

    return (
      <div className="fixed inset-0 bg-[#F0F4F8] z-50 overflow-y-auto">
        <div className="w-full min-h-screen p-6">
          <button
            onClick={() => {
              setShowCaseDetail(false);
              setSelectedCase(null);
            }}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#0F4C75] transition-colors mb-6 group"
          >
            <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
            Back to Clients
          </button>

          <div className="bg-white rounded-2xl shadow-premium-lg border border-[#3282B8] overflow-hidden w-full">
            {/* Header */}
            <div className="gradient-accent px-8 py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center border border-white/30">
                    <TypeIcon className="text-white text-2xl" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{selectedCase.title}</h1>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-white/70 text-sm font-mono">#{selectedCase.caseNumber}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCaseStatusStyle(selectedCase.status)}`}>
                        {getStatusIcon(selectedCase.status)} {selectedCase.status}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityStyle(selectedCase.priority)}`}>
                        {selectedCase.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button 
                    onClick={() => {
                      setShowCaseDetail(false);
                      handleEditCaseClick(selectedCase);
                    }}
                    className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-medium flex items-center gap-1"
                  >
                    <FaEdit className="text-xs" /> Edit Case
                  </button>
                  <button 
                    onClick={() => handleDeleteCase(selectedCase.id)}
                    className="px-4 py-2 bg-red-500/20 text-white rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium flex items-center gap-1"
                  >
                    <FaTrash className="text-xs" /> Delete
                  </button>
                  <button 
                    onClick={handleShareCase}
                    className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-medium flex items-center gap-1"
                  >
                    <FaShareAlt className="text-xs" /> Share
                  </button>
                </div>
              </div>
            </div>

            {/* Case Information */}
            <div className="p-8">
              {/* Case Type Banner */}
              <div className="bg-[#3282B8]/10 border border-[#3282B8]/30 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <TypeIcon className="text-[#0F4C75] text-xl" />
                  <div>
                    <p className="text-sm text-[#6B7280]">Case Type</p>
                    <p className="text-lg font-semibold text-[#1B262C]">{selectedCase.type}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#1B262C] mb-2">Case Description</h3>
                <p className="text-[#6B7280] leading-relaxed">{selectedCase.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#F0F4F8] rounded-xl p-4 border border-[#BBE1FA]">
                  <p className="text-xs text-[#6B7280] flex items-center gap-1">
                    <FaUsers className="text-[10px] text-[#0F4C75]" /> Parties
                  </p>
                  <p className="text-sm font-medium text-[#1B262C] mt-1">{selectedCase.parties}</p>
                </div>
                <div className="bg-[#F0F4F8] rounded-xl p-4 border border-[#BBE1FA]">
                  <p className="text-xs text-[#6B7280] flex items-center gap-1">
                    <FaGavel className="text-[10px] text-[#0F4C75]" /> Amount
                  </p>
                  <p className="text-sm font-medium text-[#1B262C] mt-1">{selectedCase.amount}</p>
                </div>
                <div className="bg-[#F0F4F8] rounded-xl p-4 border border-[#BBE1FA]">
                  <p className="text-xs text-[#6B7280] flex items-center gap-1">
                    <FaCalendarAlt className="text-[10px] text-[#0F4C75]" /> Filed
                  </p>
                  <p className="text-sm font-medium text-[#1B262C] mt-1">{new Date(selectedCase.filed).toLocaleDateString()}</p>
                </div>
                <div className="bg-[#F0F4F8] rounded-xl p-4 border border-[#BBE1FA]">
                  <p className="text-xs text-[#6B7280] flex items-center gap-1">
                    <FaBuilding className="text-[10px] text-[#0F4C75]" /> Jurisdiction
                  </p>
                  <p className="text-sm font-medium text-[#1B262C] mt-1">{selectedCase.jurisdiction}</p>
                </div>
                <div className="bg-[#F0F4F8] rounded-xl p-4 border border-[#BBE1FA]">
                  <p className="text-xs text-[#6B7280] flex items-center gap-1">
                    <FaUserGraduate className="text-[10px] text-[#0F4C75]" /> Judge
                  </p>
                  <p className="text-sm font-medium text-[#1B262C] mt-1">{selectedCase.judge}</p>
                </div>
                <div className="bg-[#F0F4F8] rounded-xl p-4 border border-[#BBE1FA]">
                  <p className="text-xs text-[#6B7280] flex items-center gap-1">
                    <FaBriefcase className="text-[10px] text-[#0F4C75]" /> Law Firm
                  </p>
                  <p className="text-sm font-medium text-[#1B262C] mt-1">{selectedCase.lawFirm}</p>
                </div>
              </div>

              {/* Hearings & Documents */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#22C55E]/10 rounded-xl p-4 border border-[#22C55E]/20 text-center cursor-pointer hover:bg-[#22C55E]/20 transition-colors" onClick={() => showToastMessage('📋 Viewing all hearings...', 'info')}>
                  <p className="text-2xl font-bold text-[#22C55E]">{selectedCase.hearings}</p>
                  <p className="text-xs text-[#6B7280]">Hearings</p>
                </div>
                <div className="bg-[#3282B8]/10 rounded-xl p-4 border border-[#3282B8]/30 text-center cursor-pointer hover:bg-[#3282B8]/20 transition-colors" onClick={handleViewDocuments}>
                  <p className="text-2xl font-bold text-[#0F4C75]">{selectedCase.documents}</p>
                  <p className="text-xs text-[#6B7280]">Documents</p>
                </div>
                <div className="bg-[#F59E0B]/10 rounded-xl p-4 border border-[#F59E0B]/20 text-center cursor-pointer hover:bg-[#F59E0B]/20 transition-colors" onClick={handleScheduleHearing}>
                  <p className="text-2xl font-bold text-[#F59E0B]">
                    {selectedCase.nextHearing === 'Completed' ? '✓' : new Date(selectedCase.nextHearing).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-[#6B7280]">Next Hearing</p>
                </div>
                <div className="bg-[#8B5CF6]/10 rounded-xl p-4 border border-[#8B5CF6]/20 text-center">
                  <p className="text-2xl font-bold text-[#8B5CF6]">{selectedCase.outcome}</p>
                  <p className="text-xs text-[#6B7280]">Outcome</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-[#BBE1FA]">
                <button 
                  onClick={handleViewDocuments} 
                  className="flex-1 min-w-[140px] px-4 py-2.5 bg-[#3282B8]/10 text-[#0F4C75] border border-[#3282B8]/30 rounded-lg hover:bg-[#3282B8]/20 hover:border-[#3282B8]/50 transition-all font-medium flex items-center justify-center gap-2"
                >
                  <FaFilePdf className="text-sm text-[#0F4C75]" /> View Documents
                </button>
                <button 
                  onClick={handleScheduleHearing} 
                  className="flex-1 min-w-[140px] px-4 py-2.5 bg-[#3282B8]/10 text-[#0F4C75] border border-[#3282B8]/30 rounded-lg hover:bg-[#3282B8]/20 hover:border-[#3282B8]/50 transition-all font-medium flex items-center justify-center gap-2"
                >
                  <FaCalendarPlus className="text-sm text-[#0F4C75]" /> Schedule Hearing
                </button>
                <button 
                  onClick={handleAddParty} 
                  className="flex-1 min-w-[140px] px-4 py-2.5 bg-[#3282B8]/10 text-[#0F4C75] border border-[#3282B8]/30 rounded-lg hover:bg-[#3282B8]/20 hover:border-[#3282B8]/50 transition-all font-medium flex items-center justify-center gap-2"
                >
                  <FaUserPlus className="text-sm text-[#0F4C75]" /> Add Party
                </button>
                <button 
                  onClick={handleAddNote} 
                  className="flex-1 min-w-[140px] px-4 py-2.5 bg-[#3282B8]/10 text-[#0F4C75] border border-[#3282B8]/30 rounded-lg hover:bg-[#3282B8]/20 hover:border-[#3282B8]/50 transition-all font-medium flex items-center justify-center gap-2"
                >
                  <FaPlus className="text-sm text-[#0F4C75]" /> Add Note
                </button>
                <button 
                  onClick={handlePrintCase} 
                  className="flex-1 min-w-[140px] px-4 py-2.5 bg-[#F0F4F8] text-[#1B262C] border border-[#BBE1FA] rounded-lg hover:bg-[#BBE1FA] transition-all font-medium flex items-center justify-center gap-2"
                >
                  <FaPrint className="text-sm" /> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // EDIT CASE - FULL SCREEN
  // ============================================
  const EditCasePage = () => {
    if (!showEditCase || !editingCase) return null;

    return (
      <div className="fixed inset-0 bg-[#F0F4F8] z-50 overflow-y-auto">
        <div className="w-full min-h-screen p-6">
          <button
            onClick={() => {
              setShowEditCase(false);
              setEditingCase(null);
            }}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#0F4C75] transition-colors mb-6 group"
          >
            <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
            Back to Clients
          </button>

          <div className="bg-white rounded-2xl shadow-premium-lg border border-[#3282B8] overflow-hidden w-full">
            <div className="gradient-accent px-8 py-6">
              <div className="flex items-center gap-3">
                <FaEdit className="text-white text-2xl" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Edit Case</h1>
                  <p className="text-white/70 text-sm">Update case details</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Case Title *</label>
                  <input
                    type="text"
                    value={caseFormData.title}
                    onChange={(e) => setCaseFormData({ ...caseFormData, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Case Number *</label>
                  <input
                    type="text"
                    value={caseFormData.caseNumber}
                    onChange={(e) => setCaseFormData({ ...caseFormData, caseNumber: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Case Type</label>
                  <select
                    value={caseFormData.type}
                    onChange={(e) => setCaseFormData({ ...caseFormData, type: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  >
                    <option value="Civil Litigation">Civil Litigation</option>
                    <option value="Criminal Defense">Criminal Defense</option>
                    <option value="Civil Rights">Civil Rights</option>
                    <option value="Family Law">Family Law</option>
                    <option value="Personal Injury">Personal Injury</option>
                    <option value="Corporate Law">Corporate Law</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Employment Law">Employment Law</option>
                    <option value="Estate Planning">Estate Planning</option>
                    <option value="Construction Law">Construction Law</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Status</label>
                  <select
                    value={caseFormData.status}
                    onChange={(e) => setCaseFormData({ ...caseFormData, status: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Amount</label>
                  <input
                    type="text"
                    value={caseFormData.amount}
                    onChange={(e) => setCaseFormData({ ...caseFormData, amount: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                    placeholder="$0,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Priority</label>
                  <select
                    value={caseFormData.priority}
                    onChange={(e) => setCaseFormData({ ...caseFormData, priority: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Description</label>
                  <textarea
                    value={caseFormData.description}
                    onChange={(e) => setCaseFormData({ ...caseFormData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Parties</label>
                  <input
                    type="text"
                    value={caseFormData.parties}
                    onChange={(e) => setCaseFormData({ ...caseFormData, parties: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Jurisdiction</label>
                  <input
                    type="text"
                    value={caseFormData.jurisdiction}
                    onChange={(e) => setCaseFormData({ ...caseFormData, jurisdiction: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Judge</label>
                  <input
                    type="text"
                    value={caseFormData.judge}
                    onChange={(e) => setCaseFormData({ ...caseFormData, judge: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Law Firm</label>
                  <input
                    type="text"
                    value={caseFormData.lawFirm}
                    onChange={(e) => setCaseFormData({ ...caseFormData, lawFirm: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Outcome</label>
                  <input
                    type="text"
                    value={caseFormData.outcome}
                    onChange={(e) => setCaseFormData({ ...caseFormData, outcome: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Hearings</label>
                  <input
                    type="number"
                    value={caseFormData.hearings}
                    onChange={(e) => setCaseFormData({ ...caseFormData, hearings: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Documents</label>
                  <input
                    type="number"
                    value={caseFormData.documents}
                    onChange={(e) => setCaseFormData({ ...caseFormData, documents: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Filed Date</label>
                  <input
                    type="date"
                    value={caseFormData.filed}
                    onChange={(e) => setCaseFormData({ ...caseFormData, filed: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Next Hearing</label>
                  <input
                    type="text"
                    value={caseFormData.nextHearing}
                    onChange={(e) => setCaseFormData({ ...caseFormData, nextHearing: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                    placeholder="Date or 'Completed'"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#BBE1FA] mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditCase(false);
                    setEditingCase(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-[#F0F4F8] text-[#1B262C] rounded-lg hover:bg-[#BBE1FA] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveCaseEdit}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 btn-primary font-medium disabled:opacity-50"
                >
                  <FaSave className="inline mr-2" /> {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // EDIT CLIENT - FULL SCREEN
  // ============================================
  const EditClientModal = () => {
    if (!showEditModal || !selectedClient) return null;
    const clientCases = getClientCases(selectedClient.id);

    return (
      <div className="fixed inset-0 bg-[#F0F4F8] z-50 overflow-y-auto">
        <div className="w-full min-h-screen">
          
          {/* Header - Sticky */}
          <div className="w-full px-6 py-4 border-b border-[#BBE1FA]/40 bg-white flex-shrink-0 relative sticky top-0 z-10">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B262C] via-[#0F4C75] to-[#3282B8]"></div>
            
            <div className="flex items-center justify-between w-full pt-1">
              <div className="flex items-center gap-4">
                <div className="p-2.5 gradient-accent rounded-xl shadow-lg shadow-[#0F4C75]/25">
                  <FaEdit className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1B262C]">Edit Client</h2>
                  <p className="text-sm text-[#6B7280]">Update client details and manage cases</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedClient(null);
                  setIsDropdownOpen(false);
                }}
                className="p-2 text-[#9CA3AF] hover:text-[#1B262C] hover:bg-[#3282B8]/10 rounded-xl transition-all duration-200"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          {/* Content - Full Width */}
          <div className="w-full p-6">
            <form onSubmit={handleEditClient} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1.5">
                    Full Name <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1.5">
                    Email <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Cases Section - Full Width */}
              <div className="border-t border-[#BBE1FA] pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FaGavel className="text-[#0F4C75]" />
                    <h4 className="text-lg font-semibold text-[#1B262C]">Assigned Cases</h4>
                    <span className="px-2 py-0.5 gradient-accent text-white rounded-full text-xs font-medium">
                      {clientCases.length}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-sm text-[#1B262C] hover:bg-[#3282B8]/10 transition-colors flex items-center gap-2"
                  >
                    {isDropdownOpen ? 'Hide Cases' : 'Show Cases'}
                    <FaChevronDown className={`text-[#9CA3AF] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {isDropdownOpen && (
                  <div className="w-full bg-white border border-[#3282B8] rounded-xl shadow-premium-lg overflow-hidden">
                    {clientCases.length > 0 ? (
                      <div className="divide-y divide-[#BBE1FA]">
                        {clientCases.map((caseItem) => (
                          <div
                            key={caseItem.id}
                            className="px-6 py-4 hover:bg-[#3282B8]/5 cursor-pointer transition-colors flex items-center justify-between group"
                          >
                            <div 
                              className="flex items-center gap-4 flex-1"
                              onClick={() => handleCaseClick(caseItem)}
                            >
                              <FaFileAlt className="text-[#9CA3AF] text-sm" />
                              <span className="text-sm font-medium text-[#1B262C] group-hover:text-[#0F4C75] transition-colors">
                                {caseItem.title}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getCaseStatusStyle(caseItem.status)}`}>
                                {caseItem.status}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getPriorityStyle(caseItem.priority)}`}>
                                {caseItem.priority}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditCaseClick(caseItem);
                                }}
                                className="p-1.5 text-[#0F4C75] hover:bg-[#3282B8]/10 rounded-lg transition-colors"
                                title="Edit Case"
                              >
                                <FaEdit className="text-sm" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCase(caseItem.id);
                                }}
                                className="p-1.5 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors"
                                title="Delete Case"
                              >
                                <FaTrash className="text-sm" />
                              </button>
                              <FaExternalLinkAlt className="text-[#9CA3AF] text-xs opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-6 py-8 text-center text-[#6B7280] text-sm">
                        No cases assigned to this client
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-3 text-xs text-[#9CA3AF] flex items-center gap-1">
                  <FaExternalLinkAlt className="text-[8px] text-[#0F4C75]" />
                  Click on a case name to view full details
                </div>
              </div>

              {/* Action Buttons - Full Width */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#BBE1FA]">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedClient(null);
                    setIsDropdownOpen(false);
                  }}
                  className="flex-1 px-6 py-3 bg-[#F0F4F8] text-[#1B262C] border border-[#BBE1FA] rounded-xl hover:bg-[#BBE1FA]/50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 btn-primary font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSave className="inline mr-2" /> {isSubmitting ? 'Updating...' : 'Update Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Handle Add Client
  const handleAddClient = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newClient = {
      id: `c${Date.now()}`,
      ...formData,
      cases: 0,
      joined: new Date().toISOString().split('T')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=0F4C75&color=FFFFFF&size=50`,
    };
    
    if (onAddClient) {
      onAddClient(newClient);
    }
    
    setIsSubmitting(false);
    setShowAddModal(false);
    resetForm();
    showToastMessage('✅ Client added successfully!', 'success');
  };

  // Handle Edit Client
  const handleEditClient = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const updatedClient = {
      ...selectedClient,
      ...formData,
    };
    
    if (onEditClient) {
      onEditClient(updatedClient);
    }
    
    setIsSubmitting(false);
    setShowEditModal(false);
    setSelectedClient(null);
    resetForm();
    showToastMessage('✅ Client updated successfully!', 'success');
  };

  // Handle Delete Client
  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      if (onDeleteClient) {
        onDeleteClient(clientId);
      }
      setSelectedClient(null);
      showToastMessage('🗑️ Client deleted successfully!', 'success');
    }
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      status: 'active',
    });
  };

  // Open Edit Modal
  const openEditModal = (client) => {
    setSelectedClient(client);
    setFormData({
      name: client.name || '',
      email: client.email || '',
      phone: client.phone || '',
      company: client.company || '',
      address: client.address || '',
      status: client.status || 'active',
    });
    setShowEditModal(true);
    setIsDropdownOpen(false);
  };

  // Add Client Modal
  const AddClientModal = () => {
    if (!showAddModal) return null;

    return (
      <div className="fixed inset-0 bg-[#1B262C]/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-premium-lg p-6 relative border border-[#3282B8]">
          <button 
            onClick={() => setShowAddModal(false)}
            className="absolute top-4 right-4 p-2 text-[#9CA3AF] hover:text-[#1B262C] hover:bg-[#F0F4F8] rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 gradient-accent rounded-xl shadow-lg shadow-[#0F4C75]/25">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1B262C]">Add New Client</h3>
                <p className="text-xs text-[#6B7280]">Enter client details below</p>
              </div>
            </div>

            <form onSubmit={handleAddClient} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                    placeholder="client@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  placeholder="Street address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg text-[#1B262C] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#BBE1FA]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 bg-[#F0F4F8] text-[#1B262C] rounded-lg hover:bg-[#BBE1FA] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 btn-primary font-medium disabled:opacity-50"
                >
                  <FaSave className="inline mr-2" /> {isSubmitting ? 'Adding...' : 'Add Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Client Detail Modal - FULL SCREEN
  const ClientDetailModal = () => {
    if (!selectedClient || showEditModal) return null;
    const clientCases = getClientCases(selectedClient.id);

    return (
      <div className="fixed inset-0 bg-[#F0F4F8] z-50 overflow-y-auto">
        <div className="w-full min-h-screen p-6">
          
          {/* Header */}
          <div className="w-full px-6 py-4 border-b border-[#BBE1FA]/40 bg-white flex-shrink-0 relative sticky top-0 z-10 rounded-t-2xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B262C] via-[#0F4C75] to-[#3282B8]"></div>
            
            <div className="flex items-center justify-between w-full pt-1">
              <div className="flex items-center gap-4">
                <div className="p-2.5 gradient-accent rounded-xl shadow-lg shadow-[#0F4C75]/25">
                  <FaEye className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1B262C]">Client Details</h2>
                  <p className="text-sm text-[#6B7280]">View client information and cases</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 text-[#9CA3AF] hover:text-[#1B262C] hover:bg-[#3282B8]/10 rounded-xl transition-all duration-200"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="w-full mt-6">
            <div className="bg-white rounded-2xl shadow-premium-lg border border-[#3282B8] overflow-hidden w-full">
              {/* Client Header */}
              <div className="gradient-accent px-8 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-2xl border border-white/30">
                      {selectedClient.name?.split(' ').map(n => n[0]).join('') || '?'}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-white">{selectedClient.name}</h1>
                      <p className="text-white/70 text-sm">{selectedClient.company}</p>
                      <p className="text-white/50 text-xs mt-1 flex items-center gap-1">
                        <FaCalendarAlt className="text-[10px]" />
                        Joined {selectedClient.joined ? new Date(selectedClient.joined).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border bg-white/20 text-white border-white/30`}>
                      <span className={`inline-block w-2 h-2 rounded-full ${getStatusDot(selectedClient.status)} mr-1.5`}></span>
                      {selectedClient.status}
                    </span>
                    <button 
                      onClick={() => {
                        setSelectedClient(null);
                        openEditModal(selectedClient);
                      }}
                      className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-medium flex items-center gap-1"
                    >
                      <FaEdit className="text-xs" /> Edit
                    </button>
                    <button 
                      onClick={() => {
                        setDeleteTarget(selectedClient.id);
                        setShowDeleteConfirm(true);
                      }}
                      className="px-4 py-2 bg-red-500/20 text-white rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium flex items-center gap-1"
                    >
                      <FaTrash className="text-xs" /> Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Client Info Grid */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-[#F0F4F8] rounded-xl border border-[#BBE1FA]">
                    <p className="text-xs text-[#6B7280] flex items-center gap-1">
                      <FaEnvelope className="text-[10px] text-[#0F4C75]" /> Email
                    </p>
                    <p className="text-sm text-[#1B262C]">{selectedClient.email}</p>
                  </div>
                  <div className="p-3 bg-[#F0F4F8] rounded-xl border border-[#BBE1FA]">
                    <p className="text-xs text-[#6B7280] flex items-center gap-1">
                      <FaPhone className="text-[10px] text-[#0F4C75]" /> Phone
                    </p>
                    <p className="text-sm text-[#1B262C]">{selectedClient.phone || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-[#F0F4F8] rounded-xl border border-[#BBE1FA]">
                    <p className="text-xs text-[#6B7280] flex items-center gap-1">
                      <FaBriefcase className="text-[10px] text-[#0F4C75]" /> Total Cases
                    </p>
                    <p className="text-sm text-[#1B262C]">{clientCases.length}</p>
                  </div>
                  <div className="p-3 bg-[#F0F4F8] rounded-xl border border-[#BBE1FA]">
                    <p className="text-xs text-[#6B7280] flex items-center gap-1">
                      <FaMapMarkerAlt className="text-[10px] text-[#0F4C75]" /> Address
                    </p>
                    <p className="text-sm text-[#1B262C]">{selectedClient.address || 'N/A'}</p>
                  </div>
                </div>

                {/* Cases List */}
                <div className="border-t border-[#BBE1FA] pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FaGavel className="text-[#0F4C75]" />
                    <h4 className="text-lg font-semibold text-[#1B262C]">Assigned Cases</h4>
                    <span className="px-2 py-0.5 gradient-accent text-white rounded-full text-xs font-medium">
                      {clientCases.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {clientCases.map((caseItem) => (
                      <div
                        key={caseItem.id}
                        className="bg-[#F0F4F8] rounded-lg border border-[#BBE1FA] p-3 hover:bg-[#3282B8]/10 hover:border-[#3282B8] cursor-pointer transition-all duration-200 flex items-center justify-between group"
                      >
                        <div 
                          className="flex items-center gap-3 flex-1"
                          onClick={() => handleCaseClick(caseItem)}
                        >
                          <FaFileAlt className="text-[#9CA3AF] text-sm" />
                          <span className="text-sm font-medium text-[#1B262C] group-hover:text-[#0F4C75] transition-colors">
                            {caseItem.title}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getCaseStatusStyle(caseItem.status)}`}>
                            {caseItem.status}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getPriorityStyle(caseItem.priority)}`}>
                            {caseItem.priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditCaseClick(caseItem);
                            }}
                            className="p-1 text-[#0F4C75] hover:bg-[#3282B8]/10 rounded transition-colors"
                            title="Edit Case"
                          >
                            <FaEdit className="text-xs" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCase(caseItem.id);
                            }}
                            className="p-1 text-[#EF4444] hover:bg-[#EF4444]/10 rounded transition-colors"
                            title="Delete Case"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                          <FaExternalLinkAlt className="text-[#9CA3AF] text-xs opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                        </div>
                      </div>
                    ))}
                    {clientCases.length === 0 && (
                      <div className="text-center py-8 text-[#6B7280] text-sm">
                        No cases assigned to this client
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#BBE1FA] mt-6">
                  <button
                    onClick={() => {
                      setSelectedClient(null);
                      openEditModal(selectedClient);
                    }}
                    className="flex-1 px-4 py-2.5 bg-[#3282B8]/10 text-[#0F4C75] border border-[#3282B8]/30 rounded-lg hover:bg-[#3282B8]/20 transition-colors font-medium"
                  >
                    <FaEdit className="inline mr-2" /> Edit Client
                  </button>
                  <button
                    onClick={() => {
                      setDeleteTarget(selectedClient.id);
                      setShowDeleteConfirm(true);
                    }}
                    className="flex-1 px-4 py-2.5 bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30 rounded-lg hover:bg-[#EF4444]/20 transition-colors font-medium"
                  >
                    <FaTrash className="inline mr-2" /> Delete Client
                  </button>
                  <button
                    onClick={() => setSelectedClient(null)}
                    className="flex-1 px-4 py-2.5 bg-[#F0F4F8] text-[#1B262C] border border-[#BBE1FA] rounded-lg hover:bg-[#BBE1FA] transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-[#F0F4F8] p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1B262C]">Clients</h1>
              <p className="text-sm text-[#6B7280] mt-1">Manage your clients and their cases</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 btn-primary px-5 py-2.5 font-medium"
            >
              <FaPlusCircle className="text-sm" />
              Add Client
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm" />
            <input
              type="text"
              placeholder="Search clients by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border-2 border-[#BBE1FA] rounded-xl text-[#1B262C] placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all duration-200 shadow-sm"
            />
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredClients.map((client) => {
              const clientCases = getClientCases(client.id);

              return (
                <div key={client.id} className="premium-card hover:-translate-y-1">
                  {/* Client Header */}
                  <div className="p-5 border-b border-[#BBE1FA]">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {client.avatar ? (
                          <img 
                            src={client.avatar} 
                            alt={client.name}
                            className="w-12 h-12 rounded-full border-2 border-[#3282B8]"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#0F4C75]/25">
                            {client.name?.split(' ').map(n => n[0]).join('') || '?'}
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-[#1B262C]">{client.name}</h3>
                          <p className="text-xs text-[#6B7280]">{client.company}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${getStatusStyle(client.status)}`}>
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${getStatusDot(client.status)} mr-1`}></span>
                        {client.status}
                      </span>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="p-4 space-y-2 text-sm bg-[#F0F4F8]">
                    <div className="flex items-center gap-2 text-[#6B7280]">
                      <FaEnvelope className="text-[#0F4C75] text-xs" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#6B7280]">
                      <FaPhone className="text-[#0F4C75] text-xs" />
                      <span>{client.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#6B7280]">
                      <FaFileAlt className="text-[#0F4C75] text-xs" />
                      <span>{clientCases.length} cases</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#6B7280]">
                      <FaCalendarAlt className="text-[#0F4C75] text-xs" />
                      <span>Joined {client.joined ? new Date(client.joined).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-4 py-3 border-t border-[#BBE1FA] flex justify-end gap-2 bg-[#F0F4F8]">
                    <button 
                      onClick={() => setSelectedClient(client)}
                      className="px-3 py-1.5 text-sm text-[#0F4C75] hover:bg-[#3282B8]/10 rounded-lg transition-colors font-medium"
                    >
                      <FaEye className="inline mr-1.5" /> View
                    </button>
                    <button 
                      onClick={() => openEditModal(client)}
                      className="px-3 py-1.5 text-sm text-[#0F4C75] hover:bg-[#3282B8]/10 rounded-lg transition-colors font-medium"
                    >
                      <FaEdit className="inline mr-1.5" /> Edit
                    </button>
                    <button 
                      onClick={() => {
                        setDeleteTarget(client.id);
                        setShowDeleteConfirm(true);
                      }}
                      className="px-3 py-1.5 text-sm text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors font-medium"
                    >
                      <FaTrash className="inline mr-1.5" /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="text-7xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-[#1B262C] mb-2">
                  {searchQuery ? 'No clients found' : 'No clients yet'}
                </h3>
                <p className="text-[#6B7280]">
                  {searchQuery ? 'Try adjusting your search' : 'Add your first client to get started'}
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-4 inline-flex items-center gap-2 btn-primary px-6 py-3 font-medium"
                  >
                    <FaPlusCircle className="text-sm" />
                    Add Client
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Modals */}
          <AddClientModal />
          <EditClientModal />
          <ClientDetailModal />
          <DeleteConfirmModal />
        </div>
      </div>

      {/* Case Detail Full Page */}
      <CaseDetailPage />

      {/* Edit Case Full Page */}
      <EditCasePage />

      {/* Toast Notification */}
      <Toast />
    </>
  );
};

export default ClientsList;