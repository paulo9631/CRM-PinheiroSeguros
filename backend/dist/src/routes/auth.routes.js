"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authRoutes = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
authRoutes.post('/login', authController.login);
// Apenas Admin pode criar usuários
authRoutes.post('/register', auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, authController.register);
// Listar todos os usuários
authRoutes.get('/users', auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, authController.listUsers);
exports.default = authRoutes;
