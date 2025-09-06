import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const StandupHistory = () => {
  const { data: standups, isLoading } = useQuery({
    queryKey: ['standups'],
    queryFn: () => api.get('/users/standups').then(res => res.data),
  });

  if (isLoading) return <div>Loading standups...</div>;

  return (
    <div className="card-modern">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
          <span className="text-white text-lg">📋</span>
        </div>
        <h3 className="text-xl font-bold text-gradient">Standup History</h3>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : standups && standups.length > 0 ? (
        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
          {standups.map((standup, index) => (
            <div key={standup.id} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {new Date(standup.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(standup.date).toLocaleTimeString()}
                </div>
              </div>
              <div className="text-gray-800 leading-relaxed">{standup.update}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📝</div>
          <div className="text-gray-500 font-medium mb-2">No standups recorded yet</div>
          <div className="text-sm text-gray-400">Start by recording your first daily update!</div>
        </div>
      )}
    </div>
  );
};

export default StandupHistory;
