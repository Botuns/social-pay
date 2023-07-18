const Task = require('../models/taskModel');
const { ObjectId } = require('mongodb');
const User = require('../models/userModel');
const { cloudinaryUploadImg } = require('../utils/cloudinary');

class TaskService {
  async uploadScreenshot(taskId, userId, screenshot) {
    try {
      const user = User.findById(userId);
      if (!user) {
        throw new Error('User not found!');
      }
      const task = await Task.findById(taskId);
      if (!task) {
        throw new Error('Task not found');
      }
      // Check if task is available for users to do
      if (task.assignedUsers <= task.usersDidIt.length) {
        throw new Error('This task has already been occupied. Try another one.');
      }
      const uploaded = await cloudinaryUploadImg(screenshot);
      const screenshotObject = {
        user: userId,
        screenshot: uploaded.secure_url,
      };

      task.screenshots.push(screenshotObject);

      task.usersDidIt.push(userId); // Add the userId to the usersDidIt array
      await task.save();

      return screenshotObject;
    } catch (error) {
      throw error;
    }
  }

  async getTaskWithScreenshots(taskId) {
    try {
      const task = await Task.findById(taskId).populate('screenshots.user');
      if (!task) {
        throw new Error('Task not found');
      }

      return task;
    } catch (error) {
      throw error;
    }
  }

  async approveScreenshot(taskId, screenshotId, userId) {
    try {
      const user = User.findById(userId);
      if (!user) {
        throw new Error('User not found!');
      }
      const task = await Task.findById(taskId);
      if (!task) {
        throw new Error('Task not found');
      }

      const screenshotIndex = task.screenshots.findIndex(
        (screenshot) => screenshot._id.toString() === screenshotId
      );

      if (screenshotIndex === -1) {
        throw new Error('Screenshot not found');
      }
      task.confirmedUsers.push(userId); // Add the userId to the confirmed users array

      // Credit the user wallet balance
      user.earningsWallet += task.amountForUser;
      await user.save();

      // Update the necessary fields or perform any additional logic
      // For example, you can set the approved field to true

      await task.save();

      return {
        message: 'Approved successfully and user has been credited',
        data: {
          task,
        },
        status: 'success',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  // Get tasks made by users
  async getTasksMadeByUsers(userId) {
    try {
      const tasks = await Task.find({ 'screenshots.user': userId }).populate('screenshots.user');
      return tasks;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Get all tasks
  async getAllTasks() {
    try {
      const tasks = await Task.find();
      return tasks;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Get all completed tasks by users
  async getAllCompletedTasksByUsers(userId) {
    try {
      const tasks = await Task.find({ confirmedUsers: userId, isCompleted: true });
      return tasks;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Auto-approve tasks (approves all at once)
  async autoApproveTasks(userIds, taskId) {
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        throw new Error('Task not found');
      }
      
      const users = await User.find({ _id: { $in: userIds } });
      if (!users || users.length === 0) {
        throw new Error('No valid users found');
      }
  
      const taskAmountPerUser = task.amountForUser;
      const totalAmountToCredit = taskAmountPerUser * users.length;
  
      task.confirmedUsers.push(...userIds);
      task.isCompleted = true;
      await task.save();
  
      // Credit the user wallet balance for each user
      for (const user of users) {
        user.earningsWallet += taskAmountPerUser;
        await user.save();
      }
  
      return {
        message: 'All tasks have been auto-approved, and users credited',
        data: {
          task,
        },
        totalAmountCredited: totalAmountToCredit,
        status: 'success',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  

  // Mark task as completed
  async markTaskAsCompleted(taskId, userId) {
    try {
      const user = User.findById(userId);
      if (!user) {
        throw new Error('User not found!');
      }
      const task = await Task.findById(taskId);
      if (!task) {
        throw new Error('Task not found');
      }

      task.isCompleted = true;
      await task.save();

      return {
        message: 'Task marked as completed',
        data: {
          task,
        },
        status: 'success',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = TaskService;
