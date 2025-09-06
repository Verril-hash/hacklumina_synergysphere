const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createDiscussion = async (req, res) => {
  const { message, projectId, parentId } = req.body;
  const userId = req.user.id;
  const discussion = await prisma.discussion.create({
    data: { message, userId, projectId, parentId },
  });
  res.json(discussion);
};

exports.getDiscussions = async (req, res) => {
  const { projectId } = req.params;
  const discussions = await prisma.discussion.findMany({
    where: { projectId: parseInt(projectId) },
    include: { children: true },
  });
  res.json(discussions);
};