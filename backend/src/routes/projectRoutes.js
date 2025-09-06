const express = require('express');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth'); // Assume implemented

const router = express.Router();
router.use(authMiddleware);

router.post('/', projectController.createProject);
router.get('/', projectController.getProjects);
router.post('/addMember', projectController.addMember);

module.exports = router;