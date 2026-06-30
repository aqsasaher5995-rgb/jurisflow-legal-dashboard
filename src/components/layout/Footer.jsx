import React, { useState } from 'react';
import { 
  FaTwitter, FaLinkedin, FaGithub, FaEnvelope,
  FaPhone, FaMapMarkerAlt, FaHeart, FaArrowUp,
  FaFacebook, FaInstagram, FaYoutube, FaGlobe
} from 'react-icons/fa';
import { GiScales } from 'react-icons/gi';
import { IoMdHelpCircle } from 'react-icons/io';

const Footer = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-[rgba(79,70,229,0.15)] mt-12 overflow-hidden">
      {/* Glowing Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4f46e5] to-transparent opacity-30"></div>
      
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4f46e5] rounded-full filter blur-3xl opacity-5 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7c3aed] rounded-full filter blur-3xl opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <div className="flex items-center gap-2 pt-2">
              <a href="#" className="p-2.5 text-gray-400 hover:text-[#4f46e5] hover:bg-[rgba(79,70,229,0.1)] rounded-xl transition-all duration-200 hover:scale-110">
                <FaTwitter className="text-lg" />
              </a>
              <a href="#" className="p-2.5 text-gray-400 hover:text-[#4f46e5] hover:bg-[rgba(79,70,229,0.1)] rounded-xl transition-all duration-200 hover:scale-110">
                <FaLinkedin className="text-lg" />
              </a>
              <a href="#" className="p-2.5 text-gray-400 hover:text-[#4f46e5] hover:bg-[rgba(79,70,229,0.1)] rounded-xl transition-all duration-200 hover:scale-110">
                <FaFacebook className="text-lg" />
              </a>
              <a href="#" className="p-2.5 text-gray-400 hover:text-[#4f46e5] hover:bg-[rgba(79,70,229,0.1)] rounded-xl transition-all duration-200 hover:scale-110">
                <FaInstagram className="text-lg" />
              </a>
              <a href="#" className="p-2.5 text-gray-400 hover:text-[#4f46e5] hover:bg-[rgba(79,70,229,0.1)] rounded-xl transition-all duration-200 hover:scale-110">
                <FaYoutube className="text-lg" />
              </a>
              <a href="#" className="p-2.5 text-gray-400 hover:text-[#4f46e5] hover:bg-[rgba(79,70,229,0.1)] rounded-xl transition-all duration-200 hover:scale-110">
                <FaGithub className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-[#818cf8] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full group-hover:scale-150 transition-transform"></span>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-[#818cf8] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full group-hover:scale-150 transition-transform"></span>
                  All Cases
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-[#818cf8] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full group-hover:scale-150 transition-transform"></span>
                  Clients
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-[#818cf8] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full group-hover:scale-150 transition-transform"></span>
                  Calendar
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-[#818cf8] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full group-hover:scale-150 transition-transform"></span>
                  Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-[#818cf8] transition-colors flex items-center gap-2 group">
                  <IoMdHelpCircle className="group-hover:rotate-12 transition-transform" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-[#818cf8] transition-colors flex items-center gap-2 group">
                  <FaGlobe className="group-hover:rotate-12 transition-transform" />
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-[#818cf8] transition-colors flex items-center gap-2 group">
                  <FaEnvelope className="group-hover:scale-110 transition-transform" />
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-[#818cf8] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  System Status
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400 hover:text-gray-300 transition-colors group">
                <FaMapMarkerAlt className="text-[#4f46e5] mt-0.5 group-hover:scale-110 transition-transform" />
                <span>123 Legal Street, Suite 100<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400 hover:text-gray-300 transition-colors group">
                <FaPhone className="text-[#4f46e5] group-hover:scale-110 transition-transform" />
                <a href="tel:+15551234567" className="hover:text-[#818cf8]">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400 hover:text-gray-300 transition-colors group">
                <FaEnvelope className="text-[#4f46e5] group-hover:scale-110 transition-transform" />
                <a href="mailto:support@jurisflow.com" className="hover:text-[#818cf8]">support@jurisflow.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <span className="w-4"></span>
                <span className="text-xs">Mon - Fri: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>

            {/* Newsletter Button */}
            <button 
              onClick={() => setShowNewsletter(!showNewsletter)}
              className="mt-4 w-full px-4 py-2 bg-[rgba(79,70,229,0.1)] text-[#818cf8] border border-[rgba(79,70,229,0.2)] rounded-xl hover:bg-[rgba(79,70,229,0.2)] transition-all duration-200 text-sm font-medium"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.05)]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>© {currentYear} JurisFlow. All rights reserved.</span>
              <span className="hidden sm:inline text-gray-600">|</span>
              <span className="flex items-center gap-1 text-xs">
                Made with <FaHeart className="text-red-400 text-xs animate-pulse" /> by JurisFlow Team
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</a>
              <button
                onClick={scrollToTop}
                className="p-2.5 bg-[rgba(79,70,229,0.1)] hover:bg-[rgba(79,70,229,0.2)] text-[#818cf8] rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-[#4f46e5]/20"
                title="Back to top"
              >
                <FaArrowUp className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;