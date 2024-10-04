import { Router, Response, Request } from 'express';
import { UserController } from '../controllers/UserController'
import {swaggerSpec} from "../swagger";

const routes = Router();
const userController = new UserController();

routes.post('/users', userController.create)
routes.post('/authenticate', userController.authenticate)

routes.get('/api-docs', (req: Request, res: Response) => {
    res.send(swaggerSpec);
});

export { routes }