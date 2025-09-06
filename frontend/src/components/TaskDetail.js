import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import offlineSync from '../services/offlineSync';
import TaskTimeline from './TaskTimeline';
import RiskAlert from './RiskAlert';

const TaskDetail = ({ taskId }) => {
  const { data: task } = useQuery(['task', taskId], () => api.get(`/tasks/${taskId}`).then(res => res.data));
  const [status, setStatus] = useState(task?.status);

  const handleUpdate = () => {
    offlineSync.updateTaskOffline(taskId, { status });
  };

  return (
    <div className="p-4">
      <h2>{task?.title}</h2>
      <p>{task?.description}</p>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option>To-Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <button onClick={handleUpdate}>Update</button>
      <RiskAlert task={task} />
      <TaskTimeline taskId={taskId} />
    </div>
  );
};

export default TaskDetail;