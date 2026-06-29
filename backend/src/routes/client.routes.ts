import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';

const clientRoutes = Router();
const clientController = new ClientController();

clientRoutes.post('/', clientController.create);
clientRoutes.get('/', clientController.list);

export default clientRoutes;
