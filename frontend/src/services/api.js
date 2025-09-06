import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

// Offline fallback: If offline, throw error for sync later
api.interceptors.response.use(res => res, err => {
  if (!navigator.onLine) {
    return Promise.reject({ offline: true });
  }
  return Promise.reject(err);
});

export default api;