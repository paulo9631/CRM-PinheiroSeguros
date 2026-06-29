import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/login', authController.login);

// Apenas Admin pode criar usuários
authRoutes.post('/register', authMiddleware, adminMiddleware, authController.register);

// Listar todos os usuários
authRoutes.get('/users', authMiddleware, adminMiddleware, authController.listUsers);

export default authRoutes;
