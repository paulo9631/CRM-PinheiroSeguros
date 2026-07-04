import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/login', authController.login);

// Apenas Admin pode criar usuários
authRoutes.post('/register', authMiddleware, adminMiddleware, authController.register);

// Listar todos os usuários (todos podem ver para poder atribuir pendências)
authRoutes.get('/users', authMiddleware, authController.listUsers);

export default authRoutes;
