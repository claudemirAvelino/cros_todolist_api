import { Router, Response, Request } from 'express';
import { UserController } from '../controllers/UserController';
import { isLogged } from '../middleware/isLogged';
import task from './task.routes';

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
routes.post('/users', userController.create);

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
 *       '401':
 *         description: Credenciais inválidas
 *       '500':
 *         description: Erro ao autenticar o usuário
 */
routes.post('/authenticate', userController.authenticate);

routes.use('/task', isLogged, task);

export { routes };