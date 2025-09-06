import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const UnifiedInbox = () => {
  const { data: tasks } = useQuery(['allTasks'], () => api.get('/tasks/all').then(res => res.data)); // Assume endpoint for cross-project

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