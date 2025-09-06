const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProfile = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  res.json(user);
};

// For mood pulses, standups, etc.
exports.addMoodPulse = async (req, res) => {
  const { emoji } = req.body;
  await prisma.moodPulse.create({ data: { emoji, userId: req.user.id } });
  res.json({ success: true });
};

exports.addStandup = async (req, res) => {
  const { update } = req.body;
  await prisma.standup.create({ data: { update, userId: req.user.id } });
  res.json({ success: true });
};