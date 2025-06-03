// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validate = require('../middleware/validationMiddleware');
const { updateTaskSchema, createTaskSchema, assignTaskSchema, categorySchema, commentSchema } = require('../validations/taskValidation');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.get('/',protect, taskController.getAllTasks);
router.get('/:id',protect, taskController.getTaskById);
router.post('/',protect, validate(createTaskSchema), taskController.createTask);
router.put('/:id',protect, validate(updateTaskSchema), taskController.updateTask);
router.delete('/:id', protect,taskController.deleteTask);

// Additional Routes
router.post('/filter',protect, taskController.filterTasks); 
router.post('/paginate',protect, taskController.paginateTasks); 
router.post('/:id/assign', protect,validate(assignTaskSchema), taskController.assignTask);
router.post('/:id/add-category',protect, validate(categorySchema), taskController.addCategoryToTask);
router.post('/:id/add-comment',protect, validate(commentSchema), taskController.addCommentToTask);

module.exports = router;
