import { Router } from 'express';
import { ProcessController } from '../controllers/process.controller';

const processRoutes = Router();
const processController = new ProcessController();

processRoutes.post('/', processController.create);
processRoutes.get('/', processController.list);
processRoutes.patch('/:id/status', processController.updateStatus);

export default processRoutes;
