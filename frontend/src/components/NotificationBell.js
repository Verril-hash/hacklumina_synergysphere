import React, { useEffect } from 'react'; // Add useEffect import
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import notificationService from '../services/notificationService';
// Assume BellIcon is a custom component or from a library (e.g., react-icons)
import BellIcon from './BellIcon'; // Adjust import based on your setup

const NotificationBell = () => {
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => api.get('/notifications').then(res => res.data),
  });

  useEffect(() => {
    notificationService.init();
  }, []);

  return (
    <div className="relative">
      <BellIcon /> {/* Corrected to assumed component */}
      {notifications?.length > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1">
          {notifications.length}
        </span>
      )}
      <ul className="absolute bg-white border p-2">
        {notifications?.map(n => <li key={n.id}>{n.message}</li>)}
      </ul>
    </div>
  );
};

export default NotificationBell;