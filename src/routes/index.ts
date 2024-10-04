import { Router, Response, Request } from 'express';
import { UserController } from '../controllers/UserController'
import { TaskController } from '../controllers/TaskController'
import {swaggerSpec} from "../swagger";
import {isLogged} from "../middleware/isLogged";

const routes = Router();
const userController = new UserController();
const taskController = new TaskController();

routes.post('/users', userController.create)
routes.post('/authenticate', userController.authenticate)

routes.get('/api-docs', (req: Request, res: Response) => {
    res.send(swaggerSpec);
});

export { routes }