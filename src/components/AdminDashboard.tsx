import React, { useState } from 'react';
import {
  Users, DollarSign, Settings, BarChart3, AlertTriangle, CheckCircle, Zap, Coins, Activity, Shield, Server,
  RefreshCw, Download, Upload, FileText, Bell, Search, Filter, Eye, Ban, Edit, Mail, CreditCard, Crown
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const adminStats = {
    totalUsers: 15847,
    activeUsers: 8923,
    totalRevenue: 245678.90,
    monthlyRevenue: 45678.90,
    totalTokensCreated: 1247,
    activeSubscriptions: 892,
    pendingApprovals: 23,
    systemHealth: 98.5,
    apiCalls: 1234567,
    storageUsed: 78.5,
  };

  const adminTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'tokens', label: 'Tokens', icon: Coins },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'system', label: 'System', icon: Server },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-600/20';
      case 'suspended': return 'text-red-400 bg-red-600/20';
      case 'pending': return 'text-yellow-400 bg-yellow-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  const getLogTypeColor = (type) => {
    switch (type) {
      case 'info': return 'text-blue-400 bg-blue-600/20';
      case 'warning': return 'text-yellow-400 bg-yellow-600/20';
      case 'error': return 'text-red-400 bg-red-600/20';
      default: return 'text-gray-400 bg-gray-600/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-red-600/10 border border-red-500/20 rounded-xl p-6 mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-red-600/20 p-3 rounded-lg">
            <Shield className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">OptikDexGPT Platform Administration</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-red-400 font-medium">Administrator</p>
          <p className="text-gray-400 text-sm">Full Access</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {adminTabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === id ? 'bg-red-600/20 text-red-400 border border-red-500/30' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
            <Users className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-sm text-gray-400">Total Users</p>
            <p className="text-xl font-bold text-white">{adminStats.totalUsers.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
            <DollarSign className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-sm text-gray-400">Monthly Revenue</p>
            <p className="text-xl font-bold text-white">${adminStats.monthlyRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
            <Coins className="w-6 h-6 text-purple-400 mb-2" />
            <p className="text-sm text-gray-400">Tokens Created</p>
            <p className="text-xl font-bold text-white">{adminStats.totalTokensCreated}</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
            <Activity className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-sm text-gray-400">System Health</p>
            <p className="text-xl font-bold text-white">{adminStats.systemHealth}%</p>
          </div>
        </div>
      )}

      {/* Placeholder for other tabs - to be filled out as needed */}
      {activeTab !== 'overview' && (
        <div className="text-center text-gray-500 mt-16">
          <p className="text-xl">"{activeTab}" tab content is under development.</p>
        </div>
      )}
    </div>
  );
}
