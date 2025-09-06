import React, { useState } from 'react';
import api from '../services/api';
import offlineSync from '../services/offlineSync';

const TaskCreate = ({ projectId, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleCreate = () => {
    const task = { title, description, assigneeId, dueDate, projectId };
    if (navigator.onLine) {
      api.post('/tasks', task);
    } else {
      offlineSync.createTaskOffline(task);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="block mb-2 p-2 border" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="block mb-2 p-2 border" />
        <input value={assigneeId} onChange={e => setAssigneeId(e.target.value)} placeholder="Assignee ID" className="block mb-2 p-2 border" />
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="block mb-2 p-2 border" />
        <button onClick={handleCreate} className="bg-blue-500 text-white p-2">Save</button>
        <button onClick={onClose} className="ml-2 bg-red-500 text-white p-2">Cancel</button>
      </div>
    </div>
  );
};

export default TaskCreate;