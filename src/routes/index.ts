import { Router, Response, Request } from 'express';
import { UserController } from '../controllers/UserController'
import {swaggerSpec} from "../swagger";
import {isLogged} from "../middleware/isLogged";
import task from './task.routes';

const routes = Router();
const userController = new UserController();


routes.post('/users', userController.create)
routes.post('/authenticate', userController.authenticate)

routes.get('/api-docs', (req: Request, res: Response) => {
    res.send(swaggerSpec);
});

routes.use('/task', isLogged, task);

export { routes }