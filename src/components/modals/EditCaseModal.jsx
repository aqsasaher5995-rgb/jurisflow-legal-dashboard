import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';

const EditCaseModal = ({ isOpen, case: caseItem, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    party: '',
    status: 'active',
    date: '',
    caseType: 'Civil',
    priority: 'Medium',
  });

  useEffect(() => {
    if (caseItem) {
      setFormData({
        title: caseItem.title || '',
        description: caseItem.description || '',
        party: caseItem.party || '',
        status: caseItem.status || 'active',
        date: caseItem.date || new Date().toISOString().split('T')[0],
        caseType: caseItem.caseType || 'Civil',
        priority: caseItem.priority || 'Medium',
      });
    }
  }, [caseItem]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...formData, id: caseItem.id });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl">
              <FaEdit className="text-blue-600 text-xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Edit Case</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FaTimes className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Case Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              placeholder="Enter case title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              rows="3"
              placeholder="Enter case description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parties</label>
            <input
              type="text"
              value={formData.party}
              onChange={(e) => setFormData({ ...formData, party: e.target.value })}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              placeholder="e.g., Plaintiff: Smith, Defendant: Johnson"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Case Type</label>
              <select
                value={formData.caseType}
                onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              >
                <option value="Civil">Civil</option>
                <option value="Criminal">Criminal</option>
                <option value="Family">Family</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
              Update Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCaseModal;