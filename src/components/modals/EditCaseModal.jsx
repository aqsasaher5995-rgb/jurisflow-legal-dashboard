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
  FaEdit,
  FaBalanceScale,
  FaPhone,
  FaEnvelope,
  FaUserFriends
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const EditCaseModal = ({ isOpen, case: caseItem, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    caseNo: '',
    courtNo: '',
    cmsNo: '',
    officeNo: '',
    caseTitle: '',
    description: '',
    party: '',
    petitioner: '',
    defendant: '',
    clientName: '',
    phone: '',
    email: '',
    address: '',
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
  const [showAllFields, setShowAllFields] = useState(false);

  useEffect(() => {
    if (caseItem && isOpen) {
      setFormData({
        caseNo: caseItem.caseNo || caseItem.caseNumber || '',
        courtNo: caseItem.courtNo || caseItem.judiciary?.courtNo || '',
        cmsNo: caseItem.cmsNo || caseItem.judiciary?.cmsNo || '',
        officeNo: caseItem.officeNo || '',
        caseTitle: caseItem.caseTitle || caseItem.title || '',
        description: caseItem.description || '',
        party: caseItem.party || '',
        petitioner: caseItem.petitioner || '',
        defendant: caseItem.defendant || '',
        clientName: caseItem.clientName || '',
        phone: caseItem.phone || '',
        email: caseItem.email || '',
        address: caseItem.address || '',
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

  // Check which sections have data
  const hasPartyData = formData.party || formData.petitioner || formData.defendant || formData.clientName;
  const hasContactData = formData.phone || formData.email || formData.address;
  const hasInstituteData = formData.instituteDate || formData.instituteNo;
  const hasCaseNatureData = formData.caseNature.trial || formData.caseNature.appeal;

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
    <div className="fixed inset-0 bg-[#1B262C]/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white w-screen h-screen overflow-hidden flex flex-col">
        
        {/* ===== HEADER ===== */}
        <div className="px-6 py-4 border-b border-[#BBE1FA]/40 bg-white flex-shrink-0 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B262C] via-[#0F4C75] to-[#3282B8]"></div>
          
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 gradient-accent rounded-xl shadow-lg shadow-[#0F4C75]/25">
                <FaEdit className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1B262C]">Edit Case</h2>
                <p className="text-sm text-[#6B7280]">Update case details</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAllFields(!showAllFields)}
                className="text-xs text-[#0F4C75] hover:text-[#3282B8] transition-colors px-3 py-1.5 bg-[#3282B8]/10 rounded-xl border border-[#3282B8]/20"
              >
                {showAllFields ? 'Hide Empty Fields' : 'Show All Fields'}
              </button>
              <button 
                onClick={onClose} 
                className="p-2 text-[#9CA3AF] hover:text-[#1B262C] hover:bg-[#3282B8]/10 rounded-xl transition-all duration-200"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC]">
          <div className="w-full space-y-4">
            
            {/* ===== TOP ROW: Case No, Court No, CMS No, Office No ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#3282B8]/5 p-4 rounded-xl border border-[#3282B8]/20">
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1.5">
                  Case No. <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  name="caseNo"
                  value={formData.caseNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  placeholder="Enter case number"
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
                  className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  placeholder="Enter court number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1.5">
                  CMS No.
                </label>
                <input
                  type="text"
                  name="cmsNo"
                  value={formData.cmsNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  placeholder="Enter CMS number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1.5">
                  Office No.
                </label>
                <input
                  type="text"
                  name="officeNo"
                  value={formData.officeNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  placeholder="Enter office number"
                />
              </div>
            </div>

            {/* ===== CASE TITLE & DESCRIPTION ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1.5">
                  Case Title <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  name="caseTitle"
                  value={formData.caseTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  required
                  placeholder="Enter case title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  placeholder="Enter case description"
                />
              </div>
            </div>

            {/* ===== PARTY / CLIENT DETAILS (only if data exists or show all fields) ===== */}
            {(hasPartyData || showAllFields) && (
              <div className="p-5 bg-[#3282B8]/5 rounded-xl border border-[#3282B8]/20">
                <h4 className="text-sm font-semibold text-[#1B262C] mb-4 flex items-center gap-2">
                  <FaUserFriends className="text-[#3282B8]" />
                  Party / Client Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Party</label>
                    <input
                      type="text"
                      name="party"
                      value={formData.party}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                      placeholder="e.g. Smith v Johnson"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Petitioner</label>
                    <input
                      type="text"
                      name="petitioner"
                      value={formData.petitioner}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                      placeholder="Enter petitioner name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Defendant</label>
                    <input
                      type="text"
                      name="defendant"
                      value={formData.defendant}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                      placeholder="Enter defendant name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Client Name</label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                      placeholder="Enter client name"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ===== CONTACT DETAILS (only if data exists or show all fields) ===== */}
            {(hasContactData || showAllFields) && (
              <div className="p-5 bg-[#3282B8]/5 rounded-xl border border-[#3282B8]/20">
                <h4 className="text-sm font-semibold text-[#1B262C] mb-4 flex items-center gap-2">
                  <FaPhone className="text-[#3282B8]" />
                  Contact Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                      placeholder="Enter address"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ===== CASE TYPE & PRIORITY & STATUS & ASSIGNED ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  placeholder="Enter assigned person"
                />
              </div>
            </div>

            {/* ===== CASE NATURE (only if data exists or show all fields) ===== */}
            {(hasCaseNatureData || showAllFields) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Trial</label>
                  <input
                    type="text"
                    value={formData.caseNature.trial}
                    onChange={(e) => handleNestedChange('caseNature', 'trial', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                    placeholder="e.g. Jury Trial"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Appeal</label>
                  <input
                    type="text"
                    value={formData.caseNature.appeal}
                    onChange={(e) => handleNestedChange('caseNature', 'appeal', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                    placeholder="e.g. N/A"
                  />
                </div>
              </div>
            )}

            {/* ===== COURT DETAILS ===== */}
            <div className="p-5 bg-[#3282B8]/5 rounded-xl border border-[#3282B8]/20">
              <h4 className="text-sm font-semibold text-[#1B262C] mb-4 flex items-center gap-2">
                <FaBuilding className="text-[#3282B8]" />
                Court Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Court Name</label>
                  <input
                    type="text"
                    value={formData.courtDetails.courtName}
                    onChange={(e) => handleNestedChange('courtDetails', 'courtName', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                    placeholder="Enter court name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1.5">District</label>
                  <input
                    type="text"
                    value={formData.courtDetails.district}
                    onChange={(e) => handleNestedChange('courtDetails', 'district', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                    placeholder="Enter district"
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

            {/* ===== JUDGE & ATTORNEYS ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Judge</label>
                <input
                  type="text"
                  name="judge"
                  value={formData.judge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  placeholder="Enter judge name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Attorneys</label>
                <input
                  type="text"
                  name="attorneys"
                  value={formData.attorneys}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  placeholder="e.g. Plaintiff: Name | Defendant: Name"
                />
              </div>
            </div>

            {/* ===== REMARKS ===== */}
            <div>
              <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Remarks</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                placeholder="Enter remarks"
              />
            </div>

            {/* ===== INSTITUTE DETAILS (only if data exists or show all fields) ===== */}
            {(hasInstituteData || showAllFields) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                    placeholder="Enter institute number"
                  />
                </div>
              </div>
            )}

            {/* ===== STATS ===== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Amount</label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                  placeholder="e.g. $250,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Documents</label>
                <input
                  type="number"
                  name="documentsCount"
                  value={formData.documentsCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
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

            {/* ===== ASSOCIATE ===== */}
            <div className="p-5 bg-[#3282B8]/5 rounded-xl border border-[#3282B8]/20">
              <h4 className="text-sm font-semibold text-[#1B262C] mb-4 flex items-center gap-2">
                <FaUsers className="text-[#3282B8]" />
                Associate
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Name</label>
                  <input
                    type="text"
                    value={formData.associate.name}
                    onChange={(e) => handleNestedChange('associate', 'name', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                    placeholder="Enter associate name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1.5">District</label>
                  <input
                    type="text"
                    value={formData.associate.district}
                    onChange={(e) => handleNestedChange('associate', 'district', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#BBE1FA] rounded-xl text-[#1B262C] text-sm focus:border-[#3282B8] focus:ring-4 focus:ring-[#3282B8]/10 focus:outline-none transition-all"
                    placeholder="Enter associate district"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B262C] mb-1.5">Next Hearing</label>
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
        </div>

        {/* ===== FOOTER ===== */}
        <div className="px-6 py-4 border-t border-[#BBE1FA]/40 bg-white flex-shrink-0">
          <div className="w-full flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-[#F0F4F8] text-[#1B262C] border border-[#BBE1FA] rounded-xl font-medium hover:bg-[#BBE1FA]/50 transition-all duration-200 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 btn-primary font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
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