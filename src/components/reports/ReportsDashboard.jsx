import React, { useState } from 'react';
import { 
  FaChartBar, FaChartLine, FaChartPie, 
  FaFileDownload, FaCalendarAlt, FaUsers,
  FaGavel, FaCheckCircle, FaClock,
  FaArrowUp, FaArrowDown, FaFilePdf,
  FaFileExcel, FaPrint, FaTimes
} from 'react-icons/fa';

const ReportsDashboard = ({ cases, clients, events }) => {
  const [reportType, setReportType] = useState('overview');
  const [selectedReport, setSelectedReport] = useState(null);

  const stats = {
    totalCases: cases.length,
    activeCases: cases.filter(c => c.status === 'active').length,
    pendingCases: cases.filter(c => c.status === 'pending').length,
    closedCases: cases.filter(c => c.status === 'closed').length,
    totalClients: clients.length,
    totalEvents: events.length,
  };

  const getPriorityCount = (priority) => {
    return cases.filter(c => c.priority === priority).length;
  };

  const getCaseTypeCount = (type) => {
    return cases.filter(c => c.caseType === type).length;
  };

  const reportTypes = [
    { id: 'overview', label: 'Overview', icon: FaChartBar },
    { id: 'cases', label: 'Case Report', icon: FaGavel },
    { id: 'clients', label: 'Client Report', icon: FaUsers },
    { id: 'calendar', label: 'Calendar Report', icon: FaCalendarAlt },
  ];

  const renderReportContent = () => {
    switch (reportType) {
      case 'overview':
        return (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
              <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)] text-center">
                <p className="text-xs text-gray-500">Total Cases</p>
                <p className="text-xl font-bold text-white">{stats.totalCases}</p>
              </div>
              <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-center">
                <p className="text-xs text-gray-400">Active</p>
                <p className="text-xl font-bold text-emerald-400">{stats.activeCases}</p>
              </div>
              <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/10 text-center">
                <p className="text-xs text-gray-400">Pending</p>
                <p className="text-xl font-bold text-amber-400">{stats.pendingCases}</p>
              </div>
              <div className="p-3 bg-gray-500/5 rounded-xl border border-gray-500/10 text-center">
                <p className="text-xs text-gray-400">Closed</p>
                <p className="text-xl font-bold text-gray-400">{stats.closedCases}</p>
              </div>
              <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 text-center">
                <p className="text-xs text-gray-400">Clients</p>
                <p className="text-xl font-bold text-blue-400">{stats.totalClients}</p>
              </div>
              <div className="p-3 bg-purple-500/5 rounded-xl border border-purple-500/10 text-center">
                <p className="text-xs text-gray-400">Events</p>
                <p className="text-xl font-bold text-purple-400">{stats.totalEvents}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Priority Distribution */}
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <FaChartPie className="text-blue-400" />
                  Priority Distribution
                </h3>
                <div className="space-y-2">
                  {['High', 'Urgent', 'Medium', 'Low'].map((priority) => (
                    <div key={priority}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">{priority}</span>
                        <span className="text-white font-medium">{getPriorityCount(priority)}</span>
                      </div>
                      <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            priority === 'High' ? 'bg-red-400' :
                            priority === 'Urgent' ? 'bg-orange-400' :
                            priority === 'Medium' ? 'bg-yellow-400' : 'bg-green-400'
                          }`}
                          style={{ width: `${stats.totalCases > 0 ? (getPriorityCount(priority) / stats.totalCases) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case Type Distribution */}
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <FaChartBar className="text-blue-400" />
                  Case Types
                </h3>
                <div className="space-y-2">
                  {['Civil', 'Criminal', 'Family', 'Civil Rights', 'Personal Injury'].map((type) => (
                    <div key={type}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">{type}</span>
                        <span className="text-white font-medium">{getCaseTypeCount(type)}</span>
                      </div>
                      <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"
                          style={{ width: `${stats.totalCases > 0 ? (getCaseTypeCount(type) / stats.totalCases) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)] lg:col-span-2">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <FaChartLine className="text-blue-400" />
                  Recent Activity
                </h3>
                <div className="space-y-2">
                  {events.slice(0, 5).map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <div>
                          <p className="text-sm text-white">{event.title}</p>
                          <p className="text-xs text-gray-500">{event.type} • {event.location}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      
      case 'cases':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Case Report</h3>
                <p className="text-sm text-gray-400">Detailed case statistics</p>
              </div>
              <button className="px-4 py-2 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                <FaFileDownload className="inline mr-2" /> Export
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                <p className="text-sm text-gray-400">Total Cases</p>
                <p className="text-3xl font-bold text-white">{stats.totalCases}</p>
              </div>
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                <p className="text-sm text-gray-400">Active vs Closed</p>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <span className="text-emerald-400">●</span>
                    <span className="text-sm text-gray-300 ml-1">{stats.activeCases} Active</span>
                  </div>
                  <div>
                    <span className="text-gray-400">●</span>
                    <span className="text-sm text-gray-300 ml-1">{stats.closedCases} Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'clients':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Client Report</h3>
                <p className="text-sm text-gray-400">Client statistics overview</p>
              </div>
              <button className="px-4 py-2 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                <FaFileDownload className="inline mr-2" /> Export
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                <p className="text-sm text-gray-400">Total Clients</p>
                <p className="text-3xl font-bold text-white">{stats.totalClients}</p>
              </div>
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                <p className="text-sm text-gray-400">Active Clients</p>
                <p className="text-3xl font-bold text-emerald-400">
                  {clients.filter(c => c.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'calendar':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Calendar Report</h3>
                <p className="text-sm text-gray-400">Event statistics</p>
              </div>
              <button className="px-4 py-2 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                <FaFileDownload className="inline mr-2" /> Export
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                <p className="text-sm text-gray-400">Total Events</p>
                <p className="text-3xl font-bold text-white">{stats.totalEvents}</p>
              </div>
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                <p className="text-sm text-gray-400">Upcoming Events</p>
                <p className="text-3xl font-bold text-blue-400">
                  {events.filter(e => new Date(e.date) > new Date()).length}
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0a0a0f] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Reports & Analytics</h2>
          <p className="text-sm text-gray-400 mt-1">Generate and view detailed reports</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200">
            <FaFilePdf className="text-sm" />
            PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200">
            <FaFileExcel className="text-sm" />
            Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200">
            <FaPrint className="text-sm" />
            Print
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
        {reportTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setReportType(type.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
              reportType === type.id
                ? 'bg-[#4f46e5] text-white shadow-lg shadow-[#4f46e5]/20'
                : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
            }`}
          >
            <type.icon className="text-sm" />
            {type.label}
          </button>
        ))}
      </div>

      {/* Report Content */}
      {renderReportContent()}
    </div>
  );
};

export default ReportsDashboard;