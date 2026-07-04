import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const clientRoutes = Router();
const clientController = new ClientController();

clientRoutes.use(authMiddleware);

clientRoutes.post('/', clientController.create);
clientRoutes.post('/import', clientController.importData);
clientRoutes.get('/', clientController.list);
clientRoutes.delete('/:id', clientController.delete);

export default clientRoutes;
