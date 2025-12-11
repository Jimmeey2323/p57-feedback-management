import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/Button';
import { Plus, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const pageTitleAnimation = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={pageTitleAnimation}
            className="text-5xl font-bold mb-3 bg-gradient-primary text-transparent bg-clip-text"
          >
            Welcome back, {user?.full_name}!
          </motion.h1>
          <p className="mt-2 text-gray-600 text-lg">
            Here's what's happening with your tickets today.
          </p>
        </div>
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">+12% from last week</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Target: 10 per day</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">2.4h</p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">SLA: 4 hours</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">SLA Compliance</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">94%</p>
              </div>
              <div className="bg-[#E3F2FD] rounded-full p-3">
                <svg className="w-6 h-6 text-[#1A4D99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Target: 90%</p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="lux-heading-lg mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={() => navigate('/tickets/create')}
              className="flex items-center p-4 border-2 border-dashed border-[#C5D1E0] rounded-lg hover:border-[#1A4D99] hover:bg-[#E3F2FD] transition-all"
            >
              <div className="bg-[#E3F2FD] rounded-full p-2 mr-3">
                <Plus className="w-5 h-5 text-[#1A4D99]" />
              </div>
              <span className="lux-body">Create New Ticket</span>
            </button>

            <button 
              onClick={() => navigate('/tickets')}
              className="flex items-center p-4 border-2 border-dashed border-[#C5D1E0] rounded-lg hover:border-[#1A4D99] hover:bg-[#E3F2FD] transition-all"
            >
              <div className="bg-[#E3F2FD] rounded-full p-2 mr-3">
                <svg className="w-5 h-5 text-[#1A4D99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="lux-body">View All Tickets</span>
            </button>

            <button 
              onClick={() => navigate('/analytics')}
              className="flex items-center p-4 border-2 border-dashed border-[#C5D1E0] rounded-lg hover:border-[#1A4D99] hover:bg-[#E3F2FD] transition-all"
            >
              <div className="bg-[#E3F2FD] rounded-full p-2 mr-3">
                <BarChart3 className="w-5 h-5 text-[#1A4D99]" />
              </div>
              <span className="lux-body">View Analytics</span>
            </button>
          </div>
        </div>
        
        {/* Recent Tickets Placeholder */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-[#C5D1E0] flex justify-between items-center">
            <h2 className="lux-heading-lg">Recent Tickets</h2>
            <Button variant="primary" onClick={() => navigate('/tickets')}>
              View All
            </Button>
          </div>
          <div className="p-6">
            <p className="lux-muted text-center py-8">
              No recent tickets. Create your first ticket to get started!
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
