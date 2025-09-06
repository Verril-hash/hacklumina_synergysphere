import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await api.post('/auth/register', { email, password, name });
      navigate('/');
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="mb-2 p-2 border rounded" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-2 p-2 border rounded" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mb-2 p-2 border rounded" />
      <button onClick={handleSignup} className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
    </div>
  );
};

export default Signup;