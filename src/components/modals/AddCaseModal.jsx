import React, { useState } from 'react';
import { FaTimes, FaGavel } from 'react-icons/fa';

const AddCaseModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    party: '',
    status: 'active',
    date: new Date().toISOString().split('T')[0],
    caseType: 'Civil',
    priority: 'Medium',
    assignedTo: '',
    location: '',
    amount: '',
    nextHearing: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCase = {
      ...formData,
      documents: 0,
      hearings: 0,
    };
    onAdd(newCase);
    onClose();
    setFormData({
      title: '',
      description: '',
      party: '',
      status: 'active',
      date: new Date().toISOString().split('T')[0],
      caseType: 'Civil',
      priority: 'Medium',
      assignedTo: '',
      location: '',
      amount: '',
      nextHearing: '',
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glow-view-card relative" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <FaGavel className="text-blue-400 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Add New Case</h2>
            <p className="text-xs text-gray-400">Enter the case details below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Case Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 focus:outline-none transition-all"
                placeholder="Enter case title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Case Type</label>
              <select
                value={formData.caseType}
                onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 focus:outline-none transition-all"
              >
                <option value="Civil">Civil</option>
                <option value="Criminal">Criminal</option>
                <option value="Family">Family</option>
                <option value="Corporate">Corporate</option>
                <option value="Civil Rights">Civil Rights</option>
                <option value="Personal Injury">Personal Injury</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 focus:outline-none transition-all"
              rows="3"
              placeholder="Enter case description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Parties</label>
            <input
              type="text"
              value={formData.party}
              onChange={(e) => setFormData({ ...formData, party: e.target.value })}
              className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 focus:outline-none transition-all"
              placeholder="e.g., Plaintiff: Smith, Defendant: Johnson"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 focus:outline-none transition-all"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 focus:outline-none transition-all"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Assigned To</label>
              <input
                type="text"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 focus:outline-none transition-all"
                placeholder="e.g., Sarah Chen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 focus:outline-none transition-all"
                placeholder="e.g., Los Angeles, CA"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 focus:outline-none transition-all"
                placeholder="$250,000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Next Hearing</label>
              <input
                type="date"
                value={formData.nextHearing}
                onChange={(e) => setFormData({ ...formData, nextHearing: e.target.value })}
                className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Create Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCaseModal;