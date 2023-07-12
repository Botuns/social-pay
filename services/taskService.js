const Task = require('../models/taskModel');
const { ObjectId } = require('mongodb');
const User = require('../models/userModel')
const {cloudinaryUploadImg} = require('../utils/cloudinary')


class TaskService {
  async uploadScreenshot(taskId, userId, screenshot) {
    try {
        const user= User.findById({userId});
        if(!user){
            throw new Error('user not found!')
        }
      const task = await Task.findById(taskId);
      if (!task) {
        throw new Error('Task not found');
      }
    //   check if task is available for users to do
      if(task.assignedUsers<=task.usersDidIt.length){
        throw new Error('This task has already been occupied try another one')
      }
      const uploaded = await cloudinaryUploadImg(screenshot)
      const screenshotObject = {
        user: userId,
        screenshot: uploaded.secure_url
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

  async approveScreenshot(taskId, screenshotId,userId) {
    try {
        const user= User.findById({userId});
        if(!user){
            throw new Error('user not found!')
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

    //   credit the user wallet balance
    user.wallet += task.amountForUser
    await user.save()
      


      // Update the necessary fields or perform any additional logic
      // For example, you can set the approved field to true
      
      await task.save();
      
      return{
        message: 'approved sucessfully and user has been credited',
        data:{
            task,
        },
        status:'success'
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = TaskService;
