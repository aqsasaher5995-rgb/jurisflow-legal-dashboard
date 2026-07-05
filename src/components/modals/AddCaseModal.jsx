import React, { useState } from 'react';
import { 
  FaTimes, 
  FaGavel, 
  FaBuilding, 
  FaUser, 
  FaFileAlt, 
  FaBookOpen, 
  FaCalendarAlt, 
  FaFileInvoice,
  FaInfoCircle,
  FaUsers,
  FaTag,
  FaFilePdf,
  FaClipboardList,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaChevronDown,
  FaChevronRight,
  FaArrowRight,
  FaArrowLeft,
  FaBalanceScale,
  FaEdit
} from 'react-icons/fa';
import { GiScales } from 'react-icons/gi';

const AddCaseModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    caseNo: '',
    courtNo: '',
    cmsNo: '',
    officeNo: '',
    caseTitle: '',
    description: '',
    caseType: 'civil',
    caseNature: { trial: '', appeal: '' },
    courtDetails: { courtName: '', district: '', previousDate: '', nextDate: '' },
    remarks: '',
    instituteDate: '',
    instituteNo: '',
    associate: { name: '', district: '' },
    documents: { petitioner: [], research: [], defendant: [] },
    priority: 'Medium',
    status: 'active',
    assignedTo: '',
    judge: '',
    attorneys: '',
    amount: '',
    hearings: 0,
    documentsCount: 0,
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FaBookOpen },
    { id: 'court', label: 'Court Details', icon: FaBuilding },
    { id: 'associate', label: 'Associate', icon: FaUser },
    { id: 'documents', label: 'Documents', icon: FaFilePdf },
  ];

  const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab);
  const isLastTab = currentTabIndex === tabs.length - 1;
  const isFirstTab = currentTabIndex === 0;

  const handleNext = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const caseNumber = formData.caseNo || `CASE-${Date.now().toString().slice(-8)}`;
      const caseData = {
        ...formData,
        caseNumber,
        status: 'active',
        title: formData.caseTitle,
        description: formData.description,
        location: formData.courtDetails?.district || '',
        court: formData.courtDetails?.courtName || '',
        nextHearing: formData.courtDetails?.nextDate || '',
      };
      const result = await onAdd(caseData);
      if (result.success) {
        onClose();
        resetForm();
      }
    } catch (error) {
      console.error('Error adding case:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      caseNo: '',
      courtNo: '',
      cmsNo: '',
      officeNo: '',
      caseTitle: '',
      description: '',
      caseType: 'civil',
      caseNature: { trial: '', appeal: '' },
      courtDetails: { courtName: '', district: '', previousDate: '', nextDate: '' },
      remarks: '',
      instituteDate: '',
      instituteNo: '',
      associate: { name: '', district: '' },
      documents: { petitioner: [], research: [], defendant: [] },
      priority: 'Medium',
      status: 'active',
      assignedTo: '',
      judge: '',
      attorneys: '',
      amount: '',
      hearings: 0,
      documentsCount: 0,
    });
    setActiveTab('basic');
  };

  const renderBasicInfo = () => (
    <div className="space-y-4 w-full">
      {/* ===== TOP ROW: Case No, Court No, CMS No, Office No ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#3282B8]/5 p-4 rounded-xl border border-[#3282B8]/20 w-full">
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">
            Case No. <span className="text-[#EF4444]">*</span>
          </label>
          <input
            type="text"
            name="caseNo"
            value={formData.caseNo}
            onChange={handleInputChange}
            placeholder="Enter case number"
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">
            Court No. <span className="text-[#EF4444]">*</span>
          </label>
          <input
            type="text"
            name="courtNo"
            value={formData.courtNo}
            onChange={handleInputChange}
            placeholder="Enter court number"
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">CMS No.</label>
          <input
            type="text"
            name="cmsNo"
            value={formData.cmsNo}
            onChange={handleInputChange}
            placeholder="Enter CMS number"
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Office No.</label>
          <input
            type="text"
            name="officeNo"
            value={formData.officeNo}
            onChange={handleInputChange}
            placeholder="Enter office number"
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* ===== CASE TITLE & DESCRIPTION ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">
            Case Title <span className="text-[#EF4444]">*</span>
          </label>
          <input
            type="text"
            name="caseTitle"
            value={formData.caseTitle}
            onChange={handleInputChange}
            placeholder="Enter case title"
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter case description"
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* ===== CASE TYPE & PRIORITY & STATUS & ASSIGNED ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Case Type</label>
          <select
            value={formData.caseType}
            onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          >
            <option value="civil">Civil</option>
            <option value="criminal">Criminal</option>
            <option value="labour">Labour</option>
            <option value="service">Service</option>
            <option value="tax">Tax</option>
            <option value="family">Family</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Assigned To</label>
          <input
            type="text"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleInputChange}
            placeholder="Enter assigned person"
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* ===== CASE NATURE ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Trial</label>
          <input
            type="text"
            value={formData.caseNature.trial}
            onChange={(e) => handleNestedChange('caseNature', 'trial', e.target.value)}
            placeholder="e.g. Jury Trial"
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Appeal</label>
          <input
            type="text"
            value={formData.caseNature.appeal}
            onChange={(e) => handleNestedChange('caseNature', 'appeal', e.target.value)}
            placeholder="e.g. N/A"
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* ===== JUDGE & ATTORNEYS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Judge</label>
          <input
            type="text"
            name="judge"
            value={formData.judge}
            onChange={handleInputChange}
            placeholder="Enter judge name"
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Attorneys</label>
          <input
            type="text"
            name="attorneys"
            value={formData.attorneys}
            onChange={handleInputChange}
            placeholder="e.g. Plaintiff: Name | Defendant: Name"
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* ===== REMARKS ===== */}
      <div className="w-full">
        <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Remarks</label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleInputChange}
          rows="3"
          placeholder="Enter remarks"
          className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
        />
      </div>

      {/* ===== INSTITUTE DETAILS & STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Institute Date</label>
          <input
            type="date"
            name="instituteDate"
            value={formData.instituteDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Institute No.</label>
          <input
            type="text"
            name="instituteNo"
            value={formData.instituteNo}
            onChange={handleInputChange}
            placeholder="Enter institute number"
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Amount</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="e.g. $250,000"
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Hearings</label>
          <input
            type="number"
            name="hearings"
            value={formData.hearings}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );

  const renderCourtDetails = () => (
    <div className="space-y-4 w-full">
      <div className="p-5 bg-[#3282B8]/5 rounded-xl border border-[#3282B8]/20 w-full">
        <h4 className="text-sm font-semibold text-[#1B262C] mb-4 flex items-center gap-2">
          <FaBuilding className="text-[#3282B8]" />
          Court Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div>
            <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Court Name</label>
            <input
              type="text"
              value={formData.courtDetails.courtName}
              onChange={(e) => handleNestedChange('courtDetails', 'courtName', e.target.value)}
              placeholder="Enter court name"
              className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1B262C] mb-1.5">District</label>
            <input
              type="text"
              value={formData.courtDetails.district}
              onChange={(e) => handleNestedChange('courtDetails', 'district', e.target.value)}
              placeholder="Enter district"
              className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Previous Date</label>
            <input
              type="date"
              value={formData.courtDetails.previousDate}
              onChange={(e) => handleNestedChange('courtDetails', 'previousDate', e.target.value)}
              className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Next Date</label>
            <input
              type="date"
              value={formData.courtDetails.nextDate}
              onChange={(e) => handleNestedChange('courtDetails', 'nextDate', e.target.value)}
              className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssociateDetails = () => (
    <div className="space-y-4 w-full">
      <div className="p-5 bg-[#3282B8]/5 rounded-xl border border-[#3282B8]/20 w-full">
        <h4 className="text-sm font-semibold text-[#1B262C] mb-4 flex items-center gap-2">
          <FaUsers className="text-[#3282B8]" />
          Associate
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div>
            <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Associate Name</label>
            <input
              type="text"
              value={formData.associate.name}
              onChange={(e) => handleNestedChange('associate', 'name', e.target.value)}
              placeholder="Enter associate name"
              className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Associate District</label>
            <input
              type="text"
              value={formData.associate.district}
              onChange={(e) => handleNestedChange('associate', 'district', e.target.value)}
              placeholder="Enter associate district"
              className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm placeholder:text-[#9CA3AF] focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-4 w-full">
      <div className="p-5 bg-[#3282B8]/5 rounded-xl border border-[#3282B8]/20 w-full">
        <h4 className="text-sm font-semibold text-[#1B262C] mb-4 flex items-center gap-2">
          <FaFilePdf className="text-[#3282B8]" />
          Upload Documents
        </h4>
        <div className="space-y-4 w-full">
          <div>
            <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Petitioner Documents</label>
            <input
              type="file"
              multiple
              className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#3282B8]/10 file:text-[#0F4C75] hover:file:bg-[#3282B8]/20 transition-all"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                const fileNames = files.map(f => f.name);
                handleNestedChange('documents', 'petitioner', fileNames);
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Research Documents</label>
            <input
              type="file"
              multiple
              className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#3282B8]/10 file:text-[#0F4C75] hover:file:bg-[#3282B8]/20 transition-all"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                const fileNames = files.map(f => f.name);
                handleNestedChange('documents', 'research', fileNames);
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Defendant Documents</label>
            <input
              type="file"
              multiple
              className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#3282B8]/10 file:text-[#0F4C75] hover:file:bg-[#3282B8]/20 transition-all"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                const fileNames = files.map(f => f.name);
                handleNestedChange('documents', 'defendant', fileNames);
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Documents Count</label>
            <input
              type="number"
              name="documentsCount"
              value={formData.documentsCount}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[#1B262C]/70 backdrop-blur-sm z-50 flex flex-col">
      
      {/* ===== HEADER ===== */}
      <div className="w-full px-6 py-4 border-b border-[#BBE1FA]/40 bg-white flex-shrink-0 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B262C] via-[#0F4C75] to-[#3282B8]"></div>
        
        <div className="flex items-center justify-between w-full pt-1">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center shadow-lg shadow-[#0F4C75]/25">
                <GiScales className="text-white text-xl" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1B262C]">Add New Case</h2>
              <p className="text-sm text-[#6B7280]">Enter complete case details</p>
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

      {/* ===== CONTENT ===== */}
      <div className="flex-1 w-full overflow-y-auto scrollbar-hide bg-[#F8FAFC] p-6">
        <div className="w-full">
          
          {/* ===== TABS ===== */}
          <div className="flex flex-wrap gap-2 mb-6 p-1 bg-[#F0F4F8] rounded-xl border border-[#BBE1FA] w-full">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm flex-1 min-w-[100px] justify-center ${
                  activeTab === tab.id
                    ? 'gradient-accent text-white shadow-lg shadow-[#0F4C75]/25'
                    : 'text-[#6B7280] hover:text-[#1B262C] hover:bg-[#3282B8]/10'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-[#3282B8]/10 text-[#0F4C75]'
                }`}>
                  {index + 1}
                </span>
                <tab.icon className="text-sm" />
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl border border-[#BBE1FA] p-6 shadow-premium w-full">
              {activeTab === 'basic' && renderBasicInfo()}
              {activeTab === 'court' && renderCourtDetails()}
              {activeTab === 'associate' && renderAssociateDetails()}
              {activeTab === 'documents' && renderDocuments()}
            </div>

            {/* ===== NAVIGATION BUTTONS ===== */}
            <div className="flex gap-3 pt-6 w-full">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-[#F0F4F8] text-[#1B262C] border border-[#BBE1FA] rounded-xl font-medium hover:bg-[#BBE1FA]/50 transition-all duration-200"
              >
                Cancel
              </button>
              
              <div className="flex-1 flex gap-3 justify-end">
                {!isFirstTab && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex items-center gap-2 px-6 py-3 bg-[#F0F4F8] text-[#1B262C] border border-[#BBE1FA] rounded-xl font-medium hover:bg-[#BBE1FA]/50 transition-all duration-200"
                  >
                    <FaArrowLeft className="text-sm" />
                    Previous
                  </button>
                )}
                
                {!isLastTab ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 btn-primary"
                  >
                    Next
                    <FaArrowRight className="text-sm" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Case'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCaseModal;