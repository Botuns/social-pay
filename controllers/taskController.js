const TaskService = require('../services/taskService');

const taskService = new TaskService();

class TaskController {
  async uploadScreenshot(req, res, next) {
    try {
      const { taskId } = req.params;
      const { userId } = req.body;
      const screenshot = req.file.path; // using multer for file upload
      if (!screenshot) {
        return res.status(400).json('A validation error occurred');
      }

      const uploadedScreenshot = await taskService.uploadScreenshot(
        taskId,
        userId,
        screenshot
      );

      res.json({ message: 'Screenshot uploaded successfully', screenshot: uploadedScreenshot });
    } catch (error) {
      res.status(400).json(error)
    }
  }

  async getTaskWithScreenshots(req, res, next) {
    try {
      const { taskId } = req.params;
      const task = await taskService.getTaskWithScreenshots(taskId);

      res.json({ task });
    } catch (error) {
      res.status(400).json(error)
    }
  }

  async approveScreenshot(req, res, next) {
    try {
      const { taskId, screenshotId } = req.params;
      const { userId } = req?.user?.id;
      const task = await taskService.approveScreenshot(taskId, screenshotId, userId);

      res.json({ message: 'Screenshot approved successfully', task });
    } catch (error) {
      next(error);
    }
  }

  async getTasksMadeByUsers(req, res, next) {
    try {
      const { userId } = req?.user?.id;
      const tasks = await taskService.getTasksMadeByUsers(userId);

      res.json({ tasks });
    } catch (error) {
      res.status(400).json(error)
    }
  }

  async getAllTasks(req, res, next) {
    try {
      const tasks = await taskService.getAllTasks();

      res.json({ tasks });
    } catch (error) {
      res.status(400).json(error)
    }
  }

  async getAllCompletedTasksByUsers(req, res, next) {
    try {
      const { userId } = req?.user?.id;
      const tasks = await taskService.getAllCompletedTasksByUsers(userId);

      res.json({ tasks });
    } catch (error) {
      res.status(400).json(error)
    }
  }

  async autoApproveTasks(req, res, next) {
    try {
      const { userIds, taskId } = req.body;
      const result = await taskService.autoApproveTasks(userIds, taskId);

      res.json(result);
    } catch (error) {
      res.status(400).json(error)
    }
  }

  async markTaskAsCompleted(req, res, next) {
    try {
      const { taskId } = req.params;
      const { userId } = req?.user?.id;
      const result = await taskService.markTaskAsCompleted(taskId, userId);

      res.json(result);
    } catch (error) {
      res.status(400).json(error)
    }
  }
}

module.exports = TaskController;
