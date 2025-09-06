import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000, // Increased timeout
});

// Dynamic token interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Sending token in request:', token.substring(0, 10) + '...'); // Debug log
  } else {
    console.warn('No token found in localStorage');
  }
  return config;
}, error => Promise.reject(error));

// Offline fallback interceptor
api.interceptors.response.use(
  res => res,
  err => {
    if (!navigator.onLine) {
      return Promise.reject({ offline: true });
    }
    return Promise.reject(err);
  }
);

export default api;