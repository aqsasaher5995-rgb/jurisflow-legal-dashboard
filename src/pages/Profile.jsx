import React, { useState } from 'react';
import { 
  FaUser, FaEnvelope, FaPhone, FaBuilding, FaMapMarkerAlt, 
  FaEdit, FaSave, FaTimes, FaCamera, FaBriefcase, FaCalendarAlt, 
  FaUserCircle, FaArrowLeft, FaCog, FaShieldAlt, FaBell, FaPalette
} from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Profile = ({ onNavigate }) => {
  const { user, updateProfile, getUserInitials, getDisplayName } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    address: user?.address || '',
    role: user?.role || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Go back to previous page
  const goBack = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      company: user?.company || '',
      address: user?.address || '',
      role: user?.role || '',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={goBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group"
      >
        <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="bg-[#0a0a0f] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Profile</h2>
            <p className="text-sm text-gray-400 mt-1">Manage your personal information</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-all duration-200"
            >
              <FaEdit className="text-sm" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200"
              >
                <FaTimes className="inline mr-1" /> Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50"
              >
                <FaSave className="inline mr-1" /> {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
          {/* Avatar & Name */}
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-500/25">
                {getUserInitials()}
              </div>
              <button 
                onClick={() => toast.info('Avatar upload coming soon!')}
                className="absolute bottom-0 right-0 p-1.5 bg-[rgba(255,255,255,0.1)] rounded-full border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-colors"
              >
                <FaCamera className="text-xs text-gray-400" />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{getDisplayName()}</h3>
              <p className="text-sm text-gray-400">{user?.role || 'User'}</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <FaCalendarAlt className="text-[10px]" />
                Member since {user?.joined ? new Date(user.joined).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>

          {/* Profile Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaUser className="text-[10px]" /> Full Name
              </p>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none transition-all"
                />
              ) : (
                <p className="text-sm text-white">{formData.name || 'N/A'}</p>
              )}
            </div>

            <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaEnvelope className="text-[10px]" /> Email
              </p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none transition-all"
                />
              ) : (
                <p className="text-sm text-white">{formData.email || 'N/A'}</p>
              )}
            </div>

            <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaPhone className="text-[10px]" /> Phone
              </p>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none transition-all"
                />
              ) : (
                <p className="text-sm text-white">{formData.phone || 'N/A'}</p>
              )}
            </div>

            <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaBriefcase className="text-[10px]" /> Role
              </p>
              {isEditing ? (
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none transition-all"
                >
                  <option value="admin">Admin</option>
                  <option value="attorney">Attorney</option>
                  <option value="paralegal">Paralegal</option>
                  <option value="client">Client</option>
                </select>
              ) : (
                <p className="text-sm text-white">{formData.role || 'N/A'}</p>
              )}
            </div>

            <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)] md:col-span-2">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaBuilding className="text-[10px]" /> Company
              </p>
              {isEditing ? (
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none transition-all"
                />
              ) : (
                <p className="text-sm text-white">{formData.company || 'N/A'}</p>
              )}
            </div>

            <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)] md:col-span-2">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaMapMarkerAlt className="text-[10px]" /> Address
              </p>
              {isEditing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full mt-1 px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none transition-all"
                />
              ) : (
                <p className="text-sm text-white">{formData.address || 'N/A'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button 
            onClick={() => onNavigate && onNavigate('settings')}
            className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)] text-center hover:bg-[rgba(255,255,255,0.06)] transition-colors group"
          >
            <FaCog className="text-blue-400 text-xl mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <p className="text-xs text-gray-400">Settings</p>
          </button>
          <button 
            onClick={() => toast.info('Security settings coming soon!')}
            className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)] text-center hover:bg-[rgba(255,255,255,0.06)] transition-colors group"
          >
            <FaShieldAlt className="text-emerald-400 text-xl mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <p className="text-xs text-gray-400">Security</p>
          </button>
          <button 
            onClick={() => toast.info('Notification settings coming soon!')}
            className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)] text-center hover:bg-[rgba(255,255,255,0.06)] transition-colors group"
          >
            <FaBell className="text-amber-400 text-xl mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <p className="text-xs text-gray-400">Notifications</p>
          </button>
          <button 
            onClick={() => toast.info('Appearance settings coming soon!')}
            className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)] text-center hover:bg-[rgba(255,255,255,0.06)] transition-colors group"
          >
            <FaPalette className="text-purple-400 text-xl mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <p className="text-xs text-gray-400">Appearance</p>
          </button>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)] text-center">
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-xs text-gray-500">Total Cases</p>
          </div>
          <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)] text-center">
            <p className="text-2xl font-bold text-emerald-400">8</p>
            <p className="text-xs text-gray-500">Active Cases</p>
          </div>
          <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)] text-center">
            <p className="text-2xl font-bold text-amber-400">3</p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
          <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)] text-center">
            <p className="text-2xl font-bold text-gray-400">1</p>
            <p className="text-xs text-gray-500">Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;