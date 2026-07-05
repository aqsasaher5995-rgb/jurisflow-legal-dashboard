import React, { useState, useEffect } from 'react';
import { FaTimes, FaBook, FaPlus, FaSave } from 'react-icons/fa';

const AddReferenceModal = ({ isOpen, onClose, onAdd, onUpdate, referenceToEdit = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    caseNumber: '',
    description: '',
    party: '',
    caseType: '',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    referenceCategory: '',
    referenceNotes: '',
    year: new Date().getFullYear(),
    citation: '',
    documents: 0,
    hearings: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!referenceToEdit;

  // Load data when editing
  useEffect(() => {
    if (referenceToEdit && isOpen) {
      setFormData({
        title: referenceToEdit.title || '',
        caseNumber: referenceToEdit.caseNumber || '',
        description: referenceToEdit.description || '',
        party: referenceToEdit.party || '',
        caseType: referenceToEdit.caseType || '',
        date: referenceToEdit.date || new Date().toISOString().split('T')[0],
        amount: referenceToEdit.amount || '',
        referenceCategory: referenceToEdit.referenceCategory || '',
        referenceNotes: referenceToEdit.referenceNotes || '',
        year: referenceToEdit.year || new Date().getFullYear(),
        citation: referenceToEdit.citation || '',
        documents: referenceToEdit.documents || 0,
        hearings: referenceToEdit.hearings || 0,
      });
    } else {
      // Reset form when closed or not editing
      setFormData({
        title: '',
        caseNumber: '',
        description: '',
        party: '',
        caseType: '',
        date: new Date().toISOString().split('T')[0],
        amount: '',
        referenceCategory: '',
        referenceNotes: '',
        year: new Date().getFullYear(),
        citation: '',
        documents: 0,
        hearings: 0,
      });
    }
  }, [referenceToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const caseNumber = formData.caseNumber || `REF-${Date.now().toString().slice(-6)}`;
    
    const referenceData = {
      ...formData,
      caseNumber,
      status: 'reference',
      assignedTo: 'Current User',
      priority: 'Medium',
      clientId: `ref${Date.now()}`,
    };
    
    if (isEditing && onUpdate) {
      // Update existing reference
      onUpdate({ ...referenceData, id: referenceToEdit.id });
    } else {
      // Add new reference
      onAdd(referenceData);
    }
    
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      title: '',
      caseNumber: '',
      description: '',
      party: '',
      caseType: '',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      referenceCategory: '',
      referenceNotes: '',
      year: new Date().getFullYear(),
      citation: '',
      documents: 0,
      hearings: 0,
    });
  };

  const categories = [
    'Property Law',
    'Criminal Law',
    'Employment Law',
    'Family Law',
    'Corporate Law',
    'Civil Rights',
    'Personal Injury',
    'Intellectual Property',
    'Constitutional Law',
    'Other'
  ];

  const caseTypes = [
    'Civil',
    'Criminal',
    'Family',
    'Corporate',
    'Property Law',
    'Employment Law',
    'Civil Rights',
    'Personal Injury',
  ];

  return (
    <div className="fixed inset-0 bg-[#EDF5E0] z-50 flex flex-col">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#05396B]/15 bg-[#EDF5E0] flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#05396B]/10 rounded-xl border border-[#05396B]/20">
              {isEditing ? <FaSave className="text-[#05396B] text-xl" /> : <FaBook className="text-[#05396B] text-xl" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#05396B]">
                {isEditing ? 'Edit Reference Case' : 'Add Reference Case'}
              </h2>
              <p className="text-sm text-gray-500">
                {isEditing ? 'Update legal precedent or reference case' : 'Add a legal precedent or reference case'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-[#05396B] hover:bg-[#05396B]/10 rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
      </div>

      {/* Content - Full Page Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#EDF5E0]/50">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Row 1: Title & Case Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#05396B] mb-1">
                  Case Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EDF5E0] border border-[#05396B]/20 rounded-lg text-[#05396B] placeholder:text-gray-400 focus:border-[#05396B] focus:ring-2 focus:ring-[#05396B]/20 focus:outline-none transition-all"
                  placeholder="e.g., Doe v. Roe - Landmark Property Case"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#05396B] mb-1">Case Number</label>
                <input
                  type="text"
                  value={formData.caseNumber}
                  onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EDF5E0] border border-[#05396B]/20 rounded-lg text-[#05396B] placeholder:text-gray-400 focus:border-[#05396B] focus:ring-2 focus:ring-[#05396B]/20 focus:outline-none transition-all"
                  placeholder="REF-2025-001 (auto-generated if empty)"
                />
              </div>
            </div>

            {/* Row 2: Description */}
            <div>
              <label className="block text-sm font-medium text-[#05396B] mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-[#EDF5E0] border border-[#05396B]/20 rounded-lg text-[#05396B] placeholder:text-gray-400 focus:border-[#05396B] focus:ring-2 focus:ring-[#05396B]/20 focus:outline-none transition-all"
                rows="3"
                placeholder="Describe the reference case and its significance..."
              />
            </div>

            {/* Row 3: Parties & Case Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#05396B] mb-1">Parties</label>
                <input
                  type="text"
                  value={formData.party}
                  onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EDF5E0] border border-[#05396B]/20 rounded-lg text-[#05396B] placeholder:text-gray-400 focus:border-[#05396B] focus:ring-2 focus:ring-[#05396B]/20 focus:outline-none transition-all"
                  placeholder="Plaintiff: X | Defendant: Y"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#05396B] mb-1">Case Type</label>
                <select
                  value={formData.caseType}
                  onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EDF5E0] border border-[#05396B]/20 rounded-lg text-[#05396B] focus:border-[#05396B] focus:ring-2 focus:ring-[#05396B]/20 focus:outline-none transition-all"
                >
                  <option value="">Select Case Type</option>
                  {caseTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Date, Year, Amount */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#05396B] mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EDF5E0] border border-[#05396B]/20 rounded-lg text-[#05396B] focus:border-[#05396B] focus:ring-2 focus:ring-[#05396B]/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#05396B] mb-1">Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
                  className="w-full px-4 py-3 bg-[#EDF5E0] border border-[#05396B]/20 rounded-lg text-[#05396B] placeholder:text-gray-400 focus:border-[#05396B] focus:ring-2 focus:ring-[#05396B]/20 focus:outline-none transition-all"
                  placeholder="2025"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#05396B] mb-1">Amount</label>
                <input
                  type="text"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EDF5E0] border border-[#05396B]/20 rounded-lg text-[#05396B] placeholder:text-gray-400 focus:border-[#05396B] focus:ring-2 focus:ring-[#05396B]/20 focus:outline-none transition-all"
                  placeholder="$250,000 or N/A"
                />
              </div>
            </div>

            {/* Row 5: Category & Citation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#05396B] mb-1">Reference Category</label>
                <select
                  value={formData.referenceCategory}
                  onChange={(e) => setFormData({ ...formData, referenceCategory: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EDF5E0] border border-[#05396B]/20 rounded-lg text-[#05396B] focus:border-[#05396B] focus:ring-2 focus:ring-[#05396B]/20 focus:outline-none transition-all"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#05396B] mb-1">Citation</label>
                <input
                  type="text"
                  value={formData.citation}
                  onChange={(e) => setFormData({ ...formData, citation: e.target.value })}
                  className="w-full px-4 py-3 bg-[#EDF5E0] border border-[#05396B]/20 rounded-lg text-[#05396B] placeholder:text-gray-400 focus:border-[#05396B] focus:ring-2 focus:ring-[#05396B]/20 focus:outline-none transition-all"
                  placeholder="Doe v. Roe, 2025 NY Sup. Ct. 123"
                />
              </div>
            </div>

            {/* Row 6: Notes */}
            <div>
              <label className="block text-sm font-medium text-[#05396B] mb-1">Reference Notes</label>
              <textarea
                value={formData.referenceNotes}
                onChange={(e) => setFormData({ ...formData, referenceNotes: e.target.value })}
                className="w-full px-4 py-3 bg-[#EDF5E0] border border-[#05396B]/20 rounded-lg text-[#05396B] placeholder:text-gray-400 focus:border-[#05396B] focus:ring-2 focus:ring-[#05396B]/20 focus:outline-none transition-all"
                rows="2"
                placeholder="Add notes about this reference case..."
              />
            </div>

            {/* Row 7: Documents & Hearings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#05396B] mb-1">Documents</label>
                <input
                  type="number"
                  value={formData.documents}
                  onChange={(e) => setFormData({ ...formData, documents: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-[#EDF5E0] border border-[#05396B]/20 rounded-lg text-[#05396B] placeholder:text-gray-400 focus:border-[#05396B] focus:ring-2 focus:ring-[#05396B]/20 focus:outline-none transition-all"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#05396B] mb-1">Hearings</label>
                <input
                  type="number"
                  value={formData.hearings}
                  onChange={(e) => setFormData({ ...formData, hearings: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-[#EDF5E0] border border-[#05396B]/20 rounded-lg text-[#05396B] placeholder:text-gray-400 focus:border-[#05396B] focus:ring-2 focus:ring-[#05396B]/20 focus:outline-none transition-all"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 pt-4 border-t border-[#05396B]/15">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-[#EDF5E0] text-[#05396B] border border-[#05396B]/20 rounded-lg hover:bg-[#05396B]/10 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#05396B] to-[#389583] text-[#EDF5E0] rounded-lg font-medium hover:shadow-lg hover:shadow-[#05396B]/25 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Reference' : 'Add Reference Case')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReferenceModal;