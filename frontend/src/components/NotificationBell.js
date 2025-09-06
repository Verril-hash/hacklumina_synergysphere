import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import notificationService from '../services/notificationService';

const NotificationBell = () => {
  const { data: notifications } = useQuery(['notifications'], () => api.get('/notifications').then(res => res.data));

  useEffect(() => {
    notificationService.init();
  }, []);

  return (
    <div className="relative">
      <bell-icon />
      {notifications?.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1">{notifications.length}</span>}
      <ul className="absolute bg-white border p-2">
        {notifications?.map(n => <li key={n.id}>{n.message}</li>)}
      </ul>
    </div>
  );
};

export default NotificationBell;