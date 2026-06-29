import { Router } from 'express';
import { PendencyController } from '../controllers/pendency.controller';

const pendencyRoutes = Router();
const pendencyController = new PendencyController();

pendencyRoutes.post('/', pendencyController.create);
pendencyRoutes.get('/', pendencyController.listOpen);
pendencyRoutes.patch('/:id/resolve', pendencyController.resolve);

export default pendencyRoutes;
