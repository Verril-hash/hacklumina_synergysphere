import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const PriorityGrid = ({ projectId }) => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => api.get(`/tasks?projectId=${projectId}`).then(res => res.data),
    enabled: !!projectId
  });

  const prioritize = (task) => {
    if (!task.dueDate) return { urgent: false, important: false };
    
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const urgent = dueDate < oneWeekFromNow;
    const important = task.status === 'To-Do' || task.status === 'In Progress';
    
    return { urgent, important };
  };

  const categorizeTasks = () => {
    if (!tasks) return { urgentImportant: [], urgentNotImportant: [], notUrgentImportant: [], notUrgentNotImportant: [] };
    
    return tasks.reduce((acc, task) => {
      const { urgent, important } = prioritize(task);
      
      if (urgent && important) acc.urgentImportant.push(task);
      else if (urgent && !important) acc.urgentNotImportant.push(task);
      else if (!urgent && important) acc.notUrgentImportant.push(task);
      else acc.notUrgentNotImportant.push(task);
      
      return acc;
    }, { urgentImportant: [], urgentNotImportant: [], notUrgentImportant: [], notUrgentNotImportant: [] });
  };

  const categories = categorizeTasks();

  if (isLoading) return <div>Loading tasks...</div>;

  return (
    <div className="card-modern">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-3">
          <span className="text-white text-lg">📊</span>
        </div>
        <h3 className="text-xl font-bold text-gradient">Priority Matrix</h3>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200">
            <h4 className="font-bold text-red-800 mb-3 flex items-center">
              <span className="text-lg mr-2">🚨</span>
              Urgent & Important
            </h4>
            <div className="space-y-2">
              {categories.urgentImportant.length > 0 ? (
                categories.urgentImportant.map(task => (
                  <div key={task.id} className="text-sm bg-white p-3 rounded-xl shadow-sm border border-red-100">
                    <div className="font-medium text-gray-800">{task.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{task.status}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-red-600 italic">No urgent & important tasks</div>
              )}
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl border border-yellow-200">
            <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
              <span className="text-lg mr-2">⚡</span>
              Urgent & Not Important
            </h4>
            <div className="space-y-2">
              {categories.urgentNotImportant.length > 0 ? (
                categories.urgentNotImportant.map(task => (
                  <div key={task.id} className="text-sm bg-white p-3 rounded-xl shadow-sm border border-yellow-100">
                    <div className="font-medium text-gray-800">{task.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{task.status}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-yellow-600 italic">No urgent & not important tasks</div>
              )}
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center">
              <span className="text-lg mr-2">📋</span>
              Not Urgent & Important
            </h4>
            <div className="space-y-2">
              {categories.notUrgentImportant.length > 0 ? (
                categories.notUrgentImportant.map(task => (
                  <div key={task.id} className="text-sm bg-white p-3 rounded-xl shadow-sm border border-blue-100">
                    <div className="font-medium text-gray-800">{task.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{task.status}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-blue-600 italic">No not urgent & important tasks</div>
              )}
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center">
              <span className="text-lg mr-2">📝</span>
              Not Urgent & Not Important
            </h4>
            <div className="space-y-2">
              {categories.notUrgentNotImportant.length > 0 ? (
                categories.notUrgentNotImportant.map(task => (
                  <div key={task.id} className="text-sm bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                    <div className="font-medium text-gray-800">{task.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{task.status}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-600 italic">No not urgent & not important tasks</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriorityGrid;