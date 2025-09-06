import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const { data: projects, error } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then(res => res.data),
    retry: false,
    onError: (error) => {
      console.log('Projects fetch error:', error);
    }
  });
  const [newProjectName, setNewProjectName] = useState('');
  const navigate = useNavigate();

  const createProject = async () => {
    try {
      if (!newProjectName.trim()) {
        alert('Please enter a project name');
        return;
      }
      await api.post('/projects', { name: newProjectName });
      setNewProjectName('');
      // Refresh the projects list
      window.location.reload();
    } catch (error) {
      console.error('Create project error:', error);
      alert('Failed to create project. Please make sure you are logged in.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Projects</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Please log in to view projects.
        </div>
      )}
      <ul>
        {projects?.map(project => (
          <li key={project.id} onClick={() => navigate(`/project/${project.id}`)} className="cursor-pointer p-2 border-b">
            {project.name}
          </li>
        ))}
      </ul>
      <input value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} placeholder="New Project" className="mt-4 p-2 border" />
      <button onClick={createProject} className="ml-2 bg-green-500 text-white p-2 rounded">+</button>
    </div>
  );
};

export default ProjectList;