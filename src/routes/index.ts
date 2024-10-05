import { Router, Response, Request } from 'express';
import { UserController } from '../controllers/UserController'
import {  } from "../swagger";
import {isLogged} from "../middleware/isLogged";
import task from './task.routes';

const routes = Router();
const userController = new UserController();


routes.post('/users', userController.create)
routes.post('/authenticate', userController.authenticate)

routes.use('/task', isLogged, task);

export { routes }