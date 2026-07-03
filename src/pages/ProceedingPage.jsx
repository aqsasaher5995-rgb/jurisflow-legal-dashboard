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
  FaShare
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
  // Helper Functions
  // ============================================
  
  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      draft: 'bg-gray-50 text-gray-600 border-gray-200',
    };
    return colors[status] || colors.draft;
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: <FaCheckCircle className="text-emerald-500" />,
      pending: <FaClock className="text-amber-500" />,
      draft: <FaFileAlt className="text-gray-400" />,
    };
    return icons[status] || icons.draft;
  };

  const getTypeIcon = (type) => {
    const icons = {
      petitioner: <FaUser className="text-blue-500" />,
      defendant: <FaUsers className="text-red-500" />,
      hearing: <FaGavel className="text-purple-500" />,
    };
    return icons[type] || <FaFileAlt className="text-gray-500" />;
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
  // Document Section Component
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
            <div className="flex justify-end mb-3">
              <button
                onClick={handleUploadClick}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 group shadow-sm hover:shadow">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-red-50 rounded-lg">
                        <FaFilePdf className="text-red-500" />
                      </div>
                      <div>
                        <span className="text-sm text-gray-700 font-medium">{doc.name}</span>
                        <p className="text-[10px] text-gray-400">{doc.size} • {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => handleViewDocument(doc)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="View Document"
                      >
                        <FaEye className="text-sm" />
                      </button>
                      <button 
                        onClick={() => handleDownloadDocument(doc)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                        title="Download Document"
                      >
                        <FaDownload className="text-sm" />
                      </button>
                      <button 
                        onClick={() => handleDeleteDocument(section, doc.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete Document"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm">
                <FaFileAlt className="mx-auto text-4xl mb-3 text-gray-300" />
                <p>No documents uploaded</p>
                <button
                  onClick={handleUploadClick}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
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
  // Proceeding Card Component
  // ============================================
  const ProceedingCard = ({ proceeding }) => {
    const isExpanded = expandedSection === `proceeding-${proceeding.id}`;
    
    return (
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
        <button
          onClick={() => toggleSection(`proceeding-${proceeding.id}`)}
          className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg bg-gray-100`}>
              {getTypeIcon(proceeding.type)}
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">{proceeding.title}</p>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-[10px]" />
                  {proceeding.date}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock className="text-[10px]" />
                  {proceeding.time}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
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
            {isExpanded ? <FaChevronDown className="text-gray-400" /> : <FaChevronRight className="text-gray-400" />}
          </div>
        </button>
        
        {isExpanded && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-gray-100">
                <p className="text-sm text-gray-700">{proceeding.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-2.5 bg-white rounded-lg border border-gray-100">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Court</p>
                  <p className="text-sm font-medium text-gray-800">{proceeding.court}</p>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-gray-100">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Judge</p>
                  <p className="text-sm font-medium text-gray-800">{proceeding.judge}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => handleViewProceeding(proceeding)}
                  className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5"
                >
                  <FaEye className="text-xs" /> View
                </button>
                <button 
                  onClick={() => {
                    setSelectedProceeding(proceeding);
                    setShowEditModal(true);
                  }}
                  className="px-3 py-1.5 text-sm bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-1.5"
                >
                  <FaEdit className="text-xs" /> Edit
                </button>
                <button 
                  onClick={() => handleDeleteProceeding(proceeding.id)}
                  className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1.5"
                >
                  <FaTrash className="text-xs" /> Delete
                </button>
                <button 
                  onClick={() => toast.info(`🔗 Sharing: ${proceeding.title}`)}
                  className="px-3 py-1.5 text-sm bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-1.5"
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
  // Add Proceeding Modal
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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Add New Proceeding</h3>
            <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FaTimesIcon className="text-gray-400" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                placeholder="Enter proceeding title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              >
                <option value="petitioner">Petitioner</option>
                <option value="defendant">Defendant</option>
                <option value="hearing">Hearing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                rows="2"
                placeholder="Enter description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Court</label>
                <input
                  type="text"
                  value={formData.court}
                  onChange={(e) => setFormData({ ...formData, court: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="Court name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judge</label>
                <input
                  type="text"
                  value={formData.judge}
                  onChange={(e) => setFormData({ ...formData, judge: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="Judge name"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FaPlus className="inline mr-1.5 text-xs" /> Add Proceeding
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // ============================================
  // Edit Proceeding Modal
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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Edit Proceeding</h3>
            <button onClick={() => { setShowEditModal(false); setSelectedProceeding(null); }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FaTimesIcon className="text-gray-400" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              >
                <option value="petitioner">Petitioner</option>
                <option value="defendant">Defendant</option>
                <option value="hearing">Hearing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                rows="2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Court</label>
                <input
                  type="text"
                  value={formData.court}
                  onChange={(e) => setFormData({ ...formData, court: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judge</label>
                <input
                  type="text"
                  value={formData.judge}
                  onChange={(e) => setFormData({ ...formData, judge: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => { setShowEditModal(false); setSelectedProceeding(null); }} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                <FaSave className="inline mr-1.5 text-xs" /> Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // ============================================
  // MAIN RENDER - SINGLE RETURN
  // ============================================
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      
      {/* HEADER */}
      <div className="w-full px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="relative w-full">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 -mt-4"></div>
        </div>
        
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                <FaFilePdf className="text-white text-xl" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Proceeding</h2>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span>{caseItem?.caseTitle || caseItem?.title || 'Case'}</span>
                <span className="text-gray-300">|</span>
                <span className="font-mono">Case #{caseItem?.id || 'N/A'}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="w-full px-6 py-3 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('proceedings')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'proceedings'
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FaGavel className="inline mr-2 text-sm" />
            Proceedings ({proceedings.length})
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'documents'
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FaFilePdf className="inline mr-2 text-sm" />
            Documents ({documents.petitioner.length + documents.research.length + documents.defendant.length})
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'summary'
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FaInfoCircle className="inline mr-2 text-sm" />
            Summary
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 w-full overflow-y-auto scrollbar-hide bg-gray-50/50 p-6">
        <div className="max-w-6xl mx-auto">
          
          {/* ============================================
              PROCEEDINGS TAB
              ============================================ */}
          {activeTab === 'proceedings' && (
            <div className="space-y-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <p className="text-2xl font-bold text-gray-900">{proceedings.length}</p>
                  <p className="text-sm text-gray-500">Total Proceedings</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <p className="text-2xl font-bold text-emerald-600">
                    {proceedings.filter(p => p.status === 'completed').length}
                  </p>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <p className="text-2xl font-bold text-amber-600">
                    {proceedings.filter(p => p.status === 'pending').length}
                  </p>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <p className="text-2xl font-bold text-blue-600">
                    {documents.petitioner.length + documents.research.length + documents.defendant.length}
                  </p>
                  <p className="text-sm text-gray-500">Documents</p>
                </div>
              </div>

              {/* Add Proceeding Button */}
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow"
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
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
                  <p className="text-2xl font-bold text-blue-600">{documents.petitioner.length}</p>
                  <p className="text-sm text-gray-500">Petitioner</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
                  <p className="text-2xl font-bold text-purple-600">{documents.research.length}</p>
                  <p className="text-sm text-gray-500">Research</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
                  <p className="text-2xl font-bold text-red-600">{documents.defendant.length}</p>
                  <p className="text-sm text-gray-500">Defendant</p>
                </div>
              </div>

              {/* Document Sections */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
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
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Case Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Case Title</p>
                    <p className="text-sm font-medium text-gray-800">{caseItem?.caseTitle || caseItem?.title || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Case Number</p>
                    <p className="text-sm font-medium text-gray-800">{caseItem?.caseNumber || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Case Type</p>
                    <p className="text-sm font-medium text-gray-800">{caseItem?.caseType || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Status</p>
                    <p className="text-sm font-medium text-gray-800">{caseItem?.status || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Proceeding Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Proceeding Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Completed</span>
                      <span className="text-sm font-bold text-emerald-600">
                        {proceedings.filter(p => p.status === 'completed').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Pending</span>
                      <span className="text-sm font-bold text-amber-600">
                        {proceedings.filter(p => p.status === 'pending').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Draft</span>
                      <span className="text-sm font-bold text-gray-500">
                        {proceedings.filter(p => p.status === 'draft').length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Document Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Petitioner</span>
                      <span className="text-sm font-bold text-blue-600">{documents.petitioner.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Research</span>
                      <span className="text-sm font-bold text-purple-600">{documents.research.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Defendant</span>
                      <span className="text-sm font-bold text-red-600">{documents.defendant.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg border-t border-gray-200 pt-2">
                      <span className="text-sm font-medium text-gray-700">Total</span>
                      <span className="text-sm font-bold text-gray-900">
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