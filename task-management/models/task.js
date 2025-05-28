const db = require('../config/database');

// Get all tasks for a specific user (created by or assigned to)
exports.getAllTasks = function (userId, callback) {
    db.query(
        'SELECT * FROM task WHERE created_by = ? OR assigned_to = ?',
        [userId, userId],
        callback
    );
};

// Get task by ID only if user is owner or assigned
exports.getTaskById = function (id, userId, callback) {
    db.query(
        'SELECT * FROM task WHERE task_id = ? AND (created_by = ? OR assigned_to = ?)',
        [id, userId, userId],
        callback
    );
};

// Create a new task with created_by field
exports.createTask = function (newTask, callback) {
    db.query('INSERT INTO task SET ?', newTask, callback);
};

// Update a task only if user is owner or assigned
exports.updateTask = function (id, userId, updatedTask, callback) {
    db.query(
        'UPDATE task SET ? WHERE task_id = ? AND (created_by = ? OR assigned_to = ?)',
        [updatedTask, id, userId, userId],
        callback
    );
};

// Delete a task only if user is owner
exports.deleteTask = function (id, userId, callback) {
    db.query(
        'DELETE FROM task WHERE task_id = ? AND created_by = ?',
        [id, userId],
        callback
    );
};

// Filter tasks by criteria for specific user
exports.filterTasks = function (userId, filters, callback) {
    let query = 'SELECT * FROM task WHERE (created_by = ? OR assigned_to = ?)';
    const params = [userId, userId];

    if (filters.status) {
        query += ' AND status = ?';
        params.push(filters.status);
    }

    if (filters.due_date) {
        query += ' AND due_date = ?';
        params.push(filters.due_date);
    }

    db.query(query, params, callback);
};

// Paginate and sort tasks for specific user
exports.paginateTasks = function (userId, { page, limit, sort, order }, callback) {
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM task WHERE created_by = ? OR assigned_to = ? 
                   ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;
    db.query(query, [userId, userId, parseInt(limit), parseInt(offset)], callback);
};

// Assign a task to a user (only owner can assign)
exports.assignTask = function (taskId, ownerId, assigneeId, callback) {
    db.query(
        'UPDATE task SET assigned_to = ?, updated_by = ? WHERE task_id = ? AND created_by = ?',
        [assigneeId, ownerId, taskId, ownerId],
        callback
    );
};

// Add a category to a task (only owner or assigned can add)
exports.addCategoryToTask = function (taskId, userId, category, callback) {
    db.query(
        'UPDATE task SET category = ?, updated_by = ? WHERE task_id = ? AND (created_by = ? OR assigned_to = ?)',
        [category, userId, taskId, userId, userId],
        callback
    );
};

// Add a comment to a task (only owner or assigned can add)
exports.addCommentToTask = function (taskId, userId, comment, callback) {
    db.query(
        'UPDATE task SET task_comment = ?, updated_by = ? WHERE task_id = ? AND (created_by = ? OR assigned_to = ?)',
        [comment, userId, taskId, userId, userId],
        callback
    );
};