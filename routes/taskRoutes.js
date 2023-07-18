const express = require('express');
const TaskController = require('../controllers/taskController');
const { uploadPhoto } = require('../middlewares/uploadImage');
const taskController = new TaskController();
const router = express.Router();

router.put('/tasks/:taskId/screenshots', uploadPhoto.array("images", 10), taskController.uploadScreenshot);
router.get('/tasks/:taskId', taskController.getTaskWithScreenshots);
router.put('/tasks/:taskId/screenshots/:screenshotId/approve', taskController.approveScreenshot);

// New routes for the added functions
router.get('/tasks/user/:userId', taskController.getTasksMadeByUsers);
router.get('/tasks/all', taskController.getAllTasks);
router.get('/tasks/user/:userId/completed', taskController.getAllCompletedTasksByUsers);
router.post('/tasks/auto-approve', taskController.autoApproveTasks);
router.put('/tasks/:taskId/mark-completed', taskController.markTaskAsCompleted);

module.exports = router;
