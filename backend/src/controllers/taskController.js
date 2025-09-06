const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const syncService = require('../services/syncService');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        assignee: true,
        project: true,
      },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.query;
    const tasks = await prisma.task.findMany({
      where: { projectId: parseInt(projectId) },
      include: {
        assignee: true,
        project: true,
      },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, assigneeId, dueDate, projectId, status } = req.body;
  // Ensure projectId is an integer for Prisma
  const task = await prisma.task.create({
    data: {
      title,
      description,
      assigneeId,
      dueDate,
      projectId: parseInt(projectId),
      status,
    },
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