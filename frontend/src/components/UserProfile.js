import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const UserProfile = () => {
  const { data: user } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/users/profile').then(res => res.data)
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="p-4">
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <button onClick={handleLogout} className="bg-red-500 text-white p-2">Logout</button>
    </div>
  );
};

export default UserProfile;