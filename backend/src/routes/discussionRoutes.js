const express = require('express');
const discussionController = require('../controllers/discussionController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

router.post('/', discussionController.createDiscussion);
router.get('/:projectId', discussionController.getDiscussions);

module.exports = router;