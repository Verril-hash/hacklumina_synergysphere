import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const { data: projects, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then(res => res.data),
    retry: false,
    onError: (error) => {
      console.log('Projects fetch error:', error);
    }
  });
  const [newProjectName, setNewProjectName] = useState('');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const createProject = async () => {
    if (!newProjectName.trim()) {
      alert('Please enter a project name');
      return;
    }

    setCreating(true);
    try {
      await api.post('/projects', { name: newProjectName });
      setNewProjectName('');
      // Refresh the projects list
      window.location.reload();
    } catch (error) {
      console.error('Create project error:', error);
      alert('Failed to create project. Please make sure you are logged in.');
    } finally {
      setCreating(false);
    }
  };

  const projectColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-teal-500 to-blue-500',
  ];

  const getProjectColor = (index) => {
    return projectColors[index % projectColors.length];
  };

  return (
    <div className="space-y-6">
      {/* Create Project Section */}
      <div className="card-modern">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm">+</span>
          </div>
          <h3 className="text-lg font-bold text-gradient">Create New Project</h3>
        </div>
        
        <div className="flex space-x-3">
          <input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Enter project name..."
            className="input-modern flex-1"
            onKeyPress={(e) => e.key === 'Enter' && createProject()}
            disabled={creating}
          />
          <button
            onClick={createProject}
            disabled={creating || !newProjectName.trim()}
            className="btn-success flex items-center space-x-2"
          >
            {creating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating...</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span>Create</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="card-modern">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm">📁</span>
          </div>
          <h3 className="text-lg font-bold text-gradient">Your Projects</h3>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm">
            <div className="flex items-center space-x-2">
              <span>⚠️</span>
              <span>Please log in to view projects.</span>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                className="group cursor-pointer p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${getProjectColor(index)} rounded-xl flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">
                      {project.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {project.name}
                    </h4>
                    <p className="text-xs text-gray-500">Project</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Click to open</span>
                  <span className="group-hover:text-indigo-500 transition-colors">→</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📁</div>
            <div className="text-gray-500 font-medium mb-2">No projects yet</div>
            <div className="text-sm text-gray-400">Create your first project to get started!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;