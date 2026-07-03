import React, { useState } from 'react';
import { 
  FaPalette, FaBell, FaLock, FaLanguage, 
  FaUserCog, FaShieldAlt, FaSave, FaTimes,
  FaMoon, FaSun, FaGlobe, FaEnvelope, FaPhone,
  FaKey, FaDesktop, FaMobile, FaDatabase,
  FaUser, FaCog
} from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, changePassword } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    caseUpdates: true,
    hearingReminders: true,
    weeklyReports: false,
  });

  // Theme Settings
  const [themeSettings, setThemeSettings] = useState({
    theme: 'dark',
    fontSize: 'medium',
    compactMode: false,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FaUserCog },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
  ];

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const result = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      if (result.success) {
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationToggle = (key) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast.success(`${key} ${!notificationSettings[key] ? 'enabled' : 'disabled'}`);
  };

  const handleThemeChange = (key, value) => {
    setThemeSettings(prev => ({
      ...prev,
      [key]: value,
    }));
    toast.success('Theme settings updated');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Profile Settings</h3>
            <p className="text-sm text-gray-400">Manage your profile information</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                <label className="text-xs text-gray-500 block mb-1">Display Name</label>
                <p className="text-sm text-white">{user?.name || 'N/A'}</p>
              </div>
              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                <label className="text-xs text-gray-500 block mb-1">Email</label>
                <p className="text-sm text-white">{user?.email || 'N/A'}</p>
              </div>
              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                <label className="text-xs text-gray-500 block mb-1">Role</label>
                <p className="text-sm text-white">{user?.role || 'User'}</p>
              </div>
              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                <label className="text-xs text-gray-500 block mb-1">Member Since</label>
                <p className="text-sm text-white">{user?.joined ? new Date(user.joined).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            <button className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-all duration-200">
              <FaUserCog className="inline mr-2" /> Edit Profile
            </button>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Security Settings</h3>
            <p className="text-sm text-gray-400">Change your password and security preferences</p>

            {/* Change Password */}
            <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
              <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <FaKey className="text-blue-400" />
                Change Password
              </h4>
              <form onSubmit={handlePasswordChange} className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none transition-all"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none transition-all"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none transition-all"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-all duration-200 disabled:opacity-50"
                >
                  <FaSave className="inline mr-2" /> {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>

            {/* 2FA Toggle */}
            <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white flex items-center gap-2">
                    <FaShieldAlt className="text-blue-400" />
                    Two-Factor Authentication
                  </h4>
                  <p className="text-xs text-gray-400">Add an extra layer of security</p>
                </div>
                <button className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-all duration-200 text-sm">
                  Enable
                </button>
              </div>
            </div>

            {/* Sessions */}
            <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
              <h4 className="text-sm font-medium text-white flex items-center gap-2">
                <FaDesktop className="text-blue-400" />
                Active Sessions
              </h4>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between p-2 bg-[rgba(255,255,255,0.03)] rounded-lg">
                  <div>
                    <p className="text-sm text-white">Chrome on Windows</p>
                    <p className="text-xs text-gray-500">Current session</p>
                  </div>
                  <span className="text-xs text-emerald-400">Active</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[rgba(255,255,255,0.03)] rounded-lg">
                  <div>
                    <p className="text-sm text-white">Safari on iPhone</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                  <button className="text-xs text-red-400 hover:text-red-300 transition-colors">Revoke</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Notification Settings</h3>
            <p className="text-sm text-gray-400">Manage how you receive notifications</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                <div>
                  <p className="text-sm text-white">Email Notifications</p>
                  <p className="text-xs text-gray-400">Receive updates via email</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('emailNotifications')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    notificationSettings.emailNotifications
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  {notificationSettings.emailNotifications ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                <div>
                  <p className="text-sm text-white">Push Notifications</p>
                  <p className="text-xs text-gray-400">Receive push notifications</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('pushNotifications')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    notificationSettings.pushNotifications
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  {notificationSettings.pushNotifications ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                <div>
                  <p className="text-sm text-white">Case Updates</p>
                  <p className="text-xs text-gray-400">Get notified about case changes</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('caseUpdates')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    notificationSettings.caseUpdates
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  {notificationSettings.caseUpdates ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                <div>
                  <p className="text-sm text-white">Hearing Reminders</p>
                  <p className="text-xs text-gray-400">Get reminded about hearings</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('hearingReminders')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    notificationSettings.hearingReminders
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  {notificationSettings.hearingReminders ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                <div>
                  <p className="text-sm text-white">Weekly Reports</p>
                  <p className="text-xs text-gray-400">Receive weekly summary reports</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('weeklyReports')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    notificationSettings.weeklyReports
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  {notificationSettings.weeklyReports ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Appearance Settings</h3>
            <p className="text-sm text-gray-400">Customize how the app looks</p>

            <div className="space-y-3">
              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                <label className="text-sm text-white block mb-2">Theme</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleThemeChange('theme', 'dark')}
                    className={`flex-1 p-2 rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 ${
                      themeSettings.theme === 'dark'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)]'
                    }`}
                  >
                    <FaMoon className="text-blue-400" />
                    <span className="text-sm text-white">Dark</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange('theme', 'light')}
                    className={`flex-1 p-2 rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 ${
                      themeSettings.theme === 'light'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)]'
                    }`}
                  >
                    <FaSun className="text-yellow-400" />
                    <span className="text-sm text-white">Light</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                <label className="text-sm text-white block mb-2">Font Size</label>
                <div className="flex gap-3">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleThemeChange('fontSize', size)}
                      className={`flex-1 p-2 rounded-lg border transition-all duration-200 ${
                        themeSettings.fontSize === size
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)]'
                      }`}
                    >
                      <span className={`text-sm ${
                        size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg' : 'text-sm'
                      } text-white`}>
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                <div>
                  <p className="text-sm text-white">Compact Mode</p>
                  <p className="text-xs text-gray-400">Reduce spacing for more content</p>
                </div>
                <button
                  onClick={() => handleThemeChange('compactMode', !themeSettings.compactMode)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    themeSettings.compactMode
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  {themeSettings.compactMode ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <p className="text-gray-400">Coming soon...</p>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-[#0a0a0f] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            <p className="text-sm text-gray-400 mt-1">Manage your account preferences</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 p-1 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                activeTab === tab.id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              <tab.icon className="text-sm" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;