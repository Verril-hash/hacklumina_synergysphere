import React, { useState } from 'react';
import ProjectList from '../components/ProjectList';
import NotificationBell from '../components/NotificationBell';
import StandupRecorder from '../components/StandupRecorder';
import StandupHistory from '../components/StandupHistory';
import MoodPulse from '../components/MoodPulse';
import PriorityGrid from '../components/PriorityGrid';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'tasks', label: 'Tasks', icon: '✅' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="card-glass mx-4 mt-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center animate-pulse-glow">
              <span className="text-xl font-bold text-white">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">SynergySphere</h1>
              <p className="text-gray-600 text-sm">Welcome back! Ready to be productive?</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationBell />
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-white/20'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 pb-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card-modern text-center">
                <div className="text-3xl mb-2">📁</div>
                <div className="text-2xl font-bold text-gradient">12</div>
                <div className="text-sm text-gray-600">Active Projects</div>
              </div>
              <div className="card-modern text-center">
                <div className="text-3xl mb-2">✅</div>
                <div className="text-2xl font-bold text-gradient-secondary">48</div>
                <div className="text-sm text-gray-600">Tasks Completed</div>
              </div>
              <div className="card-modern text-center">
                <div className="text-3xl mb-2">⏰</div>
                <div className="text-2xl font-bold text-gradient">24</div>
                <div className="text-sm text-gray-600">Hours This Week</div>
              </div>
              <div className="card-modern text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-gradient">85%</div>
                <div className="text-sm text-gray-600">Productivity</div>
              </div>
            </div>

            {/* Main Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StandupRecorder />
              <StandupHistory />
              <MoodPulse />
              <PriorityGrid projectId={1} />
            </div>

            {/* Recent Activity */}
            <div className="card-modern">
              <h3 className="text-xl font-bold text-gradient mb-4">📈 Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div>
                    <div className="font-medium">Task completed: "Design new dashboard"</div>
                    <div className="text-sm text-gray-500">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">📝</span>
                  </div>
                  <div>
                    <div className="font-medium">Standup recorded</div>
                    <div className="text-sm text-gray-500">1 day ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">😊</span>
                  </div>
                  <div>
                    <div className="font-medium">Mood check-in: Happy</div>
                    <div className="text-sm text-gray-500">2 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="card-modern">
              <h3 className="text-xl font-bold text-gradient mb-4">📁 My Projects</h3>
              <ProjectList />
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="card-modern">
              <h3 className="text-xl font-bold text-gradient mb-4">✅ Task Management</h3>
              <PriorityGrid projectId={1} />
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-modern">
                <h3 className="text-xl font-bold text-gradient mb-4">📊 Productivity Trends</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <div>Analytics coming soon...</div>
                  </div>
                </div>
              </div>
              <div className="card-modern">
                <h3 className="text-xl font-bold text-gradient mb-4">🎯 Goal Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Weekly Tasks</span>
                      <span className="text-sm text-gray-500">24/30</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Project Milestones</span>
                      <span className="text-sm text-gray-500">3/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;