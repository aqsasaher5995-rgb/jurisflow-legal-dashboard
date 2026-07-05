import React from 'react';
import { FaFileAlt, FaClock, FaCheckCircle, FaUsers, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Cases',
      value: stats?.total || 0,
      icon: FaFileAlt,
      color: '#05396B',
      bg: 'bg-[#05396B]/10',
      trend: '+12%',
      up: true,
    },
    {
      title: 'Active Cases',
      value: stats?.active || 0,
      icon: FaClock,
      color: '#389583',
      bg: 'bg-[#389583]/10',
      trend: '+8%',
      up: true,
    },
    {
      title: 'Pending Review',
      value: stats?.pending || 0,
      icon: FaUsers,
      color: '#d97706',
      bg: 'bg-amber-50',
      trend: '-3%',
      up: false,
    },
    {
      title: 'Closed Cases',
      value: stats?.closed || 0,
      icon: FaCheckCircle,
      color: '#6b7280',
      bg: 'bg-gray-50',
      trend: '+24%',
      up: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div key={card.title} className="bg-[#EDF5E0] rounded-xl shadow-sm border border-[#05396B]/15 p-6 hover:shadow-md hover:border-[#05396B]/30 transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#05396B]">{card.title}</p>
              <p className="text-3xl font-bold text-[#05396B] mt-2">{card.value}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-sm font-medium ${card.up ? 'text-[#389583]' : 'text-red-600'}`}>
                  {card.up ? <FaArrowUp className="inline mr-0.5 text-xs" /> : <FaArrowDown className="inline mr-0.5 text-xs" />}
                  {card.trend}
                </span>
                <span className="text-xs text-gray-400">vs last month</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${card.bg}`}>
              <card.icon className="text-xl" style={{ color: card.color }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;