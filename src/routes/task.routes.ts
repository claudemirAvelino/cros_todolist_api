import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import * as TaskValidators from '../utils/validator';
import { validate } from '../middleware/validationMiddleware';
import { isLogged } from '../middleware/isLogged';

const router = Router();

const taskController = new TaskController();
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     description: Create a new task
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/TaskCreate'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Task'
 */
router.post(
    '/',
    isLogged,
    TaskValidators.createTaskValidator,
    validate,
    taskController.create,
);

/**
 * @swagger
 * /api/tasks/{userId}:
 *   get:
 *     tags:
 *       - Tasks
 *     description: Get all tasks of User
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [completed, pending]
 *         description: Filter tasks by status (completed or pending)
 *     responses:
 *       200:
 *         description: Tasks found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Task'
 */
router.get(
    '/:id',
    isLogged,
    TaskValidators.getTaskByIdValidator,
    taskController.list,
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     tags:
 *       - Tasks
 *     description: Update a task by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/TaskUpdate'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Task'
 */
router.put(
    '/:id',
    isLogged,
    TaskValidators.updateTaskValidator,
    validate,
    taskController.update,
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     description: Delete a task by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete(
    '/:id',
    isLogged,
    TaskValidators.getTaskByIdValidator,
    validate,
    taskController.delete,
);


router.patch(
    '/:id',
    isLogged,
    TaskValidators.getTaskByIdValidator,
    validate,
    taskController.markAsCompleted,
);

export default router;
