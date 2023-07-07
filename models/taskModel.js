const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  advert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Advert',
    required: true
  },
  usersDidIt: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  confirmedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  screenshots: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    screenshot: {
      type: String,
      required: true
    }
  }],
  progress: {
    type: Number,
    default: 0
  },
  
  isCompleted: {
    type: Boolean,
    default: false
  },
},
{ timestamps: true }
  // Other fields specific to the task model
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
