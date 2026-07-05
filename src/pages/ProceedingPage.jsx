import React, { useState, useRef } from 'react';
import { 
  FaTimes, 
  FaFilePdf, 
  FaDownload, 
  FaEye, 
  FaPaperclip,
  FaUser,
  FaFileAlt,
  FaUsers,
  FaChevronDown,
  FaChevronRight,
  FaPlus,
  FaTrash,
  FaEdit,
  FaUpload,
  FaGavel,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaBuilding,
  FaMapMarkerAlt,
  FaUserFriends,
  FaBriefcase,
  FaBookOpen,
  FaSave,
  FaTimes as FaTimesIcon,
  FaLink,
  FaShare,
  FaFolderOpen
} from 'react-icons/fa';
import { GiScales } from 'react-icons/gi';
import toast from 'react-hot-toast';

const ProceedingPage = ({ isOpen, onClose, caseItem }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeTab, setActiveTab] = useState('proceedings');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProceeding, setSelectedProceeding] = useState(null);
  const fileInputRef = useRef(null);
  
  // ============================================
  // STATE DATA
  // ============================================
  
  const [proceedings, setProceedings] = useState([
    { 
      id: 1, 
      title: 'Petition Filed', 
      date: '2026-01-15', 
      time: '10:00 AM',
      type: 'petitioner', 
      status: 'completed',
      description: 'Initial petition filed by the plaintiff',
      court: 'Los Angeles Superior Court',
      judge: 'Hon. Robert Martinez'
    },
    { 
      id: 2, 
      title: 'Response Submitted', 
      date: '2026-01-20', 
      time: '2:30 PM',
      type: 'defendant', 
      status: 'completed',
      description: 'Defendant response submitted to the court',
      court: 'Los Angeles Superior Court',
      judge: 'Hon. Robert Martinez'
    },
    { 
      id: 3, 
      title: 'Hearing Scheduled', 
      date: '2026-02-01', 
      time: '9:30 AM',
      type: 'hearing', 
      status: 'pending',
      description: 'Initial hearing scheduled for case review',
      court: 'Los Angeles Superior Court',
      judge: 'Hon. Robert Martinez'
    },
    { 
      id: 4, 
      title: 'Evidence Submission', 
      date: '2026-02-10', 
      time: '11:00 AM',
      type: 'petitioner', 
      status: 'draft',
      description: 'Submitting additional evidence documents',
      court: 'Los Angeles Superior Court',
      judge: 'Hon. Robert Martinez'
    },
    { 
      id: 5, 
      title: 'Status Conference', 
      date: '2026-02-20', 
      time: '1:00 PM',
      type: 'hearing', 
      status: 'pending',
      description: 'Status conference to discuss case progress',
      court: 'Los Angeles Superior Court',
      judge: 'Hon. Robert Martinez'
    },
  ]);

  const [documents, setDocuments] = useState({
    petitioner: [
      { id: 1, name: 'Petition_1.pdf', size: '2.4 MB', date: '2026-01-15' },
      { id: 2, name: 'Petition_2.pdf', size: '1.8 MB', date: '2026-01-16' },
      { id: 3, name: 'Evidence_A.pdf', size: '3.2 MB', date: '2026-01-18' },
      { id: 4, name: 'Witness_Statement.pdf', size: '1.2 MB', date: '2026-01-20' },
    ],
    research: [
      { id: 5, name: 'Research_1.pdf', size: '4.1 MB', date: '2026-01-17' },
      { id: 6, name: 'Case_Law.pdf', size: '2.8 MB', date: '2026-01-19' },
      { id: 7, name: 'Legal_Notes.pdf', size: '1.5 MB', date: '2026-01-21' },
    ],
    defendant: [
      { id: 8, name: 'Defense_1.pdf', size: '3.1 MB', date: '2026-01-19' },
      { id: 9, name: 'Defense_2.pdf', size: '2.2 MB', date: '2026-01-21' },
      { id: 10, name: 'Counter_Evidence.pdf', size: '4.5 MB', date: '2026-01-23' },
    ],
  });

  // ============================================
  // Proceeding CRUD Functions
  // ============================================
  
  const handleAddProceeding = (newProceeding) => {
    const proceeding = {
      id: Date.now(),
      ...newProceeding,
      status: 'pending'
    };
    setProceedings([proceeding, ...proceedings]);
    toast.success('Proceeding added successfully! ✅');
    setShowAddModal(false);
  };

  const handleEditProceeding = (updatedProceeding) => {
    setProceedings(proceedings.map(p => 
      p.id === updatedProceeding.id ? updatedProceeding : p
    ));
    toast.success('Proceeding updated successfully! 📝');
    setShowEditModal(false);
    setSelectedProceeding(null);
  };

  const handleDeleteProceeding = (id) => {
    if (window.confirm('Are you sure you want to delete this proceeding?')) {
      setProceedings(proceedings.filter(p => p.id !== id));
      toast.success('Proceeding deleted successfully! 🗑️');
    }
  };

  const handleViewProceeding = (proceeding) => {
    toast.info(`📄 Viewing: ${proceeding.title}`);
    setSelectedProceeding(proceeding);
  };

  // ============================================
  // Document CRUD Functions
  // ============================================
  
  const handleUploadDocument = (section, file) => {
    const newDoc = {
      id: Date.now(),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toISOString().split('T')[0]
    };
    setDocuments({
      ...documents,
      [section]: [...documents[section], newDoc]
    });
    toast.success(`Document uploaded to ${section}! 📄`);
  };

  const handleDeleteDocument = (section, id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments({
        ...documents,
        [section]: documents[section].filter(doc => doc.id !== id)
      });
      toast.success('Document deleted successfully! 🗑️');
    }
  };

  const handleViewDocument = (doc) => {
    toast.info(`📄 Viewing: ${doc.name}`);
  };

  const handleDownloadDocument = (doc) => {
    toast.success(`⬇️ Downloading: ${doc.name}`);
  };

  // ============================================
  // Helper Functions - Deep Current Theme
  // ============================================
  
  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20',
      pending: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
      draft: 'bg-[#9CA3AF]/10 text-[#6B7280] border-[#9CA3AF]/20',
    };
    return colors[status] || colors.draft;
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: <FaCheckCircle className="text-[#22C55E]" />,
      pending: <FaClock className="text-[#F59E0B]" />,
      draft: <FaFileAlt className="text-[#6B7280]" />,
    };
    return icons[status] || icons.draft;
  };

  const getTypeIcon = (type) => {
    const icons = {
      petitioner: <FaUser className="text-[#0F4C75]" />,
      defendant: <FaUsers className="text-[#EF4444]" />,
      hearing: <FaGavel className="text-[#8B5CF6]" />,
    };
    return icons[type] || <FaFileAlt className="text-[#6B7280]" />;
  };

  const getTypeLabel = (type) => {
    const labels = {
      petitioner: 'Petitioner',
      defendant: 'Defendant',
      hearing: 'Hearing',
    };
    return labels[type] || 'Other';
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // ============================================
  // Document Section Component - Deep Current
  // ============================================
  const DocumentSection = ({ title, docs, icon: Icon, color, section }) => {
    const isExpanded = expandedSection === title;
    const hasDocs = docs && docs.length > 0;
    const localFileInputRef = useRef(null);

    const handleUploadClick = () => {
      localFileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleUploadDocument(section, file);
      }
      e.target.value = '';
    };

    return (
      <div className="border border-[#BBE1FA]/40 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
        <button
          onClick={() => toggleSection(title)}
          className="w-full flex items-center justify-between p-4 bg-[#F0F4F8] hover:bg-[#3282B8]/5 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-[#3282B8]/10`}>
              <Icon className={`text-[#0F4C75]`} />
            </div>
            <span className="font-medium text-[#1B262C]">{title}</span>
            {hasDocs && (
              <span className="text-xs bg-[#3282B8]/10 text-[#0F4C75] px-2.5 py-0.5 rounded-full font-medium">
                {docs.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!hasDocs && <span className="text-xs text-[#9CA3AF]">No documents</span>}
            {isExpanded ? <FaChevronDown className="text-[#9CA3AF]" /> : <FaChevronRight className="text-[#9CA3AF]" />}
          </div>
        </button>
        
        {isExpanded && (
          <div className="p-4 bg-white border-t border-[#BBE1FA]/30">
            <div className="flex justify-end mb-3">
              <button
                onClick={handleUploadClick}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm btn-primary rounded-lg"
              >
                <FaUpload className="text-xs" />
                Upload
              </button>
              <input
                ref={localFileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {hasDocs ? (
              <div className="space-y-2">
                {docs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-[#F0F4F8] rounded-lg border border-[#BBE1FA]/30 hover:border-[#3282B8]/50 transition-all duration-200 group shadow-sm hover:shadow">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-red-50 rounded-lg">
                        <FaFilePdf className="text-red-500" />
                      </div>
                      <div>
                        <span className="text-sm text-[#1B262C] font-medium">{doc.name}</span>
                        <p className="text-[10px] text-[#6B7280]">{doc.size} • {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => handleViewDocument(doc)}
                        className="p-1.5 text-[#0F4C75] hover:bg-[#3282B8]/10 rounded-lg transition-colors" 
                        title="View Document"
                      >
                        <FaEye className="text-sm" />
                      </button>
                      <button 
                        onClick={() => handleDownloadDocument(doc)}
                        className="p-1.5 text-[#0F4C75] hover:bg-[#3282B8]/10 rounded-lg transition-colors" 
                        title="Download Document"
                      >
                        <FaDownload className="text-sm" />
                      </button>
                      <button 
                        onClick={() => handleDeleteDocument(section, doc.id)}
                        className="p-1.5 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors" 
                        title="Delete Document"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[#9CA3AF] text-sm">
                <FaFileAlt className="mx-auto text-4xl mb-3 text-[#BBE1FA]" />
                <p>No documents uploaded</p>
                <button
                  onClick={handleUploadClick}
                  className="mt-2 text-sm text-[#0F4C75] hover:text-[#3282B8] transition-colors"
                >
                  Upload first document
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // Proceeding Card Component - Deep Current
  // ============================================
  const ProceedingCard = ({ proceeding }) => {
    const isExpanded = expandedSection === `proceeding-${proceeding.id}`;
    
    return (
      <div className="border border-[#BBE1FA]/40 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-white">
        <button
          onClick={() => toggleSection(`proceeding-${proceeding.id}`)}
          className="w-full flex items-center justify-between p-4 bg-[#F0F4F8] hover:bg-[#3282B8]/5 transition-colors duration-200"
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg bg-[#3282B8]/10`}>
              {getTypeIcon(proceeding.type)}
            </div>
            <div className="text-left">
              <p className="font-medium text-[#1B262C]">{proceeding.title}</p>
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-[10px] text-[#0F4C75]" />
                  {proceeding.date}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock className="text-[10px] text-[#0F4C75]" />
                  {proceeding.time}
                </span>
                <span className="text-xs px-2 py-0.5 bg-[#F0F4F8] text-[#6B7280] rounded-full border border-[#BBE1FA]/30">
                  {getTypeLabel(proceeding.type)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(proceeding.status)}`}>
              {getStatusIcon(proceeding.status)}
              {proceeding.status.charAt(0).toUpperCase() + proceeding.status.slice(1)}
            </span>
            {isExpanded ? <FaChevronDown className="text-[#9CA3AF]" /> : <FaChevronRight className="text-[#9CA3AF]" />}
          </div>
        </button>
        
        {isExpanded && (
          <div className="p-4 bg-white border-t border-[#BBE1FA]/30">
            <div className="space-y-3">
              <div className="p-3 bg-[#F0F4F8] rounded-lg border border-[#BBE1FA]/20">
                <p className="text-sm text-[#1B262C]">{proceeding.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-2.5 bg-[#F0F4F8] rounded-lg border border-[#BBE1FA]/20">
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Court</p>
                  <p className="text-sm font-medium text-[#1B262C]">{proceeding.court}</p>
                </div>
                <div className="p-2.5 bg-[#F0F4F8] rounded-lg border border-[#BBE1FA]/20">
                  <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Judge</p>
                  <p className="text-sm font-medium text-[#1B262C]">{proceeding.judge}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2 flex-wrap">
                <button 
                  onClick={() => handleViewProceeding(proceeding)}
                  className="px-3 py-1.5 text-sm bg-[#3282B8]/10 text-[#0F4C75] rounded-lg hover:bg-[#3282B8]/20 transition-colors flex items-center gap-1.5 border border-[#3282B8]/20"
                >
                  <FaEye className="text-xs" /> View
                </button>
                <button 
                  onClick={() => {
                    setSelectedProceeding(proceeding);
                    setShowEditModal(true);
                  }}
                  className="px-3 py-1.5 text-sm bg-[#F59E0B]/10 text-[#F59E0B] rounded-lg hover:bg-[#F59E0B]/20 transition-colors flex items-center gap-1.5 border border-[#F59E0B]/20"
                >
                  <FaEdit className="text-xs" /> Edit
                </button>
                <button 
                  onClick={() => handleDeleteProceeding(proceeding.id)}
                  className="px-3 py-1.5 text-sm bg-[#EF4444]/10 text-[#EF4444] rounded-lg hover:bg-[#EF4444]/20 transition-colors flex items-center gap-1.5 border border-[#EF4444]/20"
                >
                  <FaTrash className="text-xs" /> Delete
                </button>
                <button 
                  onClick={() => toast.info(`🔗 Sharing: ${proceeding.title}`)}
                  className="px-3 py-1.5 text-sm bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/20 transition-colors flex items-center gap-1.5 border border-[#8B5CF6]/20"
                >
                  <FaShare className="text-xs" /> Share
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // Add Proceeding Modal - Deep Current
  // ============================================
  const AddProceedingModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      date: '',
      time: '',
      type: 'petitioner',
      description: '',
      court: '',
      judge: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleAddProceeding(formData);
      setFormData({ title: '', date: '', time: '', type: 'petitioner', description: '', court: '', judge: '' });
    };

    if (!showAddModal) return null;

    return (
      <div className="fixed inset-0 bg-[#1B262C]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#BBE1FA]/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#1B262C]">Add New Proceeding</h3>
            <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-[#3282B8]/10 rounded-lg transition-colors">
              <FaTimesIcon className="text-[#9CA3AF]" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1B262C] mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
                placeholder="Enter proceeding title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Time *</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1B262C] mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
              >
                <option value="petitioner">Petitioner</option>
                <option value="defendant">Defendant</option>
                <option value="hearing">Hearing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1B262C] mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
                rows="2"
                placeholder="Enter description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Court</label>
                <input
                  type="text"
                  value={formData.court}
                  onChange={(e) => setFormData({ ...formData, court: e.target.value })}
                  className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
                  placeholder="Court name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Judge</label>
                <input
                  type="text"
                  value={formData.judge}
                  onChange={(e) => setFormData({ ...formData, judge: e.target.value })}
                  className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
                  placeholder="Judge name"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 bg-[#F0F4F8] text-[#1B262C] border border-[#BBE1FA] rounded-lg hover:bg-[#BBE1FA]/50 transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex-1 px-4 py-2 btn-primary rounded-lg">
                <FaPlus className="inline mr-1.5 text-xs" /> Add Proceeding
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // ============================================
  // Edit Proceeding Modal - Deep Current
  // ============================================
  const EditProceedingModal = () => {
    const [formData, setFormData] = useState(selectedProceeding || {
      title: '', date: '', time: '', type: 'petitioner', description: '', court: '', judge: '', status: 'pending'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleEditProceeding({ ...formData, id: selectedProceeding.id });
    };

    if (!showEditModal || !selectedProceeding) return null;

    return (
      <div className="fixed inset-0 bg-[#1B262C]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#BBE1FA]/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#1B262C]">Edit Proceeding</h3>
            <button onClick={() => { setShowEditModal(false); setSelectedProceeding(null); }} className="p-2 hover:bg-[#3282B8]/10 rounded-lg transition-colors">
              <FaTimesIcon className="text-[#9CA3AF]" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1B262C] mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Time *</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1B262C] mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
              >
                <option value="petitioner">Petitioner</option>
                <option value="defendant">Defendant</option>
                <option value="hearing">Hearing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1B262C] mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1B262C] mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
                rows="2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Court</label>
                <input
                  type="text"
                  value={formData.court}
                  onChange={(e) => setFormData({ ...formData, court: e.target.value })}
                  className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1">Judge</label>
                <input
                  type="text"
                  value={formData.judge}
                  onChange={(e) => setFormData({ ...formData, judge: e.target.value })}
                  className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#BBE1FA] rounded-lg focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all text-[#1B262C]"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => { setShowEditModal(false); setSelectedProceeding(null); }} className="flex-1 px-4 py-2 bg-[#F0F4F8] text-[#1B262C] border border-[#BBE1FA] rounded-lg hover:bg-[#BBE1FA]/50 transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex-1 px-4 py-2 btn-primary rounded-lg">
                <FaSave className="inline mr-1.5 text-xs" /> Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // ============================================
  // MAIN RENDER
  // ============================================
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#F8FAFC] z-50 flex flex-col">
      
      {/* ===== HEADER - DEEP CURRENT ===== */}
      <div className="w-full px-6 py-4 border-b border-[#BBE1FA]/40 bg-white flex-shrink-0 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B262C] via-[#0F4C75] to-[#3282B8]"></div>
        
        <div className="flex items-center justify-between w-full pt-1">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center shadow-lg shadow-[#0F4C75]/25">
                <FaFolderOpen className="text-white text-xl" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1B262C]">Proceeding</h2>
              <p className="text-sm text-[#6B7280] flex items-center gap-2">
                <span>{caseItem?.caseTitle || caseItem?.title || 'Case'}</span>
                <span className="text-[#BBE1FA]">|</span>
                <span className="font-mono text-[#0F4C75]">Case #{caseItem?.id || 'N/A'}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#9CA3AF] hover:text-[#1B262C] hover:bg-[#3282B8]/10 rounded-xl transition-all duration-200"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
      </div>

      {/* ===== TABS - DEEP CURRENT ===== */}
      <div className="w-full px-6 py-3 border-b border-[#BBE1FA]/40 bg-white flex-shrink-0">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('proceedings')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'proceedings'
                ? 'gradient-accent text-white shadow-lg shadow-[#0F4C75]/25'
                : 'text-[#6B7280] hover:text-[#1B262C] hover:bg-[#3282B8]/10'
            }`}
          >
            <FaGavel className="inline mr-2 text-sm" />
            Proceedings ({proceedings.length})
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'documents'
                ? 'gradient-accent text-white shadow-lg shadow-[#0F4C75]/25'
                : 'text-[#6B7280] hover:text-[#1B262C] hover:bg-[#3282B8]/10'
            }`}
          >
            <FaFilePdf className="inline mr-2 text-sm" />
            Documents ({documents.petitioner.length + documents.research.length + documents.defendant.length})
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'summary'
                ? 'gradient-accent text-white shadow-lg shadow-[#0F4C75]/25'
                : 'text-[#6B7280] hover:text-[#1B262C] hover:bg-[#3282B8]/10'
            }`}
          >
            <FaInfoCircle className="inline mr-2 text-sm" />
            Summary
          </button>
        </div>
      </div>

      {/* ===== CONTENT - DEEP CURRENT ===== */}
      <div className="flex-1 w-full overflow-y-auto scrollbar-hide bg-[#F8FAFC] p-6">
        <div className="max-w-6xl mx-auto">
          
          {/* ============================================
              PROCEEDINGS TAB
              ============================================ */}
          {activeTab === 'proceedings' && (
            <div className="space-y-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-[#BBE1FA] p-4 shadow-sm">
                  <p className="text-2xl font-bold text-[#1B262C]">{proceedings.length}</p>
                  <p className="text-sm text-[#6B7280]">Total Proceedings</p>
                </div>
                <div className="bg-white rounded-xl border border-[#BBE1FA] p-4 shadow-sm">
                  <p className="text-2xl font-bold text-[#22C55E]">
                    {proceedings.filter(p => p.status === 'completed').length}
                  </p>
                  <p className="text-sm text-[#6B7280]">Completed</p>
                </div>
                <div className="bg-white rounded-xl border border-[#BBE1FA] p-4 shadow-sm">
                  <p className="text-2xl font-bold text-[#F59E0B]">
                    {proceedings.filter(p => p.status === 'pending').length}
                  </p>
                  <p className="text-sm text-[#6B7280]">Pending</p>
                </div>
                <div className="bg-white rounded-xl border border-[#BBE1FA] p-4 shadow-sm">
                  <p className="text-2xl font-bold text-[#0F4C75]">
                    {documents.petitioner.length + documents.research.length + documents.defendant.length}
                  </p>
                  <p className="text-sm text-[#6B7280]">Documents</p>
                </div>
              </div>

              {/* Add Proceeding Button */}
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2 btn-primary rounded-lg text-sm font-medium"
                >
                  <FaPlus className="text-sm" />
                  Add Proceeding
                </button>
              </div>

              {/* Proceeding List */}
              <div className="space-y-3">
                {proceedings.map((proceeding) => (
                  <ProceedingCard key={proceeding.id} proceeding={proceeding} />
                ))}
              </div>
            </div>
          )}

          {/* ============================================
              DOCUMENTS TAB
              ============================================ */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              {/* Document Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-[#BBE1FA] p-4 shadow-sm text-center">
                  <p className="text-2xl font-bold text-[#0F4C75]">{documents.petitioner.length}</p>
                  <p className="text-sm text-[#6B7280]">Petitioner</p>
                </div>
                <div className="bg-white rounded-xl border border-[#BBE1FA] p-4 shadow-sm text-center">
                  <p className="text-2xl font-bold text-[#8B5CF6]">{documents.research.length}</p>
                  <p className="text-sm text-[#6B7280]">Research</p>
                </div>
                <div className="bg-white rounded-xl border border-[#BBE1FA] p-4 shadow-sm text-center">
                  <p className="text-2xl font-bold text-[#EF4444]">{documents.defendant.length}</p>
                  <p className="text-sm text-[#6B7280]">Defendant</p>
                </div>
              </div>

              {/* Document Sections */}
              <div className="bg-white rounded-xl border border-[#BBE1FA] p-4 shadow-sm">
                <div className="space-y-3">
                  <DocumentSection title="Petitioner" docs={documents.petitioner} icon={FaUser} color="blue" section="petitioner" />
                  <DocumentSection title="Research" docs={documents.research} icon={FaFileAlt} color="purple" section="research" />
                  <DocumentSection title="Defendant" docs={documents.defendant} icon={FaUsers} color="red" section="defendant" />
                </div>
              </div>
            </div>
          )}

          {/* ============================================
              SUMMARY TAB
              ============================================ */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              {/* Case Summary Card */}
              <div className="bg-white rounded-xl border border-[#BBE1FA] p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#1B262C] mb-4">Case Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-[#F0F4F8] rounded-lg border border-[#BBE1FA]/20">
                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Case Title</p>
                    <p className="text-sm font-medium text-[#1B262C]">{caseItem?.caseTitle || caseItem?.title || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-[#F0F4F8] rounded-lg border border-[#BBE1FA]/20">
                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Case Number</p>
                    <p className="text-sm font-medium text-[#1B262C]">{caseItem?.caseNumber || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-[#F0F4F8] rounded-lg border border-[#BBE1FA]/20">
                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Case Type</p>
                    <p className="text-sm font-medium text-[#1B262C]">{caseItem?.caseType || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-[#F0F4F8] rounded-lg border border-[#BBE1FA]/20">
                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">Status</p>
                    <p className="text-sm font-medium text-[#1B262C]">{caseItem?.status || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Proceeding Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-[#BBE1FA] p-6 shadow-sm">
                  <h4 className="text-sm font-semibold text-[#1B262C] mb-3 uppercase tracking-wider">Proceeding Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-[#F0F4F8] rounded-lg">
                      <span className="text-sm text-[#6B7280]">Completed</span>
                      <span className="text-sm font-bold text-[#22C55E]">
                        {proceedings.filter(p => p.status === 'completed').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#F0F4F8] rounded-lg">
                      <span className="text-sm text-[#6B7280]">Pending</span>
                      <span className="text-sm font-bold text-[#F59E0B]">
                        {proceedings.filter(p => p.status === 'pending').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#F0F4F8] rounded-lg">
                      <span className="text-sm text-[#6B7280]">Draft</span>
                      <span className="text-sm font-bold text-[#6B7280]">
                        {proceedings.filter(p => p.status === 'draft').length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#BBE1FA] p-6 shadow-sm">
                  <h4 className="text-sm font-semibold text-[#1B262C] mb-3 uppercase tracking-wider">Document Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-[#F0F4F8] rounded-lg">
                      <span className="text-sm text-[#6B7280]">Petitioner</span>
                      <span className="text-sm font-bold text-[#0F4C75]">{documents.petitioner.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#F0F4F8] rounded-lg">
                      <span className="text-sm text-[#6B7280]">Research</span>
                      <span className="text-sm font-bold text-[#8B5CF6]">{documents.research.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#F0F4F8] rounded-lg">
                      <span className="text-sm text-[#6B7280]">Defendant</span>
                      <span className="text-sm font-bold text-[#EF4444]">{documents.defendant.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#F0F4F8] rounded-lg border-t border-[#BBE1FA]/30 pt-2">
                      <span className="text-sm font-medium text-[#1B262C]">Total</span>
                      <span className="text-sm font-bold text-[#1B262C]">
                        {documents.petitioner.length + documents.research.length + documents.defendant.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddProceedingModal />
      <EditProceedingModal />
    </div>
  );
};

export default ProceedingPage;