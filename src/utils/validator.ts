import { body, param, query } from 'express-validator';

export const createTaskValidator = [
    body('title').notEmpty().withMessage('Title is required'),
    body('status')
        .notEmpty()
        .withMessage('Status is required')
        .isIn(['completed', 'pending'])
        .withMessage('Status must be "completed" or "pending"'),
    body('userId').notEmpty().withMessage('Title is required'),
];

export const updateTaskValidator = [
    param('id').isUUID().withMessage('Invalid task ID'),
    body('title').optional().notEmpty().withMessage('Title is required'),
    body('status')
        .optional()
        .notEmpty()
        .withMessage('Status is required')
        .isIn(['completed', 'pending'])
        .withMessage('Status must be "completed" or "pending"'),
];

export const addSubtaskValidator = [
    param('id').isUUID().withMessage('Invalid task ID'),
    body('title').notEmpty().withMessage('Title is required'),
    body('status')
        .notEmpty()
        .withMessage('Status is required')
        .isIn(['completed', 'pending'])
        .withMessage('Status must be "completed" or "pending"'),
];

export const getTaskByIdValidator = [
    param('id').isUUID().withMessage('Invalid task ID'),
    query('status').optional(),
];
