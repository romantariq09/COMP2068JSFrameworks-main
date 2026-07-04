let express = require('express');
let router = express.Router();
let Task = require('../models/Task');
let isAuthenticated = require('../middleware/auth');

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
// Show the form for adding a new task.
router.get('/add', isAuthenticated, (req, res) => {
  res.render('tasks/add', {
    title: 'Add New Task'
  });
});

// Create a new task for the logged-in user.
router.post('/add', isAuthenticated, async (req, res, next) => {
  try {
    let task = new Task({
      owner: req.user._id,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      status: req.body.status
    });

    await task.save();

    res.redirect('/tasks/manage');
  } catch (error) {
    next(error);
  }
});
// Show the edit form for one task owned by the logged-in user.
router.get('/edit/:id', isAuthenticated, async (req, res, next) => {
  try {
    let task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.redirect('/tasks/manage');
    }

    res.render('tasks/edit', {
      title: 'Edit Task',
      task: task,
      dueDateValue: task.dueDate.toISOString().split('T')[0],

      isSchool: task.category === 'School',
      isWork: task.category === 'Work',
      isPersonal: task.category === 'Personal',

      isLow: task.priority === 'Low',
      isMedium: task.priority === 'Medium',
      isHigh: task.priority === 'High',

      isToDo: task.status === 'To Do',
      isInProgress: task.status === 'In Progress',
      isCompleted: task.status === 'Completed'
    });
  } catch (error) {
    next(error);
  }
});

// Update one task owned by the logged-in user.
router.post('/edit/:id', isAuthenticated, async (req, res, next) => {
  try {
    let task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.redirect('/tasks/manage');
    }

    task.title = req.body.title;
    task.description = req.body.description;
    task.category = req.body.category;
    task.dueDate = req.body.dueDate;
    task.priority = req.body.priority;
    task.status = req.body.status;

    await task.save();

    res.redirect('/tasks/manage');
  } catch (error) {
    next(error);
  }
});
// Show a confirmation page before deleting a task.
router.get('/delete/:id', isAuthenticated, async (req, res, next) => {
  try {
    let task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.redirect('/tasks/manage');
    }

    res.render('tasks/delete', {
      title: 'Delete Task',
      task: task
    });
  } catch (error) {
    next(error);
  }
});

// Delete the selected task after confirmation.
router.post('/delete/:id', isAuthenticated, async (req, res, next) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    res.redirect('/tasks/manage');
  } catch (error) {
    next(error);
  }
});
router.get('/manage', isAuthenticated, async (req, res, next) => {
  try {
    let tasks = await Task.find({ owner: req.user._id }).sort({ dueDate: 1 });

    res.render('tasks/manage', {
      title: 'My Tasks',
      tasks: tasks
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
