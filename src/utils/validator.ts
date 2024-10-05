import { body, param, query } from 'express-validator';

export const createTaskValidator = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description')
        .notEmpty()
        .withMessage('Description is required')
];

export const updateTaskValidator = [
    param('id').isUUID().withMessage('Invalid task ID'),
    body('title').optional().notEmpty().withMessage('Title is required'),
    body('description').optional()
        .notEmpty()
        .withMessage('Description is required'),
    body('status')
        .optional()
        .notEmpty()
        .withMessage('Status is required')
        .withMessage('Status must be "completed" or "pending"'),
];

export const getTaskByIdValidator = [
    query('status').optional(),
];

export const deleteTaskValidator = [
    param('id').isUUID().withMessage('Invalid task ID'),
];

export const createUserValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .notEmpty()
        .withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
];

export const authenticateUserValidator = [
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .notEmpty()
        .withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
];