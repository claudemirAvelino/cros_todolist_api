import { Router, Response, Request } from 'express';
import { UserController } from '../controllers/UserController'
import {swaggerSpec} from "../swagger";
import {isLogged} from "../middleware/isLogged";

const routes = Router();
const userController = new UserController();

routes.post('/users', isLogged, userController.create)
routes.post('/authenticate', isLogged, userController.authenticate)

routes.get('/api-docs', (req: Request, res: Response) => {
    res.send(swaggerSpec);
});

export { routes }