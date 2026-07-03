import React, { useState, useEffect } from 'react';
import { 
  FaTimes, 
  FaSave, 
  FaBuilding, 
  FaUser, 
  FaFileAlt, 
  FaBookOpen, 
  FaCalendarAlt, 
  FaFileInvoice,
  FaInfoCircle,
  FaUsers,
  FaTag,
  FaClipboardList,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaEdit
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const EditCaseModal = ({ isOpen, case: caseItem, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    caseTitle: '',
    caseNumber: '',
    description: '',
    party: '',
    judiciary: { cmsNo: '', courtNo: '' },
    caseType: 'civil',
    caseNature: { trial: '', appeal: '' },
    courtDetails: { courtName: '', district: '', previousDate: '', nextDate: '' },
    remarks: '',
    instituteDate: '',
    instituteNo: '',
    associate: { name: '', district: '' },
    status: 'active',
    priority: 'Medium',
    assignedTo: '',
    judge: '',
    attorneys: '',
    amount: '',
    documentsCount: 0,
    hearings: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (caseItem && isOpen) {
      setFormData({
        caseTitle: caseItem.caseTitle || caseItem.title || '',
        caseNumber: caseItem.caseNumber || '',
        description: caseItem.description || '',
        party: caseItem.party || '',
        judiciary: {
          cmsNo: caseItem.judiciary?.cmsNo || '',
          courtNo: caseItem.judiciary?.courtNo || '',
        },
        caseType: caseItem.caseType || 'civil',
        caseNature: {
          trial: caseItem.caseNature?.trial || '',
          appeal: caseItem.caseNature?.appeal || '',
        },
        courtDetails: {
          courtName: caseItem.courtDetails?.courtName || caseItem.court || '',
          district: caseItem.courtDetails?.district || caseItem.location || '',
          previousDate: caseItem.courtDetails?.previousDate || '',
          nextDate: caseItem.courtDetails?.nextDate || '',
        },
        remarks: caseItem.remarks || '',
        instituteDate: caseItem.instituteDate || '',
        instituteNo: caseItem.instituteNo || '',
        associate: {
          name: caseItem.associate?.name || '',
          district: caseItem.associate?.district || '',
        },
        status: caseItem.status || 'active',
        priority: caseItem.priority || 'Medium',
        assignedTo: caseItem.assignedTo || '',
        judge: caseItem.judge || '',
        attorneys: caseItem.attorneys || '',
        amount: caseItem.amount || '',
        documentsCount: caseItem.documentsCount || 0,
        hearings: caseItem.hearings || 0,
      });
    }
  }, [caseItem, isOpen]);

  if (!isOpen) return null;

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
      const updatedData = {
        ...formData,
        title: formData.caseTitle,
        location: formData.courtDetails?.district || '',
        court: formData.courtDetails?.courtName || '',
        nextHearing: formData.courtDetails?.nextDate || '',
      };
      
      const result = await onUpdate(caseItem.id || caseItem._id, updatedData);
      if (result.success) {
        toast.success('Case updated successfully! ✅');
        onClose();
      } else {
        toast.error(result.error || 'Failed to update case');
      }
    } catch (error) {
      toast.error('Failed to update case');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // ============================================
    // FULL SCREEN MODAL - Takes entire viewport
    // ============================================
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-0">
      <div className="bg-white w-screen h-screen overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-xl">
                <FaEdit className="text-amber-600 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Edit Case</h2>
                <p className="text-sm text-gray-500">Update case details</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200">
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          <div className="max-w-4xl mx-auto space-y-5">
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Case No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="caseNumber"
                  value={formData.caseNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="Enter case number"
                />
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  required
                  placeholder="Enter case title"
                />
              </div>
            </div>

            {/* Description & Party */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="Enter case description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Party</label>
                <input
                  type="text"
                  name="party"
                  value={formData.party}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="e.g. Plaintiff: Smith | Defendant: Johnson"
                />
              </div>
            </div>

            {/* Judiciary */}
            <div className="p-5 bg-white rounded-xl border border-gray-200">
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
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="Enter CMS number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Court No.</label>
                  <input
                    type="text"
                    value={formData.judiciary.courtNo}
                    onChange={(e) => handleNestedChange('judiciary', 'courtNo', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="Enter court number"
                  />
                </div>
              </div>
            </div>

            {/* Case Type & Nature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-xl border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FaTag className="text-purple-600" />
                  Case Type
                </h4>
                <select
                  value={formData.caseType}
                  onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                >
                  <option value="civil">Civil</option>
                  <option value="criminal">Criminal</option>
                  <option value="labour">Labour</option>
                  <option value="service">Service</option>
                  <option value="tax">Tax</option>
                  <option value="family">Family</option>
                </select>
              </div>
              <div className="p-5 bg-white rounded-xl border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FaClipboardList className="text-amber-600" />
                  Case Nature
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Trial</label>
                    <input
                      type="text"
                      value={formData.caseNature.trial}
                      onChange={(e) => handleNestedChange('caseNature', 'trial', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                      placeholder="e.g. Jury Trial"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Appeal</label>
                    <input
                      type="text"
                      value={formData.caseNature.appeal}
                      onChange={(e) => handleNestedChange('caseNature', 'appeal', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                      placeholder="e.g. N/A"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Court Details */}
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FaBuilding className="text-blue-600" />
                Court Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Court Name</label>
                  <input
                    type="text"
                    value={formData.courtDetails.courtName}
                    onChange={(e) => handleNestedChange('courtDetails', 'courtName', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="Enter court name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">District</label>
                  <input
                    type="text"
                    value={formData.courtDetails.district}
                    onChange={(e) => handleNestedChange('courtDetails', 'district', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="Enter district"
                  />
                </div>
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

            {/* Status & Priority */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned To</label>
                <input
                  type="text"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="Enter assigned person"
                />
              </div>
            </div>

            {/* Judge & Attorneys */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Judge</label>
                <input
                  type="text"
                  name="judge"
                  value={formData.judge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="Enter judge name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Attorneys</label>
                <input
                  type="text"
                  name="attorneys"
                  value={formData.attorneys}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="e.g. Plaintiff: Name | Defendant: Name"
                />
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Remarks</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                placeholder="Enter remarks"
              />
            </div>

            {/* Institute Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="Enter institute number"
                />
              </div>
            </div>

            {/* Associate */}
            <div className="p-5 bg-white rounded-xl border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FaUsers className="text-teal-600" />
                Associate
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                  <input
                    type="text"
                    value={formData.associate.name}
                    onChange={(e) => handleNestedChange('associate', 'name', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="Enter associate name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">District</label>
                  <input
                    type="text"
                    value={formData.associate.district}
                    onChange={(e) => handleNestedChange('associate', 'district', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="Enter associate district"
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount</label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="e.g. $250,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Documents Count</label>
                <input
                  type="number"
                  name="documentsCount"
                  value={formData.documentsCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Hearings</label>
                <input
                  type="number"
                  name="hearings"
                  value={formData.hearings}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="max-w-4xl mx-auto flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 disabled:opacity-50"
            >
              <FaSave className="inline mr-2" /> {isSubmitting ? 'Updating...' : 'Update Case'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCaseModal;