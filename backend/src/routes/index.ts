import { Router } from 'express';
import authRoutes from './auth.routes';
import clientRoutes from './client.routes';
import processRoutes from './process.routes';
import pendencyRoutes from './pendency.routes';
import { authMiddleware } from '../middlewares/auth.middleware';

const routes = Router();

routes.use('/auth', authRoutes);

// Protected routes
routes.use('/clients', authMiddleware, clientRoutes);
routes.use('/processes', authMiddleware, processRoutes);
routes.use('/pendencies', authMiddleware, pendencyRoutes);

export default routes;
