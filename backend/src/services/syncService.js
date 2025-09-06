module.exports.resolveConflicts = async (localTasks, prisma) => {
  const resolved = [];
  for (const local of localTasks) {
    const serverTask = await prisma.task.findUnique({ where: { id: local.id } });
    if (serverTask.updatedAt > local.localUpdatedAt) {
      // Simple merge: prefer server, but append local changes
      const merged = { ...serverTask, description: serverTask.description + '\n(Local: ' + local.description + ')' };
      await prisma.task.update({ where: { id: local.id }, data: merged });
      resolved.push(merged);
    } else {
      await prisma.task.update({ where: { id: local.id }, data: local });
      resolved.push(local);
    }
  }
  return resolved;
};