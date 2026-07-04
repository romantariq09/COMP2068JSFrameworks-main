let express = require('express');
let router = express.Router();
let Task = require('../models/Task');

// Public read-only page: displays all tasks from MongoDB.
router.get('/', async (req, res, next) => {
  try {
    let tasks = await Task.find().sort({ dueDate: 1 });

    res.render('tasks/index', {
      title: 'Public Task List',
      tasks: tasks
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
