module.exports.send = async (message, userId, projectId, prisma) => {
  await prisma.notification.create({ data: { message, userId, projectId } });
  // Emit via socket if online
};