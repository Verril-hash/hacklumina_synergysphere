const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createProject = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id; // from auth middleware
  const project = await prisma.project.create({ data: { name } });
  await prisma.projectMember.create({ data: { userId, projectId: project.id, role: 'admin' } });
  res.json(project);
};

// Similar for getProjects, addMember, etc.
exports.getProjects = async (req, res) => {
  const userId = req.user.id;
  const members = await prisma.projectMember.findMany({ where: { userId }, include: { project: true } });
  res.json(members.map(m => m.project));
};

exports.addMember = async (req, res) => {
  const { projectId, email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  await prisma.projectMember.create({ data: { userId: user.id, projectId } });
  res.json({ success: true });
};