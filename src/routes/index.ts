import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { isLogged } from '../middleware/isLogged';
import task from './task.routes';
import { createUserValidator, authenticateUserValidator } from '../utils/validator';
import { validate } from '../middleware/validationMiddleware';

const routes = Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações relacionadas aos usuários
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - BearerAuth: []
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com nome, email e senha.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso
 *       '400':
 *         description: Erro nos dados fornecidos
 *       '500':
 *         description: Erro ao criar o usuário
 */
routes.post('/users', createUserValidator, validate, userController.create);

/**
 * @swagger
 * /authenticate:
 *   post:
 *     summary: Autentica um usuário
 *     description: Autentica um usuário com email e senha.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT de autenticação
 *       '401':
 *         description: Credenciais inválidas
 *       '500':
 *         description: Erro ao autenticar o usuário
 */
routes.post('/authenticate', authenticateUserValidator, validate, userController.authenticate);

/**
 * @swagger
 * /task:
 *   get:
 *     summary: Retorna a lista de tarefas
 *     description: Retorna todas as tarefas associadas ao usuário autenticado.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de tarefas retornada com sucesso
 *       '401':
 *         description: Autenticação necessária
 *       '500':
 *         description: Erro ao buscar tarefas
 */
routes.use('/task', task);

export { routes };
