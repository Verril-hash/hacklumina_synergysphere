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

exports.getStandups = async (req, res) => {
  try {
    const standups = await prisma.standup.findMany({
      where: { userId: req.user.id },
      orderBy: { date: 'desc' },
      take: 10 // Get last 10 standups
    });
    res.json(standups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addStandup = async (req, res) => {
  const { update } = req.body;
  await prisma.standup.create({ data: { update, userId: req.user.id } });
  res.json({ success: true });
};