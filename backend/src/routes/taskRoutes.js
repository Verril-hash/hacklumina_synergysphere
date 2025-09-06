const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.post('/sync', taskController.syncTasks);

module.exports = router;