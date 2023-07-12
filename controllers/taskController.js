const TaskService = require('../services/taskService');

const taskService = new TaskService();

class TaskController {
  async uploadScreenshot(req, res, next) {
    try {
      const { taskId } = req.params;
      const { userId } = req.body;
      const screenshot = req.file.path; //  using multer for file upload
      
      const uploadedScreenshot = await taskService.uploadScreenshot(
        taskId,
        userId,
        screenshot
      );
      
      res.json({ message: 'Screenshot uploaded successfully', screenshot: uploadedScreenshot });
    } catch (error) {
      next(error);
    }
  }

  async getTaskWithScreenshots(req, res, next) {
    try {
      const { taskId } = req.params;
      const task = await taskService.getTaskWithScreenshots(taskId);

      res.json({ task });
    } catch (error) {
      next(error);
    }
  }

  async approveScreenshot(req, res, next) {
    try {
      const { taskId, screenshotId } = req.params;
      const task = await taskService.approveScreenshot(taskId, screenshotId);

      res.json({ message: 'Screenshot approved successfully', task });
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = TaskController;
