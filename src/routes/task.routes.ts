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
 *             type: object
 *             required:
 *               - title
 *               - status
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Task Title"
 *                 description: "Task's title"
 *               description:
 *                 type: string
 *                 example: "Task Description"
 *                 description: "Task's description"
 *               status:
 *                 type: string
 *                 example: "pending"
 *                 description: "Task's status"
 *               userId:
 *                 type: string
 *                 example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                 description: "User ID of the user assigned to the task"
 *               parentTaskId:
 *                 type: string
 *                 example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                 description: "ID of the parent task (if this task is a subtask)"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                 title:
 *                   type: string
 *                   example: "Task Title"
 *                 description:
 *                   type: string
 *                   example: "Task Description"
 *                 status:
 *                   type: string
 *                   example: "pending"
 *                   description: "Task Status"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     password:
 *                       type: string
 *                       example: "password123"
 *                   description: "User assigned to the task"
 *                 parentTask:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                     title:
 *                       type: string
 *                       example: "Parent Task Title"
 *                   description: "Parent task (if this task is a subtask)"
 *                 subtasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                       title:
 *                         type: string
 *                         example: "Subtask Title"
 *                   description: "Subtasks of this task"
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
 * /api/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     description: Get all tasks of User
 *     security:
 *       - BearerAuth: []
 *     parameters:
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                   title:
 *                     type: string
 *                     example: "Task Title"
 *                   description:
 *                     type: string
 *                     example: "Task Description"
 *                   status:
 *                     type: string
 *                     example: "pending"
 *                     description: "Task Status"
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       password:
 *                         type: string
 *                         example: "password123"
 *                     description: "User assigned to the task"
 *                   parentTask:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                       title:
 *                         type: string
 *                         example: "Parent Task Title"
 *                     description: "Parent task (if this task is a subtask)"
 *                   subtasks:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                         title:
 *                           type: string
 *                           example: "Subtask Title"
 *                     description: "Subtasks of this task"
 */
router.get(
    '/',
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Task Title"
 *                 description: "Task's title"
 *               description:
 *                 type: string
 *                 example: "Task Description"
 *                 description: "Task's description"
 *               status:
 *                 type: string
 *                 example: "pending"
 *                 description: "Task's status"
 *               userId:
 *                 type: string
 *                 example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                 description: "User ID of the user assigned to the task"
 *               parentTaskId:
 *                 type: string
 *                 example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                 description: "ID of the parent task (if this task is a subtask)"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                 title:
 *                   type: string
 *                   example: "Task Title"
 *                 description:
 *                   type: string
 *                   example: "Task Description"
 *                 status:
 *                   type: string
 *                   example: "pending"
 *                   description: "Task Status"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     password:
 *                       type: string
 *                       example: "password123"
 *                   description: "User assigned to the task"
 *                 parentTask:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                       title:
 *                         type: string
 *                         example: "Parent Task Title"
 *                   description: "Parent task (if this task is a subtask)"
 *                 subtasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                       title:
 *                         type: string
 *                         example: "Subtask Title"
 *                   description: "Subtasks of this task"
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
    TaskValidators.deleteTaskValidator,
    validate,
    taskController.delete,
);

/**
 * @swagger
 * /api/tasks/{id}/complete:
 *   patch:
 *     tags:
 *       - Tasks
 *     description: Mark a task as completed
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
 *         description: Task marked as completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                 title:
 *                   type: string
 *                   example: "Task Title"
 *                 description:
 *                   type: string
 *                   example: "Task Description"
 *                 status:
 *                   type: string
 *                   example: "pending"
 *                   description: "Task Status"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     password:
 *                       type: string
 *                       example: "password123"
 *                   description: "User assigned to the task"
 *                 parentTask:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                       title:
 *                         type: string
 *                         example: "Parent Task Title"
 *                   description: "Parent task (if this task is a subtask)"
 *                 subtasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                       title:
 *                         type: string
 *                         example: "Subtask Title"
 *                   description: "Subtasks of this task"
 *       404:
 *         description: Task not found
 */
router.patch(
    '/:id/complete',
    isLogged,
    TaskValidators.getTaskByIdValidator,
    validate,
    taskController.markAsCompleted,
);

/**
 * @swagger
 * /api/tasks/{id}/pending:
 *   patch:
 *     tags:
 *       - Tasks
 *     description: Mark a task as pending
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
 *         description: Task marked as pending
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                 title:
 *                   type: string
 *                   example: "Task Title"
 *                 description:
 *                   type: string
 *                   example: "Task Description"
 *                 status:
 *                   type: string
 *                   example: "pending"
 *                   description: "Task Status"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     password:
 *                       type: string
 *                       example: "password123"
 *                   description: "User assigned to the task"
 *                 parentTask:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                       title:
 *                         type: string
 *                         example: "Parent Task Title"
 *                   description: "Parent task (if this task is a subtask)"
 *                 subtasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                       title:
 *                         type: string
 *                         example: "Subtask Title"
 *                   description: "Subtasks of this task"
 *       404:
 *         description: Task not found
 */
router.patch(
    '/:id/pending',
    isLogged,
    TaskValidators.getTaskByIdValidator,
    validate,
    taskController.unmarkAsCompleted,
);

/**
 * @swagger
 * /api/tasks/status:
 *   get:
 *     tags:
 *       - Tasks
 *     description: Filter tasks by status
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [completed, pending]
 *     responses:
 *       200:
 *         description: Tasks filtered by status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                   title:
 *                     type: string
 *                     example: "Task Title"
 *                   description:
 *                     type: string
 *                     example: "Task Description"
 *                   status:
 *                     type: string
 *                     example: "pending"
 *                     description: "Task Status"
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       password:
 *                         type: string
 *                         example: "password123"
 *                     description: "User assigned to the task"
 *                   parentTask:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                         title:
 *                           type: string
 *                           example: "Parent Task Title"
 *                     description: "Parent task (if this task is a subtask)"
 *                   subtasks:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "0874db54-4d61-49c8-a843-4cad584655be"
 *                         title:
 *                           type: string
 *                           example: "Subtask Title"
 *                     description: "Subtasks of this task"
 */
router.get(
    '/status',
    isLogged,
    TaskValidators.getTaskByIdValidator,
    validate,
    taskController.filterByStatus,
);

export default router;