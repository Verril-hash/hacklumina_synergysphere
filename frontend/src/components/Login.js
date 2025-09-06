import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="mb-4 text-2xl font-bold text-blue-600">SynergySphere</div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-2 p-2 border rounded" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mb-2 p-2 border rounded" />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">Login</button>
      <a href="/signup" className="mt-2 text-blue-500">Sign Up</a>
      <a href="/forgot" className="mt-1 text-blue-500">Forgot Password</a>
    </div>
  );
};

export default Login;