import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const TaskTimeline = ({ taskId }) => {
  const { data: timeline } = useQuery(['timeline', taskId], () => api.get(`/tasks/${taskId}/timeline`).then(res => res.data)); // Assume endpoint

  return (
    <ul>
      {timeline?.map((event, i) => <li key={i}>{event.event} at {event.timestamp}</li>)}
    </ul>
  );
};

export default TaskTimeline;