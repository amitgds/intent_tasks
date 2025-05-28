const Task = require('../models/task');
const Joi = require('joi');

// --- Helper Response Functions ---
const sendSuccess = (res, message, data = null) => {
    return res.status(200).json({
        status: 200,
        success: true,
        message,
        ...(data && { data }),
    });
};

const sendError = (res, statusCode = 400, message = "Something went wrong", data = null) => {
    return res.status(statusCode).json({
        status: statusCode,
        success: false,
        message,
        ...(data && { data }),
    });
};

// --- Controller Methods ---

exports.getAllTasks = (req, res) => {
    Task.getAllTasks(req.userId, (err, tasks) => {
        if (err) return sendError(res, 400, "Unable to fetch tasks.");
        return sendSuccess(res, "Tasks fetched successfully.", tasks);
    });
};

exports.getTaskById = (req, res) => {
    const taskId = req.params.id;
    if (!taskId) return sendError(res, 400, "task_id is required");

    Task.getTaskById(taskId, req.userId, (err, task) => {
        if (err) return sendError(res, 400, "Unable to fetch task.");
        return sendSuccess(res, "Task fetched successfully.", task[0]);
    });
};

exports.createTask = (req, res) => {
    const { title, description, due_date, status } = req.body;

    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        due_date: Joi.date().required(),
        status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return sendError(res, 400, error.details[0].message);

    const newTask = {
        title,
        description,
        due_date,
        status,
        created_by: req.userId,
        updated_by: req.userId,
        created_at: new Date(),
        updated_at: new Date(),
    };

    Task.createTask(newTask, (err) => {
        if (err) return sendError(res, 400, "Unable to create task.");
        return sendSuccess(res, "Task created successfully.");
    });
};

exports.updateTask = (req, res) => {
    const { title, description, due_date, status } = req.body;

    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        due_date: Joi.date().required(),
        status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return sendError(res, 400, error.details[0].message);

    if (!req.params.id) return sendError(res, 400, "task_id is required");

    const updatedTask = {
        title,
        description,
        due_date,
        status,
        updated_at: new Date(),
    };

    Task.updateTask(req.params.id, req.userId, updatedTask, (err) => {
        if (err) return sendError(res, 400, "Unable to update task.");
        return sendSuccess(res, "Task updated successfully.");
    });
};

exports.deleteTask = (req, res) => {
    Task.deleteTask(req.params.id, req.userId, (err) => {
        if (err) return sendError(res, 400, "Unable to delete task.");
        return sendSuccess(res, "Task deleted successfully.");
    });
};

exports.filterTasks = (req, res) => {
    const { status, due_date } = req.query;

    Task.filterTasks(req.userId, { status, due_date }, (err, tasks) => {
        if (err) return sendError(res, 500, "Unable to filter tasks.");
        return sendSuccess(res, "Tasks filtered successfully.", tasks);
    });
};

exports.paginateTasks = (req, res) => {
    const { page = 1, limit = 10, sort = 'due_date', order = 'asc' } = req.query;

    Task.paginateTasks(req.userId, { page, limit, sort, order }, (err, tasks) => {
        if (err) return sendError(res, 500, "Unable to paginate tasks.");
        return sendSuccess(res, "Tasks paginated successfully.", tasks);
    });
};

exports.assignTask = (req, res) => {
    const schema = Joi.object({
        user_id: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return sendError(res, 400, error.details[0].message);

    const { user_id } = req.body;

    Task.assignTask(req.params.id, req.userId, user_id, (err, result) => {
        if (err || result.affectedRows === 0)
            return sendError(res, 400, "Unable to assign task or task not found.");
        return sendSuccess(res, "Task assigned successfully.");
    });
};

exports.addCategoryToTask = (req, res) => {
    const schema = Joi.object({
        category: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return sendError(res, 400, error.details[0].message);

    Task.addCategoryToTask(req.params.id, req.userId, req.body.category, (err) => {
        if (err) return sendError(res, 500, "Unable to add category to task.");
        return sendSuccess(res, "Category added to task successfully.");
    });
};

exports.addCommentToTask = (req, res) => {
    const schema = Joi.object({
        comment: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return sendError(res, 400, error.details[0].message);

    Task.addCommentToTask(req.params.id, req.userId, req.body.comment, (err) => {
        if (err) return sendError(res, 500, `Unable to add comment to task. ${err}`);
        return sendSuccess(res, "Comment added to task successfully.");
    });
};
