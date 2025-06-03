const Joi = require('joi');

const createTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    due_date: Joi.date().required(),
    status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
});

const updateTaskSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    due_date: Joi.date().optional(),
    status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
});

const assignTaskSchema = Joi.object({
    user_id: Joi.number().required(),
});

const categorySchema = Joi.object({
    category: Joi.string().required(),
});

const commentSchema = Joi.object({
    comment: Joi.string().required(),
});

module.exports = {
    createTaskSchema,
    updateTaskSchema,
    assignTaskSchema,
    categorySchema,
    commentSchema,
};