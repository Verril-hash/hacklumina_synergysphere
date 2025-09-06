const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const notificationService = require('../services/notificationService');

exports.getNotifications = async (req, res) => {
  const userId = req.user.id;
  const notifications = await prisma.notification.findMany({ where: { userId } });
  res.json(notifications);
};

exports.sendNotification = async (req, res) => {
  const { message, userId, projectId } = req.body;
  await notificationService.send(message, userId, projectId, prisma);
  res.json({ success: true });
};