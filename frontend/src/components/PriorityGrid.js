import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const PriorityGrid = ({ projectId }) => {
  const { data: tasks } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => api.get(`/tasks?projectId=${projectId}`).then(res => res.data),
    enabled: !!projectId
  });

  const prioritize = (task) => {
    // Simple logic: urgent if due soon, important if high impact (assume field or logic)
    return { urgent: new Date(task.dueDate) < new Date(Date.now() + 604800000), important: true }; // Placeholder
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>Urgent & Important</div>
      <div>Urgent & Not Important</div>
      <div>Not Urgent & Important</div>
      <div>Not Urgent & Not Important</div>
      {/* Map tasks to quadrants */}
    </div>
  );
};

export default PriorityGrid;