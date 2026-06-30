import React, { useState } from 'react';
import { 
  FaUser, FaEnvelope, FaPhone, FaBuilding, 
  FaCalendarAlt, FaCheckCircle, FaClock,
  FaSearch, FaPlusCircle, FaEdit, FaTrash,
  FaUsers, FaFileAlt, FaEye, FaTimes
} from 'react-icons/fa';

const ClientsList = ({ clients }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status) => {
    return status === 'active' 
      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      : 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  };

  return (
    <div className="bg-[#0a0a0f] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Clients</h2>
          <p className="text-sm text-gray-400 mt-1">Manage your clients and their cases</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
          <FaPlusCircle className="text-sm" />
          Add Client
        </button>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredClients.map((client) => (
          <div key={client.id} className="glow-card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{client.name}</h3>
                  <p className="text-xs text-gray-400">{client.company}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusStyle(client.status)}`}>
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
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <FaFileAlt className="text-gray-500 text-xs" />
                <span>{client.cases} cases</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <FaCalendarAlt className="text-gray-500 text-xs" />
                <span>Joined {new Date(client.joined).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.05)] flex justify-end gap-2">
              <button 
                onClick={() => setSelectedClient(client)}
                className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-[rgba(79,70,229,0.15)] rounded-lg transition-all duration-200"
              >
                <FaEye className="text-sm" />
              </button>
              <button className="p-1.5 text-yellow-400 hover:text-yellow-300 hover:bg-[rgba(234,179,8,0.15)] rounded-lg transition-all duration-200">
                <FaEdit className="text-sm" />
              </button>
              <button className="p-1.5 text-red-400 hover:text-red-300 hover:bg-[rgba(239,68,68,0.15)] rounded-lg transition-all duration-200">
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
            <h3 className="text-lg font-semibold text-white mb-1">No clients found</h3>
            <p className="text-gray-400 text-sm">Add your first client to get started</p>
          </div>
        </div>
      )}

      {/* Client Detail Modal */}
      {selectedClient && (
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
                  {selectedClient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedClient.name}</h3>
                  <p className="text-sm text-gray-400">{selectedClient.company}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(selectedClient.status)}`}>
                {selectedClient.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm text-white">{selectedClient.email}</p>
              </div>
              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm text-white">{selectedClient.phone}</p>
              </div>
              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                <p className="text-xs text-gray-500">Total Cases</p>
                <p className="text-sm text-white">{selectedClient.cases}</p>
              </div>
              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                <p className="text-xs text-gray-500">Joined</p>
                <p className="text-sm text-white">{new Date(selectedClient.joined).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-sm text-white">{selectedClient.address}</p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
              <button className="flex-1 px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors font-medium">
                Edit Client
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
      )}
    </div>
  );
};

export default ClientsList;