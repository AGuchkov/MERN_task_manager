const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'must provide title'],
    maxlength: [20, 'title can not be more than 20 characters'],
  },
  value: {
    type: String,
    required: [true, 'must provide value'],
    trim: true,
    maxlength: [400, 'name can not be more than 400 characters'],
  },
  stage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stage',
    required: [true, 'must provide stage']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carryOut: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creationDate: {
    type: Date,
    default: new Date(Date.now() + (180 * 60 * 1000))
  },
  expiredDate: {
    type: Date
  },
  completeProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
    required: [true, 'completeProgress must be between 0 and 100']
  }
})

module.exports = mongoose.model('Task', TaskSchema);
