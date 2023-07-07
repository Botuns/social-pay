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
  progress: {
    type: Number,
    default: 0
  },
  price:{
    type: Number,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
  // Other fields specific to the task model
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
