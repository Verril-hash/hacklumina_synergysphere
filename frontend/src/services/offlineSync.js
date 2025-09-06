import localforage from 'localforage';
import api from './api';

localforage.config({ name: 'synergysphere' });

const offlineSync = async () => {
  const pending = await localforage.getItem('pendingActions') || [];
  for (const action of pending) {
    try {
      if (action.type === 'createTask') {
        await api.post('/tasks', action.data);
      } else if (action.type === 'updateTask') {
        await api.put(`/tasks/${action.id}`, action.data);
      }
      // Remove successfully synced action
      pending.splice(pending.indexOf(action), 1); // Remove from array
    } catch (err) {
      if (err.response?.data?.conflict) {
        console.log('Conflict, show resolver');
      }
    }
  }
  await localforage.setItem('pendingActions', pending); // Update with remaining
};

const createTaskOffline = async (task) => {
  const tasks = await localforage.getItem('tasks') || [];
  const id = Date.now();
  tasks.push({ ...task, id, local: true });
  await localforage.setItem('tasks', tasks);
  await addPending({ type: 'createTask', data: task });
};

const updateTaskOffline = async (id, data) => {
  const tasks = await localforage.getItem('tasks') || [];
  const index = tasks.findIndex(t => t.id === id);
  if (index > -1) {
    tasks[index] = { ...tasks[index], ...data };
    await localforage.setItem('tasks', tasks);
  }
  await addPending({ type: 'updateTask', id, data });
};

const addPending = async (action) => {
  const pending = await localforage.getItem('pendingActions') || [];
  pending.push(action);
  await localforage.setItem('pendingActions', pending);
};

const addMoodOffline = async (emoji) => {
  const moods = await localforage.getItem('moods') || [];
  const mood = { emoji, date: new Date().toISOString(), local: true };
  moods.push(mood);
  await localforage.setItem('moods', moods);
  await addPending({ type: 'addMood', data: { emoji } });
};

const addStandupOffline = async (update) => {
  const standups = await localforage.getItem('standups') || [];
  const standup = { update, date: new Date().toISOString(), local: true };
  standups.push(standup);
  await localforage.setItem('standups', standups);
  await addPending({ type: 'addStandup', data: { update } });
};

// Export offlineSync as a named export
export { offlineSync };
// Export default object with all functions
export default { 
  syncAll: offlineSync, 
  createTaskOffline, 
  updateTaskOffline,
  addMoodOffline,
  addStandupOffline
};