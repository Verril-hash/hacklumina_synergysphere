import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', email);
      const { data } = await api.post('/auth/login', { email, password });
      console.log('Login successful, token received');
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(`Login failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient opacity-20"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-30 animate-float" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main card */}
        <div className="card-glass">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse-glow">
              <span className="text-3xl font-bold text-white">S</span>
            </div>
            <h1 className="text-3xl font-bold text-gradient mb-2">SynergySphere</h1>
            <p className="text-gray-600">Welcome back! Sign in to continue</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-modern w-full"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-modern w-full"
                disabled={loading}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </div>

          {/* Links */}
          <div className="mt-8 text-center space-y-3">
            <a
              href="/signup"
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
            >
              Don't have an account? Sign up
            </a>
            <br />
            <a
              href="/forgot"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        {/* Features showcase */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="card-modern p-4">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-xs font-medium text-gray-600">Smart Tasks</div>
          </div>
          <div className="card-modern p-4">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-xs font-medium text-gray-600">Analytics</div>
          </div>
          <div className="card-modern p-4">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-xs font-medium text-gray-600">Real-time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;