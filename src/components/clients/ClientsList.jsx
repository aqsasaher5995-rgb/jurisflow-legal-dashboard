import React, { useState } from 'react';
import { 
  FaUser, FaEnvelope, FaPhone, FaBuilding, 
  FaCalendarAlt, FaCheckCircle, FaClock,
  FaSearch, FaPlusCircle, FaEdit, FaTrash,
  FaUsers, FaFileAlt, FaEye, FaTimes,
  FaSave, FaMapMarkerAlt, FaBriefcase
} from 'react-icons/fa';

const ClientsList = ({ clients, onAddClient, onEditClient, onDeleteClient }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    status: 'active',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredClients = clients.filter(client =>
    client.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status) => {
    return status === 'active' 
      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      : 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  };

  const getStatusDot = (status) => {
    return status === 'active' 
      ? 'bg-emerald-400'
      : 'bg-amber-400';
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
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=4f46e5&color=fff&size=50`,
    };
    
    if (onAddClient) {
      onAddClient(newClient);
    }
    
    setIsSubmitting(false);
    setShowAddModal(false);
    resetForm();
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
  };

  // Handle Delete Client
  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      if (onDeleteClient) {
        onDeleteClient(clientId);
      }
      setSelectedClient(null);
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
  };

  // Add Client Modal
  const AddClientModal = () => {
    if (!showAddModal) return null;

    return (
      <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
        <div className="modal-content glow-view-card relative" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setShowAddModal(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <FaUser className="text-blue-400 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Add New Client</h3>
                <p className="text-xs text-gray-400">Enter client details below</p>
              </div>
            </div>

            <form onSubmit={handleAddClient} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="client@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="Street address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50"
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

  // Edit Client Modal
  const EditClientModal = () => {
    if (!showEditModal || !selectedClient) return null;

    return (
      <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
        <div className="modal-content glow-view-card relative" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setShowEditModal(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                <FaEdit className="text-yellow-400 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Edit Client</h3>
                <p className="text-xs text-gray-400">Update client details</p>
              </div>
            </div>

            <form onSubmit={handleEditClient} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedClient(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 disabled:opacity-50"
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

  // Client Detail Modal
  const ClientDetailModal = () => {
    if (!selectedClient || showEditModal) return null;

    return (
      <div className="modal-overlay" onClick={() => setSelectedClient(null)}>
        <div className="modal-content glow-view-card relative" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setSelectedClient(null)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
          
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/25">
                {selectedClient.name?.split(' ').map(n => n[0]).join('') || '?'}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedClient.name}</h3>
                <p className="text-sm text-gray-400">{selectedClient.company}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(selectedClient.status)}`}>
              <span className={`inline-block w-2 h-2 rounded-full ${getStatusDot(selectedClient.status)} mr-1.5`}></span>
              {selectedClient.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaEnvelope className="text-[10px]" /> Email
              </p>
              <p className="text-sm text-white">{selectedClient.email}</p>
            </div>
            <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaPhone className="text-[10px]" /> Phone
              </p>
              <p className="text-sm text-white">{selectedClient.phone || 'N/A'}</p>
            </div>
            <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaBriefcase className="text-[10px]" /> Total Cases
              </p>
              <p className="text-sm text-white">{selectedClient.cases || 0}</p>
            </div>
            <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaCalendarAlt className="text-[10px]" /> Joined
              </p>
              <p className="text-sm text-white">{selectedClient.joined ? new Date(selectedClient.joined).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>

          {selectedClient.address && (
            <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaMapMarkerAlt className="text-[10px]" /> Address
              </p>
              <p className="text-sm text-white">{selectedClient.address}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
            <button
              onClick={() => openEditModal(selectedClient)}
              className="flex-1 px-4 py-2 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition-colors font-medium"
            >
              <FaEdit className="inline mr-2" /> Edit
            </button>
            <button
              onClick={() => handleDeleteClient(selectedClient.id)}
              className="flex-1 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors font-medium"
            >
              <FaTrash className="inline mr-2" /> Delete
            </button>
            <button
              onClick={() => setSelectedClient(null)}
              className="flex-1 px-4 py-2 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0a0a0f] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Clients</h2>
          <p className="text-sm text-gray-400 mt-1">Manage your clients and their cases</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        >
          <FaPlusCircle className="text-sm" />
          Add Client
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
        <input
          type="text"
          placeholder="Search clients by name, email, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-xl text-gray-200 placeholder:text-gray-500 focus:bg-[rgba(255,255,255,0.08)] focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 focus:outline-none transition-all duration-200"
        />
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredClients.map((client) => (
          <div key={client.id} className="glow-card relative">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {client.avatar ? (
                  <img 
                    src={client.avatar} 
                    alt={client.name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                    {client.name?.split(' ').map(n => n[0]).join('') || '?'}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-white">{client.name}</h3>
                  <p className="text-xs text-gray-400">{client.company}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusStyle(client.status)}`}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${getStatusDot(client.status)} mr-1`}></span>
                {client.status}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <FaEnvelope className="text-gray-500 text-xs" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <FaPhone className="text-gray-500 text-xs" />
                <span>{client.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <FaFileAlt className="text-gray-500 text-xs" />
                <span>{client.cases || 0} cases</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <FaCalendarAlt className="text-gray-500 text-xs" />
                <span>Joined {client.joined ? new Date(client.joined).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.05)] flex justify-end gap-2">
              <button 
                onClick={() => setSelectedClient(client)}
                className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-[rgba(79,70,229,0.15)] rounded-lg transition-all duration-200"
                title="View Details"
              >
                <FaEye className="text-sm" />
              </button>
              <button 
                onClick={() => openEditModal(client)}
                className="p-1.5 text-yellow-400 hover:text-yellow-300 hover:bg-[rgba(234,179,8,0.15)] rounded-lg transition-all duration-200"
                title="Edit Client"
              >
                <FaEdit className="text-sm" />
              </button>
              <button 
                onClick={() => handleDeleteClient(client.id)}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-[rgba(239,68,68,0.15)] rounded-lg transition-all duration-200"
                title="Delete Client"
              >
                <FaTrash className="text-sm" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {searchQuery ? 'No clients found' : 'No clients yet'}
            </h3>
            <p className="text-gray-400 text-sm">
              {searchQuery ? 'Try adjusting your search' : 'Add your first client to get started'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <FaPlusCircle className="text-xs" />
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
    </div>
  );
};

export default ClientsList;