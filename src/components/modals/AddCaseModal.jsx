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
  FaArrowLeft
} from 'react-icons/fa';
import { GiScales } from 'react-icons/gi';

const AddCaseModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    caseTitle: '',
    caseNumber: '',
    judiciary: { cmsNo: '', courtNo: '' },
    caseType: 'civil',
    caseNature: { trial: '', appeal: '' },
    courtDetails: { courtName: '', district: '', previousDate: '', nextDate: '' },
    remarks: '',
    instituteDate: '',
    instituteNo: '',
    associate: { name: '', district: '' },
    documents: { petitioner: [], research: [], defendant: [] },
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
      const caseNumber = formData.caseNumber || `CASE-${Date.now().toString().slice(-8)}`;
      const caseData = {
        ...formData,
        caseNumber,
        status: 'active',
        priority: 'Medium',
        title: formData.caseTitle,
        description: formData.remarks,
        party: 'N/A',
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
      caseTitle: '',
      caseNumber: '',
      judiciary: { cmsNo: '', courtNo: '' },
      caseType: 'civil',
      caseNature: { trial: '', appeal: '' },
      courtDetails: { courtName: '', district: '', previousDate: '', nextDate: '' },
      remarks: '',
      instituteDate: '',
      instituteNo: '',
      associate: { name: '', district: '' },
      documents: { petitioner: [], research: [], defendant: [] },
    });
    setActiveTab('basic');
  };

  const renderBasicInfo = () => (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Case No. <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="caseNumber"
            value={formData.caseNumber}
            onChange={handleInputChange}
            placeholder="e.g., CIV-2026-001"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
          />
          <p className="text-xs text-gray-400 mt-1">Leave empty to auto-generate</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Case Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="caseTitle"
            value={formData.caseTitle}
            onChange={handleInputChange}
            placeholder="Enter case title"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
            required
          />
        </div>
      </div>

      <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaBuilding className="text-blue-600" />
          Judiciary Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">CMS No.</label>
            <input
              type="text"
              value={formData.judiciary.cmsNo}
              onChange={(e) => handleNestedChange('judiciary', 'cmsNo', e.target.value)}
              placeholder="Enter CMS number"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Court No.</label>
            <input
              type="text"
              value={formData.judiciary.courtNo}
              onChange={(e) => handleNestedChange('judiciary', 'courtNo', e.target.value)}
              placeholder="Enter court number"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Case Type</label>
          <select
            value={formData.caseType}
            onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
          >
            <option value="civil">Civil</option>
            <option value="labour">Labour</option>
            <option value="service">Service</option>
            <option value="tax">Tax</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Trial</label>
            <input
              type="text"
              value={formData.caseNature.trial}
              onChange={(e) => handleNestedChange('caseNature', 'trial', e.target.value)}
              placeholder="Trial details"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Appeal</label>
            <input
              type="text"
              value={formData.caseNature.appeal}
              onChange={(e) => handleNestedChange('caseNature', 'appeal', e.target.value)}
              placeholder="Appeal details"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Remarks</label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleInputChange}
          rows="2"
          placeholder="Enter remarks"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Institute Date</label>
          <input
            type="date"
            name="instituteDate"
            value={formData.instituteDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Institute No.</label>
          <input
            type="text"
            name="instituteNo"
            value={formData.instituteNo}
            onChange={handleInputChange}
            placeholder="Enter institute number"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );

  const renderCourtDetails = () => (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Court Name</label>
        <input
          type="text"
          value={formData.courtDetails.courtName}
          onChange={(e) => handleNestedChange('courtDetails', 'courtName', e.target.value)}
          placeholder="Enter court name"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">District</label>
        <input
          type="text"
          value={formData.courtDetails.district}
          onChange={(e) => handleNestedChange('courtDetails', 'district', e.target.value)}
          placeholder="Enter district"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Previous Date</label>
          <input
            type="date"
            value={formData.courtDetails.previousDate}
            onChange={(e) => handleNestedChange('courtDetails', 'previousDate', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Next Date</label>
          <input
            type="date"
            value={formData.courtDetails.nextDate}
            onChange={(e) => handleNestedChange('courtDetails', 'nextDate', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );

  const renderAssociateDetails = () => (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Associate Name</label>
        <input
          type="text"
          value={formData.associate.name}
          onChange={(e) => handleNestedChange('associate', 'name', e.target.value)}
          placeholder="Enter associate name"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Associate District</label>
        <input
          type="text"
          value={formData.associate.district}
          onChange={(e) => handleNestedChange('associate', 'district', e.target.value)}
          placeholder="Enter associate district"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
        />
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-5">
      <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaFilePdf className="text-blue-600" />
          Upload Documents
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Petitioner Documents</label>
            <div className="relative">
              <input
                type="file"
                multiple
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  const fileNames = files.map(f => f.name);
                  handleNestedChange('documents', 'petitioner', fileNames);
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Research Documents</label>
            <div className="relative">
              <input
                type="file"
                multiple
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  const fileNames = files.map(f => f.name);
                  handleNestedChange('documents', 'research', fileNames);
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Defendant Documents</label>
            <div className="relative">
              <input
                type="file"
                multiple
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  const fileNames = files.map(f => f.name);
                  handleNestedChange('documents', 'defendant', fileNames);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      
      {/* HEADER */}
      <div className="w-full px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="relative w-full">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 -mt-4"></div>
        </div>
        
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <GiScales className="text-white text-xl" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Add New Case</h2>
              <p className="text-sm text-gray-500">Enter complete case details</p>
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

      {/* CONTENT */}
      <div className="flex-1 w-full overflow-y-auto scrollbar-hide bg-gray-50/50 p-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 p-1 bg-white rounded-xl border border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1}
                </span>
                <tab.icon className="text-sm" />
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              {activeTab === 'basic' && renderBasicInfo()}
              {activeTab === 'court' && renderCourtDetails()}
              {activeTab === 'associate' && renderAssociateDetails()}
              {activeTab === 'documents' && renderDocuments()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
              
              <div className="flex-1 flex gap-3 justify-end">
                {!isFirstTab && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                  >
                    <FaArrowLeft className="text-sm" />
                    Previous
                  </button>
                )}
                
                {!isLastTab ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Next
                    <FaArrowRight className="text-sm" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50"
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