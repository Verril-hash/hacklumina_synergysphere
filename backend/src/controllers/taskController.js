const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const syncService = require('../services/syncService');

exports.createTask = async (req, res) => {
  const { title, description, assigneeId, dueDate, projectId, status } = req.body;
  const task = await prisma.task.create({
    data: { title, description, assigneeId, dueDate, projectId, status },
  });
  res.json(task);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const task = await prisma.task.update({ where: { id: parseInt(id) }, data });
  res.json(task);
};

// For sync with conflict resolution
exports.syncTasks = async (req, res) => {
  const { localTasks } = req.body;
  const resolved = await syncService.resolveConflicts(localTasks, prisma);
  res.json(resolved);
};