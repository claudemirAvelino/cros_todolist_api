/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operações relacionadas às tarefas
 */

import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import * as TaskValidators from '../utils/validator';
import { validate } from '../middleware/validationMiddleware';
import { isLogged } from '../middleware/isLogged';

const router = Router();
const taskController = new TaskController();

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Cria uma nova tarefa
 *     description: Cria uma nova tarefa com título, descrição, status e opcionalmente uma tarefa pai.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []  # Adicionando segurança para esta rota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               parentTaskId:
 *                 type: string
 *             required:
 *               - title
 *     responses:
 *       '201':
 *         description: Tarefa criada com sucesso
 *       '400':
 *         description: Erro nos dados fornecidos
 *       '500':
 *         description: Erro ao criar a tarefa
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
 * /task:
 *   get:
 *     summary: Obtém todas as tarefas do usuário
 *     description: Retorna todas as tarefas do usuário logado, com opção de filtrar por status.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []  # Adicionando segurança para esta rota
 *     responses:
 *       '200':
 *         description: Tarefas encontradas
 *       '404':
 *         description: Nenhuma tarefa encontrada
 */
router.get(
    '/',
    isLogged,
    TaskValidators.getTaskByIdValidator,
    taskController.list,
);

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Atualiza uma tarefa por ID
 *     description: Atualiza uma tarefa existente com base no ID fornecido.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []  # Adicionando segurança para esta rota
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               parentTaskId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Tarefa atualizada com sucesso
 *       '404':
 *         description: Tarefa não encontrada
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
 * /task/{id}:
 *   delete:
 *     summary: Deleta uma tarefa por ID
 *     description: Remove uma tarefa existente com base no ID fornecido.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []  # Adicionando segurança para esta rota
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Tarefa deletada com sucesso
 *       '404':
 *         description: Tarefa não encontrada
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
 * /task/{id}/complete:
 *   patch:
 *     summary: Marca uma tarefa como concluída
 *     description: Atualiza o status de uma tarefa para concluída.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []  # Adicionando segurança para esta rota
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Tarefa marcada como concluída
 *       '404':
 *         description: Tarefa não encontrada
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
 * /task/{id}/pending:
 *   patch:
 *     summary: Marca uma tarefa como pendente
 *     description: Atualiza o status de uma tarefa para pendente.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []  # Adicionando segurança para esta rota
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Tarefa marcada como pendente
 *       '404':
 *         description: Tarefa não encontrada
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
 * /task/status:
 *   get:
 *     summary: Filtra tarefas por status
 *     description: Retorna tarefas filtradas pelo status fornecido.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []  # Adicionando segurança para esta rota
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [completed, pending]
 *     responses:
 *       '200':
 *         description: Tarefas filtradas por status
 *       '404':
 *         description: Nenhuma tarefa encontrada
 */
router.get(
    '/status',
    isLogged,
    TaskValidators.getTaskByIdValidator,
    validate,
    taskController.filterByStatus,
);

export default router;