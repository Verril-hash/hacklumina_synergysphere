import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const DiscussionThread = ({ projectId }) => {
  const { data: discussions } = useQuery(['discussions', projectId], () => api.get(`/discussions/${projectId}`).then(res => res.data));
  const [message, setMessage] = useState('');
  const [parentId, setParentId] = useState(null);

  const handlePost = () => {
    api.post('/discussions', { message, projectId, parentId });
    setMessage('');
  };

  const handleConvertToTask = (msg) => {
    // Highlight and convert
    const task = { title: msg.substring(0, 50), description: msg, projectId };
    api.post('/tasks', task);
  };

  return (
    <div>
      <h2>Discussions</h2>
      <ul>
        {discussions?.map(d => (
          <li key={d.id} className="p-2 border-b">
            {d.message}
            <button onClick={() => setParentId(d.id)}>Reply</button>
            <button onClick={() => handleConvertToTask(d.message)}>Convert to Task</button>
          </li>
        ))}
      </ul>
      <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" />
      <button onClick={handlePost}>Post</button>
    </div>
  );
};

export default DiscussionThread;