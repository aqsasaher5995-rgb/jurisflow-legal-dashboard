
import React, { useState, useEffect } from 'react';
import { 
  FaTwitter, FaLinkedin, FaGithub, FaEnvelope,
  FaPhone, FaMapMarkerAlt, FaHeart, FaArrowUp,
  FaFacebook, FaInstagram, FaYoutube,
  FaHome, FaGavel, FaUsers, FaCalendarAlt, FaChartBar,
  FaCheckCircle, FaBook, FaFileAlt,
  FaShieldAlt, FaCookie,
  FaPaperPlane, FaClock, FaBuilding,
  FaBookOpen, FaHeadset,
  FaInfoCircle, FaCode, FaServer, FaLock,
  FaExternalLinkAlt, FaDownload,
  FaVideo, FaComments, FaQuestion,
  FaFilePdf, FaFileCode, FaFileContract,
  FaKey, FaGlobe as FaGlobeIcon, FaDatabase,
  FaUserShield, FaGavel as FaGavelIcon,
  FaTimes, FaCopy, FaStar, FaUser, FaCreditCard, FaCog,
  FaFileContract as FaTerms,
  FaBullseye  // ← Added FaBullseye
} from 'react-icons/fa';
import { GiScales } from 'react-icons/gi';

const Footer = ({ stats = {}, onNavigate, activePage }) => {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSupport, setActiveSupport] = useState(null);
  const [activeLegal, setActiveLegal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const currentYear = new Date().getFullYear();

  // Show toast notification
  const showToast = (message) => {
    setToastMessage({ message });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation handler
  const handleNavigation = (path) => {
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate(path);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      showToast('✅ Subscribed to newsletter successfully!');
      setNewsletterEmail('');
      setTimeout(() => setShowNewsletter(false), 2000);
    }
  };

  // ============================================
  // SUPPORT INNER BUTTONS
  // ============================================
  
  const handleSupportItemClick = (item, category) => {
    const actionMap = {
      'Getting Started Guide': '📖 Opening Getting Started Guide...',
      'Video Tutorials': '🎬 Opening Video Tutorials...',
      'FAQ Database': '❓ Opening FAQ Database...',
      'Community Forum': '💬 Opening Community Forum...',
      'Live Chat Support': '💬 Connecting to Live Chat...',
      'User Manual (PDF)': '📄 Downloading User Manual...',
      'API Documentation': '🔗 Opening API Documentation...',
      'Integration Guide': '🔗 Opening Integration Guide...',
      'Release Notes': '📋 Opening Release Notes...',
      'Best Practices': '⭐ Opening Best Practices Guide...',
      'Authentication Guide': '🔑 Opening Authentication Guide...',
      'Endpoints Reference': '🔗 Opening Endpoints Reference...',
      'Webhooks Documentation': '🔗 Opening Webhooks Documentation...',
      'Rate Limits': '📊 Opening Rate Limits Info...',
      'SDK Libraries': '📦 Opening SDK Libraries...',
      'API Services': '🟢 API Services are operational',
      'Database': '🟢 Database is operational',
      'Authentication': '🟢 Authentication is operational',
      'File Storage': '🟢 File Storage is operational',
      'Email Service': '🟢 Email Service is operational',
    };

    const message = actionMap[item] || `📌 ${item} - Opening...`;
    showToast(message);
  };

  const handleOpenSupport = (category) => {
    showToast(`🔗 Opening ${category}...`);
  };

  const handleDownloadSupport = (category) => {
    showToast(`⬇️ Downloading ${category} documentation...`);
  };

  const handleCopySupport = (text) => {
    navigator.clipboard?.writeText(text).then(() => {
      showToast('📋 Copied to clipboard!');
    }).catch(() => {
      showToast('📋 Copy: ' + text);
    });
  };

  // ============================================
  // LEGAL BUTTON HANDLERS
  // ============================================
  
  const handleLegalClick = (action) => {
    const data = legalData[action];
    if (data) {
      setActiveLegal(activeLegal === action ? null : action);
    } else {
      showToast(`📌 ${action}`);
    }
  };

  const handleLegalItemClick = (item, category) => {
    const actionMap = {
      'Data Collection Practices': '📋 Opening Data Collection Practices...',
      'Data Usage and Sharing': '📋 Opening Data Usage and Sharing...',
      'Data Retention Policy': '📋 Opening Data Retention Policy...',
      'User Rights and Choices': '👤 Opening User Rights and Choices...',
      'Contact Privacy Officer': '📧 Opening Contact Privacy Officer...',
      'Acceptance of Terms': '📋 Opening Acceptance of Terms...',
      'User Account Terms': '👤 Opening User Account Terms...',
      'Service Usage Guidelines': '📋 Opening Service Usage Guidelines...',
      'Payment and Billing': '💳 Opening Payment and Billing...',
      'Termination and Suspension': '⛔ Opening Termination and Suspension...',
      'Essential Cookies': '🍪 Opening Essential Cookies...',
      'Analytics Cookies': '📊 Opening Analytics Cookies...',
      'Marketing Cookies': '🎯 Opening Marketing Cookies...',
      'Cookie Consent Management': '⚙️ Opening Cookie Consent Management...',
      'Third-Party Cookie Policy': '🍪 Opening Third-Party Cookie Policy...',
    };

    const message = actionMap[item] || `📌 ${item} - Opening...`;
    showToast(message);
  };

  const handleOpenLegal = (category) => {
    showToast(`🔗 Opening ${category}...`);
  };

  const handleDownloadLegal = (category) => {
    showToast(`⬇️ Downloading ${category} documentation...`);
  };

  const handleSupportClick = (action) => {
    const data = supportData[action];
    if (data) {
      setActiveSupport(activeSupport === action ? null : action);
    } else {
      showToast(`📌 ${action}`);
    }
  };

  // Close support/legal info when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.support-section') && !e.target.closest('.legal-section')) {
        setActiveSupport(null);
        setActiveLegal(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // ============================================
  // SUPPORT DATA
  // ============================================
  
  const supportData = {
    'Help Center': {
      title: 'Help Center',
      description: 'Find answers to common questions and get help with JurisFlow.',
      icon: FaHeadset,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      items: [
        { icon: FaBook, label: 'Getting Started Guide' },
        { icon: FaVideo, label: 'Video Tutorials' },
        { icon: FaQuestion, label: 'FAQ Database' },
        { icon: FaComments, label: 'Community Forum' },
        { icon: FaComments, label: 'Live Chat Support' },
      ]
    },
    'Documentation': {
      title: 'Documentation',
      description: 'Comprehensive documentation for JurisFlow features and APIs.',
      icon: FaBookOpen,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      items: [
        { icon: FaFilePdf, label: 'User Manual (PDF)' },
        { icon: FaFileCode, label: 'API Documentation' },
        { icon: FaFileContract, label: 'Integration Guide' },
        { icon: FaFileAlt, label: 'Release Notes' },
        { icon: FaStar, label: 'Best Practices' },
      ]
    },
    'API Reference': {
      title: 'API Reference',
      description: 'Complete API reference for developers integrating with JurisFlow.',
      icon: FaCode,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      items: [
        { icon: FaKey, label: 'Authentication Guide' },
        { icon: FaGlobeIcon, label: 'Endpoints Reference' },
        { icon: FaGlobeIcon, label: 'Webhooks Documentation' },
        { icon: FaChartBar, label: 'Rate Limits' },
        { icon: FaDatabase, label: 'SDK Libraries' },
      ]
    },
    'System Status': {
      title: 'System Status',
      description: 'Real-time status of JurisFlow services and infrastructure.',
      icon: FaServer,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      status: 'All Systems Operational',
      items: [
        { icon: FaCheckCircle, label: 'API Services: Operational' },
        { icon: FaDatabase, label: 'Database: Operational' },
        { icon: FaKey, label: 'Authentication: Operational' },
        { icon: FaServer, label: 'File Storage: Operational' },
        { icon: FaEnvelope, label: 'Email Service: Operational' },
      ]
    },
  };

  // ============================================
  // LEGAL DATA
  // ============================================
  
  const legalData = {
    'Privacy Policy': {
      title: 'Privacy Policy',
      description: 'How JurisFlow collects, uses, and protects your personal data.',
      icon: FaShieldAlt,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      items: [
        { icon: FaFileAlt, label: 'Data Collection Practices' },
        { icon: FaFileAlt, label: 'Data Usage and Sharing' },
        { icon: FaFileAlt, label: 'Data Retention Policy' },
        { icon: FaUser, label: 'User Rights and Choices' },
        { icon: FaEnvelope, label: 'Contact Privacy Officer' },
      ]
    },
    'Terms of Service': {
      title: 'Terms of Service',
      description: 'Terms and conditions for using JurisFlow services.',
      icon: FaTerms,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      items: [
        { icon: FaFileContract, label: 'Acceptance of Terms' },
        { icon: FaUser, label: 'User Account Terms' },
        { icon: FaFileAlt, label: 'Service Usage Guidelines' },
        { icon: FaCreditCard, label: 'Payment and Billing' },
        { icon: FaTimes, label: 'Termination and Suspension' },
      ]
    },
    'Cookie Policy': {
      title: 'Cookie Policy',
      description: 'How JurisFlow uses cookies and similar tracking technologies.',
      icon: FaCookie,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      items: [
        { icon: FaCookie, label: 'Essential Cookies' },
        { icon: FaChartBar, label: 'Analytics Cookies' },
        { icon: FaBullseye, label: 'Marketing Cookies' },  // ← Fixed: FaBullseye
        { icon: FaCog, label: 'Cookie Consent Management' },
        { icon: FaGlobeIcon, label: 'Third-Party Cookie Policy' },
      ]
    },
  };

  // Social media links
  const socialLinks = [
    { icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com', color: 'hover:text-[#1DA1F2]' },
    { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:text-[#0A66C2]' },
    { icon: FaFacebook, label: 'Facebook', url: 'https://facebook.com', color: 'hover:text-[#1877F2]' },
    { icon: FaInstagram, label: 'Instagram', url: 'https://instagram.com', color: 'hover:text-[#E4405F]' },
    { icon: FaYoutube, label: 'YouTube', url: 'https://youtube.com', color: 'hover:text-[#FF0000]' },
    { icon: FaGithub, label: 'GitHub', url: 'https://github.com', color: 'hover:text-[#FFFFFF]' },
  ];

  // Quick links
  const quickLinks = [
    { label: 'Dashboard', path: 'dashboard', icon: FaHome },
    { label: 'All Cases', path: 'cases', icon: FaGavel },
    { label: 'Reference Cases', path: 'reference-cases', icon: FaBook },
    { label: 'Clients', path: 'clients', icon: FaUsers },
    { label: 'Calendar', path: 'calendar', icon: FaCalendarAlt },
    { label: 'Reports', path: 'reports', icon: FaChartBar },
  ];

  // Support links
  const supportLinks = [
    { label: 'Help Center', icon: FaHeadset, action: 'Help Center' },
    { label: 'Documentation', icon: FaBookOpen, action: 'Documentation' },
    { label: 'API Reference', icon: FaCode, action: 'API Reference' },
    { label: 'System Status', icon: FaServer, action: 'System Status', status: 'online' },
  ];

  // Legal links
  const legalLinks = [
    { label: 'Privacy Policy', icon: FaShieldAlt, action: 'Privacy Policy' },
    { label: 'Terms of Service', icon: FaTerms, action: 'Terms of Service' },
    { label: 'Cookie Policy', icon: FaCookie, action: 'Cookie Policy' },
  ];

  // Contact info
  const contactInfo = [
    { icon: FaMapMarkerAlt, text: '123 Legal Street, Suite 100, New York, NY 10001' },
    { icon: FaPhone, text: '+1 (555) 123-4567', link: 'tel:+15551234567' },
    { icon: FaEnvelope, text: 'support@jurisflow.com', link: 'mailto:support@jurisflow.com' },
    { icon: FaClock, text: 'Mon - Fri: 9:00 AM - 6:00 PM' },
  ];

  // ============================================
  // SUPPORT DETAIL POPUP
  // ============================================
  const SupportDetail = ({ action }) => {
    const data = supportData[action];
    if (!data || activeSupport !== action) return null;

    return (
      <div className="absolute bottom-full left-0 mb-2 w-80 bg-[#1a1a2e] rounded-xl border border-white/10 shadow-2xl shadow-black/50 p-4 z-50 support-section max-h-[400px] overflow-y-auto">
        <div className={`flex items-center gap-2 mb-2 ${data.color}`}>
          <data.icon className="text-lg" />
          <h4 className="font-semibold text-white">{data.title}</h4>
        </div>
        <p className="text-xs text-gray-400 mb-3">{data.description}</p>
        {data.status && (
          <div className="flex items-center gap-2 mb-2 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            {data.status}
          </div>
        )}
        <ul className="space-y-1.5">
          {data.items.map((item, idx) => (
            <li key={idx} className="flex items-center justify-between group">
              <button
                onClick={() => handleSupportItemClick(item.label, data.title)}
                className="text-xs text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer flex-1 text-left py-0.5 hover:bg-[rgba(79,70,229,0.1)] rounded px-1"
              >
                <item.icon className="text-[10px] text-gray-500" />
                {item.label}
              </button>
              <button
                onClick={() => handleCopySupport(item.label)}
                className="text-[9px] text-gray-500 hover:text-[#818cf8] transition-colors opacity-0 group-hover:opacity-100 px-1"
                title="Copy"
              >
                <FaCopy className="text-[8px]" />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3 pt-2 border-t border-white/5 flex gap-2">
          <button 
            onClick={() => handleOpenSupport(data.title)}
            className="flex-1 text-[10px] text-[#818cf8] hover:text-white transition-colors flex items-center justify-center gap-1 py-1.5 px-2 bg-[rgba(79,70,229,0.1)] rounded-lg hover:bg-[rgba(79,70,229,0.2)]"
          >
            <FaExternalLinkAlt className="text-[8px]" /> Open
          </button>
          <button 
            onClick={() => handleDownloadSupport(data.title)}
            className="flex-1 text-[10px] text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1 py-1.5 px-2 bg-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)]"
          >
            <FaDownload className="text-[8px]" /> Download
          </button>
          <button 
            onClick={() => showToast(`📋 Copied ${data.title} link`)}
            className="flex-1 text-[10px] text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1 py-1.5 px-2 bg-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)]"
          >
            <FaCopy className="text-[8px]" /> Copy
          </button>
        </div>
        <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-[#1a1a2e] border-r border-b border-white/10 rotate-45"></div>
      </div>
    );
  };

  // ============================================
  // LEGAL DETAIL POPUP
  // ============================================
  const LegalDetail = ({ action }) => {
    const data = legalData[action];
    if (!data || activeLegal !== action) return null;

    return (
      <div className="absolute bottom-full left-0 mb-2 w-80 bg-[#1a1a2e] rounded-xl border border-white/10 shadow-2xl shadow-black/50 p-4 z-50 legal-section max-h-[400px] overflow-y-auto">
        <div className={`flex items-center gap-2 mb-2 ${data.color}`}>
          <data.icon className="text-lg" />
          <h4 className="font-semibold text-white">{data.title}</h4>
        </div>
        <p className="text-xs text-gray-400 mb-3">{data.description}</p>
        <ul className="space-y-1.5">
          {data.items.map((item, idx) => (
            <li key={idx} className="flex items-center justify-between group">
              <button
                onClick={() => handleLegalItemClick(item.label, data.title)}
                className="text-xs text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer flex-1 text-left py-0.5 hover:bg-[rgba(79,70,229,0.1)] rounded px-1"
              >
                <item.icon className="text-[10px] text-gray-500" />
                {item.label}
              </button>
              <button
                onClick={() => handleCopySupport(item.label)}
                className="text-[9px] text-gray-500 hover:text-[#818cf8] transition-colors opacity-0 group-hover:opacity-100 px-1"
                title="Copy"
              >
                <FaCopy className="text-[8px]" />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3 pt-2 border-t border-white/5 flex gap-2">
          <button 
            onClick={() => handleOpenLegal(data.title)}
            className="flex-1 text-[10px] text-[#818cf8] hover:text-white transition-colors flex items-center justify-center gap-1 py-1.5 px-2 bg-[rgba(79,70,229,0.1)] rounded-lg hover:bg-[rgba(79,70,229,0.2)]"
          >
            <FaExternalLinkAlt className="text-[8px]" /> Open
          </button>
          <button 
            onClick={() => handleDownloadLegal(data.title)}
            className="flex-1 text-[10px] text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1 py-1.5 px-2 bg-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)]"
          >
            <FaDownload className="text-[8px]" /> Download
          </button>
          <button 
            onClick={() => showToast(`📋 Copied ${data.title} link`)}
            className="flex-1 text-[10px] text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1 py-1.5 px-2 bg-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)]"
          >
            <FaCopy className="text-[8px]" /> Copy
          </button>
        </div>
        <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-[#1a1a2e] border-r border-b border-white/10 rotate-45"></div>
      </div>
    );
  };

  // Toast notification
  const ToastNotification = () => {
    if (!toastMessage) return null;
    return (
      <div className="fixed bottom-24 right-6 z-[9999] px-4 py-2.5 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl shadow-black/50 text-sm text-white animate-in slide-in-from-right duration-300 flex items-center gap-2">
        <span>{toastMessage.message}</span>
      </div>
    );
  };

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-[rgba(79,70,229,0.15)] mt-12 overflow-visible">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4f46e5] to-transparent opacity-30"></div>
      
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4f46e5] rounded-full filter blur-3xl opacity-5 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7c3aed] rounded-full filter blur-3xl opacity-5 pointer-events-none"></div>

      <ToastNotification />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] p-2.5 rounded-xl shadow-lg shadow-[#4f46e5]/25">
                <GiScales className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#06b6d4] bg-clip-text text-transparent">
                  JurisFlow
                </h2>
                <p className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">Legal Case Management</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering legal professionals with cutting-edge case management solutions. 
              Streamline your workflow and deliver exceptional results.
            </p>
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 text-gray-400 ${social.color} hover:bg-[rgba(79,70,229,0.1)] rounded-xl transition-all duration-200 hover:scale-110`}
                  aria-label={social.label}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => {
                const isActive = activePage === link.path;
                return (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className={`text-sm transition-colors flex items-center gap-2.5 group w-full text-left ${
                        isActive ? 'text-[#818cf8]' : 'text-gray-400 hover:text-[#818cf8]'
                      }`}
                    >
                      <link.icon className={`text-xs ${isActive ? 'text-[#4f46e5]' : 'text-gray-500'}`} />
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Support */}
          <div className="relative support-section">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link, index) => (
                <li key={index} className="relative">
                  <button
                    onClick={() => handleSupportClick(link.action)}
                    className={`text-sm transition-colors flex items-center gap-2.5 group w-full text-left ${
                      activeSupport === link.action ? 'text-[#818cf8]' : 'text-gray-400 hover:text-[#818cf8]'
                    }`}
                  >
                    <link.icon className="text-xs text-gray-500" />
                    {link.label}
                    {link.status === 'online' && (
                      <span className="ml-auto text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                        Online
                      </span>
                    )}
                    <FaExternalLinkAlt className="text-[8px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <SupportDetail action={link.action} />
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div className="relative legal-section">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link, index) => (
                <li key={index} className="relative">
                  <button
                    onClick={() => handleLegalClick(link.action)}
                    className={`text-sm transition-colors flex items-center gap-2.5 group w-full text-left ${
                      activeLegal === link.action ? 'text-[#818cf8]' : 'text-gray-400 hover:text-[#818cf8]'
                    }`}
                  >
                    <link.icon className="text-xs text-gray-500" />
                    {link.label}
                    <FaExternalLinkAlt className="text-[8px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <LegalDetail action={link.action} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2.5">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-gray-400">
                  <item.icon className="text-[#4f46e5] text-xs mt-0.5 flex-shrink-0" />
                  {item.link ? (
                    <a href={item.link} className="hover:text-[#818cf8] transition-colors">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-4">
              {!showNewsletter ? (
                <button 
                  onClick={() => setShowNewsletter(true)}
                  className="w-full px-4 py-2 bg-[rgba(79,70,229,0.1)] text-[#818cf8] border border-[rgba(79,70,229,0.2)] rounded-xl hover:bg-[rgba(79,70,229,0.2)] transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2 group"
                >
                  <FaPaperPlane className="text-xs group-hover:translate-x-1 transition-transform" />
                  Subscribe to Newsletter
                </button>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder:text-gray-500 text-sm focus:border-blue-500 focus:outline-none transition-all"
                      required
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                    >
                      Subscribe
                    </button>
                  </div>
                  {newsletterMessage && (
                    <p className="text-xs text-emerald-400">{newsletterMessage}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowNewsletter(false)}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.05)]">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap justify-center">
              <span>© {currentYear} JurisFlow. All rights reserved.</span>
              <span className="text-gray-600">|</span>
              <span className="flex items-center gap-1 text-xs">
                Made with <FaHeart className="text-red-400 text-xs animate-pulse" /> by JurisFlow Team
              </span>
            </div>
            
            <button
              onClick={scrollToTop}
              className={`p-2.5 bg-[rgba(79,70,229,0.1)] hover:bg-[rgba(79,70,229,0.2)] text-[#818cf8] rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-[#4f46e5]/20 ${
                showBackToTop ? 'opacity-100' : 'opacity-50'
              }`}
              title="Back to top"
            >
              <FaArrowUp className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;