const express = require('express');
const TaskController = require('../controllers/taskController');
const {uploadPhoto} = require('../middlewares/uploadImage')
const taskController = new TaskController();
const router = express.Router();

router.post('/tasks/:taskId/screenshots', uploadPhoto, taskController.uploadScreenshot);
router.get('/tasks/:taskId', taskController.getTaskWithScreenshots);
router.put('/tasks/:taskId/screenshots/:screenshotId/approve', taskController.approveScreenshot);

module.exports = router;
