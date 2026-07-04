let mongoose = require('mongoose');

let taskSchema = new mongoose.Schema(
  {
    owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['School', 'Work', 'Personal'],
      default: 'School'
    },
    dueDate: {
      type: Date,
      required: true
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Completed'],
      default: 'To Do'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Task', taskSchema);
