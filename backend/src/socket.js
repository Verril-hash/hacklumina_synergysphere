module.exports = (io, prisma) => {
  io.on('connection', (socket) => {
    socket.on('joinProject', (projectId) => {
      socket.join(projectId);
    });

    socket.on('newTask', async (task) => {
      // Broadcast to project room
      io.to(task.projectId).emit('taskUpdate', task);
    });

    // Similar for discussions, notifications, etc.
  });
};