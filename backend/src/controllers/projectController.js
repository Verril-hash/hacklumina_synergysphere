const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createProject = async (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Project name is required' });
  }
  if (!req.user?.id) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  try {
    console.log('Received POST /projects:', req.body); // Log request
    const project = await prisma.project.create({
      data: { name },
    });
    await prisma.projectMember.create({
      data: { userId: req.user.id, projectId: project.id, role: 'admin' },
    });
    console.log('Project created:', project); // Log success
    res.status(201).json(project); // Explicit 201 for creation
  } catch (error) {
    console.error('Error creating project:', error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Project name already exists' });
    }
    res.status(500).json({ error: 'Failed to create project' });
  }
};

exports.getProjects = async (req, res) => {
  const userId = req.user.id;
  try {
    console.log('Fetching projects for user:', userId); // Log request
    const members = await prisma.projectMember.findMany({
      where: { userId },
      include: { project: true },
    });
    console.log('Projects fetched:', members.map(m => m.project)); // Log success
    res.status(200).json(members.map(m => m.project));
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

exports.addMember = async (req, res) => {
  const { projectId, email } = req.body;
  if (!projectId || !email) {
    return res.status(400).json({ error: 'Project ID and email are required' });
  }
  try {
    console.log('Received POST /projects/addMember:', req.body); // Log request
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    await prisma.projectMember.create({ data: { userId: user.id, projectId } });
    console.log('Member added to project:', { projectId, userId: user.id }); // Log success
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ error: 'Failed to add member' });
  }
};