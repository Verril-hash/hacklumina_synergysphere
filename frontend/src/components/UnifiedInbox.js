import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const UnifiedInbox = () => {
  const { data: tasks } = useQuery({
    queryKey: ['allTasks'],
    queryFn: () => api.get('/tasks/all').then(res => res.data),
  });

  return (
    <div>
      <h3>Unified Inbox</h3>
      <ul>
        {tasks?.map(t => <li key={t.id}>{t.title} - Due: {t.dueDate}</li>)}
      </ul>
    </div>
  );
};

export default UnifiedInbox;