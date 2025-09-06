const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

router.get('/profile', userController.getProfile);
router.get('/standups', userController.getStandups);
router.post('/mood', userController.addMoodPulse);
router.post('/standup', userController.addStandup);

module.exports = router;