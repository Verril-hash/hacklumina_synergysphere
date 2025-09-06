import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useSwipeable } from 'react-swipeable';
import offlineSync from '../services/offlineSync';

const TaskList = ({ projectId }) => {
  const { data: tasks } = useQuery(['tasks', projectId], () => api.get(`/tasks?projectId=${projectId}`).then(res => res.data));

  const handleSwipe = (taskId, direction) => {
    const newStatus = direction === 'right' ? 'Done' : 'In Progress';
    offlineSync.updateTaskOffline(taskId, { status: newStatus });
  };

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks?.map(task => (
          <li key={task.id} {...useSwipeable({
            onSwipedLeft: () => handleSwipe(task.id, 'left'),
            onSwipedRight: () => handleSwipe(task.id, 'right'),
          })} className="p-2 border-b flex justify-between">
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;