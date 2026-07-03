import React, { useEffect } from 'react';
import { useCaseStore } from '../store/caseStore';
import { useAuthStore } from '../store/authStore';
import StatsCards from '../components/dashboard/StatsCards';
import RecentCases from '../components/dashboard/RecentCases';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { FaUser, FaGavel, FaClock, FaCheckCircle } from 'react-icons/fa';

const Dashboard = () => {
  const { cases, isLoading, fetchCases, getStats } = useCaseStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchCases({ limit: 6 });
  }, []);

  const stats = getStats ? getStats() : {
    total: cases.length,
    active: cases.filter(c => c.status === 'active').length,
    pending: cases.filter(c => c.status === 'pending').length,
    closed: cases.filter(c => c.status === 'closed').length,
  };

  const statsCards = [
    { title: 'Total Cases', value: stats.total, icon: FaGavel, color: 'text-blue-400' },
    { title: 'Active Cases', value: stats.active, icon: FaClock, color: 'text-emerald-400' },
    { title: 'Pending Review', value: stats.pending, icon: FaCheckCircle, color: 'text-amber-400' },
    { title: 'Closed Cases', value: stats.closed, icon: FaCheckCircle, color: 'text-gray-400' },
  ];

  if (isLoading) {
    return <SkeletonLoader type="stats" count={4} />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-400 mt-1">
            Here's what's happening with your cases today.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <span className="text-sm text-gray-400">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Stats */}
      <StatsCards stats={statsCards} />

      {/* Recent Cases */}
      <div className="bg-[#0a0a0f] rounded-xl border border-[rgba(255,255,255,0.05)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Cases</h2>
          <a href="/cases" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View All →
          </a>
        </div>
        <RecentCases cases={cases.slice(0, 5)} />
      </div>
    </div>
  );
};

export default Dashboard;