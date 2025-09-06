const getStats = async () => {
  const tasks = await localforage.getItem('tasks') || [];
  const completed = tasks.filter(t => t.status === 'Done').length;
  return { completedThisWeek: completed };
};

export default { getStats };