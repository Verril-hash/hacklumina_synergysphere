const express = require('express');
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

router.get('/', notificationController.getNotifications);
router.post('/', notificationController.sendNotification);

module.exports = router;