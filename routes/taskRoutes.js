const express = require('express');
const TaskController = require('../controllers/taskController');
const { uploadPhoto } = require('../middlewares/uploadImage');
const taskController = new TaskController();
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');

router.put('/tasks/:taskId/screenshots',authMiddleware, uploadPhoto.array("images", 10), taskController.uploadScreenshot);
router.get('/tasks/:taskId',authMiddleware, taskController.getTaskWithScreenshots);
router.put('/tasks/:taskId/screenshots/:screenshotId/approve', taskController.approveScreenshot);

// New routes for the added functions
router.get('/tasks/user/:userId',authMiddleware, taskController.getTasksMadeByUsers);
router.get('/tasks/all',authMiddleware, taskController.getAllTasks);
router.get('/tasks/user/:userId/completed',authMiddleware, taskController.getAllCompletedTasksByUsers);
router.post('/tasks/auto-approve', taskController.autoApproveTasks);
router.put('/tasks/:taskId/mark-completed',authMiddleware, taskController.markTaskAsCompleted);

module.exports = router;
