import localforage from 'localforage';

const getStats = async () => {
  const tasks = await localforage.getItem('tasks') || [];
  const completed = tasks.filter(t => t.status === 'Done').length;
  const thisWeek = tasks.filter(t => {
    const taskDate = new Date(t.createdAt || t.date);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return taskDate > weekAgo;
  }).length;
  
  return { 
    completedThisWeek: completed,
    tasksThisWeek: thisWeek,
    completionRate: thisWeek > 0 ? (completed / thisWeek * 100).toFixed(1) : 0
  };
};

const trackEvent = async (event, data) => {
  const events = await localforage.getItem('analytics') || [];
  events.push({ event, data, timestamp: new Date().toISOString() });
  await localforage.setItem('analytics', events.slice(-100)); // Keep last 100 events
};

export default { getStats, trackEvent };