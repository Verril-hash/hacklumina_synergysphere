import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const { data: projects } = useQuery(['projects'], () => api.get('/projects').then(res => res.data));
  const [newProjectName, setNewProjectName] = useState('');
  const navigate = useNavigate();

  const createProject = async () => {
    await api.post('/projects', { name: newProjectName });
    setNewProjectName('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Projects</h1>
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